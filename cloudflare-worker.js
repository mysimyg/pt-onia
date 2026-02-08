/**
 * Cloudflare Worker for pt-onia.app — Short URL Service + Telemetry
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Cloudflare Dashboard > Workers & Pages
 * 2. Create a new Worker (or update the existing one)
 * 3. Paste this code
 * 4. Create KV namespaces:
 *    - "SHORT_URLS" — for short URL storage
 *    - "TELEMETRY" — for sitewide anonymous metrics
 * 5. Bind both KV namespaces to this worker:
 *    - SHORT_URLS variable → SHORT_URLS namespace
 *    - TELEMETRY variable  → TELEMETRY namespace
 * 6. Add routes:
 *    - pt-onia.app/s/*           -> this worker
 *    - pt-onia.app/api/shorten   -> this worker
 *    - pt-onia.app/api/telemetry -> this worker
 *
 * SHORT URL USAGE:
 * - POST /api/shorten with { "url": "https://pt-onia.app/#..." }
 * - Returns { "shortUrl": "https://pt-onia.app/s/abc123" }
 * - GET /s/abc123 redirects to the full URL
 *
 * TELEMETRY USAGE:
 * - POST /api/telemetry — increment counters (batched from client)
 *   Body: { "increments": { "saveClicks": 2, ... }, "nested": { "theme": { "dark-default": 1 } } }
 * - GET  /api/telemetry — retrieve all sitewide totals
 * - DELETE /api/telemetry — reset all sitewide counters (admin)
 *
 * PRIVACY:
 * - Only anonymous aggregated counters are stored.
 * - No IPs, fingerprints, or personal data are persisted.
 * - Rate limiting uses in-memory counters (not stored).
 */

const DOMAIN = 'https://pt-onia.app';
const SHORT_CODE_LENGTH = 6;
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; // Removed confusing chars
const SHORT_CODE_REGEX = new RegExp(`^[${CHARS}]{${SHORT_CODE_LENGTH}}$`);
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
const REDIRECT_CACHE_SECONDS = 300;

function generateShortCode() {
    let code = '';
    for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
        code += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return code;
}

// Hash a URL to create a short key for reverse lookups (avoids KV 512-byte key limit)
async function hashUrl(url) {
    const encoder = new TextEncoder();
    const data = encoder.encode(url);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function jsonResponse(payload, status = 200, headers = {}) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...CORS_HEADERS,
            ...headers,
        },
    });
}

function isValidAppUrl(value) {
    try {
        const parsed = new URL(value);
        return parsed.origin === DOMAIN;
    } catch {
        return false;
    }
}

function isValidShortCode(code) {
    return SHORT_CODE_REGEX.test(code);
}

async function withRetry(fn, attempts = 2, delayMs = 50) {
    let lastError;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (i < attempts - 1) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
    }
    throw lastError;
}

async function handleShorten(request, env) {
    if (!env.SHORT_URLS) {
        return jsonResponse({
            error: 'KV namespace not configured',
            hint: 'Bind SHORT_URLS KV namespace to this worker',
        }, 500);
    }

    let payload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({
            error: 'Invalid JSON payload',
            hint: 'Send body as { "url": "https://pt-onia.app/#..." }',
        }, 400);
    }

    const longUrl = payload?.url;
    if (!longUrl || !isValidAppUrl(longUrl)) {
        return jsonResponse({ error: 'Invalid URL' }, 400);
    }

    const urlHash = await hashUrl(longUrl);
    const existingCode = await withRetry(() => env.SHORT_URLS.get(`hash:${urlHash}`));
    if (existingCode) {
        return jsonResponse({
            shortUrl: `${DOMAIN}/s/${existingCode}`,
            code: existingCode,
            existing: true,
        });
    }

    let shortCode;
    let attempts = 0;
    do {
        shortCode = generateShortCode();
        const existing = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
        if (!existing) break;
        attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
        return jsonResponse({ error: 'Failed to generate unique code' }, 500);
    }

    await withRetry(() => Promise.all([
        env.SHORT_URLS.put(`code:${shortCode}`, longUrl),
        env.SHORT_URLS.put(`hash:${urlHash}`, shortCode),
    ]));

    return jsonResponse({
        shortUrl: `${DOMAIN}/s/${shortCode}`,
        code: shortCode,
        existing: false,
    });
}

async function handleRedirect(shortCode, env, ctx) {
    if (!env.SHORT_URLS || !isValidShortCode(shortCode)) {
        return Response.redirect(DOMAIN, 302);
    }

    const cacheKey = new Request(`${DOMAIN}/s/${shortCode}`, { method: 'GET' });
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;

    const longUrl = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
    if (longUrl && isValidAppUrl(longUrl)) {
        const response = Response.redirect(longUrl, 302);
        response.headers.set('Cache-Control', `public, max-age=${REDIRECT_CACHE_SECONDS}`);
        response.headers.set('Vary', 'Accept-Encoding');
        ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
        return response;
    }

    return Response.redirect(DOMAIN, 302);
}

// ── Telemetry ──────────────────────────────────────────────────────────────
const TELEMETRY_KV_KEY = 'counters_v1';

// Allowed top-level counter keys (flat increments). Reject anything else.
const ALLOWED_FLAT_KEYS = new Set([
    'totalSessions', 'totalActiveMs', 'sessionsOver5Min',
    'saveClicks', 'saveUsedSessions',
    'units_hours', 'units_days',
    'customTypeCreateAttempts', 'customTypeCreatedCount',
    'opportunityClickCount', 'clearAllSelectionsCount',
    'returningVisitsCount', 'errorsCaughtCount',
]);
// Allowed nested groups
const ALLOWED_NESTED_GROUPS = new Set(['theme', 'quickSelect']);

// In-memory rate limiter — per-IP, resets each worker instance / isolate
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX = 30; // max 30 requests/minute per IP

function isRateLimited(ip) {
    const now = Date.now();
    let entry = rateLimitMap.get(ip);
    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        entry = { windowStart: now, count: 0 };
        rateLimitMap.set(ip, entry);
    }
    entry.count++;
    // Periodically prune old entries
    if (rateLimitMap.size > 10000) {
        for (const [k, v] of rateLimitMap) {
            if (now - v.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(k);
        }
    }
    return entry.count > RATE_LIMIT_MAX;
}

async function handleTelemetryPost(request, env) {
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500);
    }

    // Rate limit by IP (IP is read but NEVER stored)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
        return jsonResponse({ error: 'Rate limited' }, 429);
    }

    let payload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({ error: 'Invalid JSON' }, 400);
    }

    // Validate payload shape
    const increments = payload?.increments;
    const nested = payload?.nested;
    if (!increments && !nested) {
        return jsonResponse({ error: 'Missing increments or nested fields' }, 400);
    }

    // Load current counters from KV
    let counters;
    try {
        const raw = await env.TELEMETRY.get(TELEMETRY_KV_KEY);
        counters = raw ? JSON.parse(raw) : {};
    } catch {
        counters = {};
    }

    // Apply flat increments
    if (increments && typeof increments === 'object') {
        for (const [key, delta] of Object.entries(increments)) {
            if (!ALLOWED_FLAT_KEYS.has(key)) continue;
            const d = Number(delta);
            if (!Number.isFinite(d) || d < 0 || d > 1e9) continue;
            counters[key] = (counters[key] || 0) + d;
        }
    }

    // Apply nested increments
    if (nested && typeof nested === 'object') {
        for (const [group, entries] of Object.entries(nested)) {
            if (!ALLOWED_NESTED_GROUPS.has(group)) continue;
            if (!entries || typeof entries !== 'object') continue;
            if (!counters[group]) counters[group] = {};
            for (const [key, delta] of Object.entries(entries)) {
                // Sanitize nested keys (max 50 chars, alphanumeric + dash)
                if (typeof key !== 'string' || key.length > 50 || !/^[\w-]+$/.test(key)) continue;
                const d = Number(delta);
                if (!Number.isFinite(d) || d < 0 || d > 1e9) continue;
                counters[group][key] = (counters[group][key] || 0) + d;
            }
        }
    }

    // Save back to KV
    await env.TELEMETRY.put(TELEMETRY_KV_KEY, JSON.stringify(counters));

    return jsonResponse({ ok: true });
}

async function handleTelemetryGet(env) {
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500);
    }
    let counters;
    try {
        const raw = await env.TELEMETRY.get(TELEMETRY_KV_KEY);
        counters = raw ? JSON.parse(raw) : {};
    } catch {
        counters = {};
    }
    return jsonResponse(counters);
}

async function handleTelemetryDelete(env) {
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500);
    }
    await env.TELEMETRY.put(TELEMETRY_KV_KEY, JSON.stringify({}));
    return jsonResponse({ ok: true, message: 'All sitewide counters reset' });
}

// ── Request Router ─────────────────────────────────────────────────────────

async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: CORS_HEADERS,
        });
    }

    // ── Telemetry routes ──
    if (url.pathname === '/api/telemetry') {
        if (request.method === 'POST') {
            try {
                return await handleTelemetryPost(request, env);
            } catch (error) {
                return jsonResponse({ error: 'Server error', message: error.message }, 500);
            }
        }
        if (request.method === 'GET') {
            return handleTelemetryGet(env);
        }
        if (request.method === 'DELETE') {
            return handleTelemetryDelete(env);
        }
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    // ── Short URL routes ──

    // Handle GET request to /api/shorten (for debugging)
    if (url.pathname === '/api/shorten' && request.method === 'GET') {
        return jsonResponse({
            status: 'ok',
            message: 'Short URL API is working. Use POST to create short URLs.',
            usage: 'POST /api/shorten with { "url": "https://pt-onia.app/#..." }',
        });
    }

    // Create short URL
    if (url.pathname === '/api/shorten' && request.method === 'POST') {
        try {
            return await handleShorten(request, env);
        } catch (error) {
            return jsonResponse({
                error: 'Server error',
                message: error.message,
                hint: 'Check that request body is valid JSON with { "url": "..." }',
            }, 500);
        }
    }

    // Redirect short URL
    if (request.method === 'GET' && url.pathname.startsWith('/s/')) {
        const shortCode = url.pathname.slice('/s/'.length);
        return handleRedirect(shortCode, env, ctx);
    }

    // Pass through to origin for all other requests
    return fetch(request);
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, env, ctx);
    },
};
