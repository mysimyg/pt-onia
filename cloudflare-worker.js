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
const APP_ORIGIN = DOMAIN;
const SHORT_CODE_LENGTH = 6;
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; // Removed confusing chars
const SHORT_CODE_REGEX = new RegExp(`^[${CHARS}]{${SHORT_CODE_LENGTH}}$`);
const DEV_ALLOWED_ORIGINS = new Set([
    'http://localhost:8787',
    'http://127.0.0.1:8787',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]);
const BASE_SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};
const API_SECURITY_HEADERS = {
    ...BASE_SECURITY_HEADERS,
    'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
};
const REDIRECT_CACHE_SECONDS = 300;

function getAllowedOrigin(request) {
    const origin = request.headers.get('Origin');
    if (!origin) return APP_ORIGIN;
    if (origin === APP_ORIGIN || DEV_ALLOWED_ORIGINS.has(origin)) return origin;
    return null;
}

function requestLooksSameOrigin(request) {
    const origin = request.headers.get('Origin');
    if (origin && (origin === APP_ORIGIN || DEV_ALLOWED_ORIGINS.has(origin))) return true;
    const secFetchSite = request.headers.get('Sec-Fetch-Site');
    return secFetchSite === 'same-origin' || secFetchSite === 'same-site';
}

function getCorsHeaders(request, allowDelete = false) {
    const origin = getAllowedOrigin(request);
    if (!origin) return null;
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': allowDelete ? 'GET, POST, DELETE, OPTIONS' : 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Telemetry-Admin-Token',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin',
    };
}

function withResponseHeaders(response, { request = null, isApi = false, allowDeleteCors = false, headers = {} } = {}) {
    const wrapped = new Response(response.body, response);
    const securityHeaders = isApi ? API_SECURITY_HEADERS : BASE_SECURITY_HEADERS;
    Object.entries(securityHeaders).forEach(([key, value]) => wrapped.headers.set(key, value));

    if (request) {
        const corsHeaders = getCorsHeaders(request, allowDeleteCors);
        if (corsHeaders) {
            Object.entries(corsHeaders).forEach(([key, value]) => wrapped.headers.set(key, value));
        }
    }

    Object.entries(headers).forEach(([key, value]) => wrapped.headers.set(key, value));
    return wrapped;
}

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

function jsonResponse(payload, status = 200, headers = {}, request = null, allowDeleteCors = false) {
    const response = new Response(JSON.stringify(payload), {
        status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return withResponseHeaders(response, { request, isApi: true, allowDeleteCors, headers });
}

function hasValidAdminToken(request, env) {
    const expected = env.TELEMETRY_ADMIN_TOKEN;
    if (typeof expected !== 'string' || expected.length < 16) return false;
    const provided = request.headers.get('X-Telemetry-Admin-Token');
    return typeof provided === 'string' && provided === expected;
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
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request);
    }
    if (!env.SHORT_URLS) {
        return jsonResponse({
            error: 'KV namespace not configured',
            hint: 'Bind SHORT_URLS KV namespace to this worker',
        }, 500, {}, request);
    }

    let payload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({
            error: 'Invalid JSON payload',
            hint: 'Send body as { "url": "https://pt-onia.app/#..." }',
        }, 400, {}, request);
    }

    const longUrl = payload?.url;
    if (!longUrl || !isValidAppUrl(longUrl)) {
        return jsonResponse({ error: 'Invalid URL' }, 400, {}, request);
    }

    const urlHash = await hashUrl(longUrl);
    const existingCode = await withRetry(() => env.SHORT_URLS.get(`hash:${urlHash}`));
    if (existingCode) {
        return jsonResponse({
            shortUrl: `${DOMAIN}/s/${existingCode}`,
            code: existingCode,
            existing: true,
        }, 200, {}, request);
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
        return jsonResponse({ error: 'Failed to generate unique code' }, 500, {}, request);
    }

    await withRetry(() => Promise.all([
        env.SHORT_URLS.put(`code:${shortCode}`, longUrl),
        env.SHORT_URLS.put(`hash:${urlHash}`, shortCode),
    ]));

    return jsonResponse({
        shortUrl: `${DOMAIN}/s/${shortCode}`,
        code: shortCode,
        existing: false,
    }, 200, {}, request);
}

async function handleRedirect(shortCode, env, ctx, request) {
    if (!env.SHORT_URLS || !isValidShortCode(shortCode)) {
        return withResponseHeaders(Response.redirect(DOMAIN, 302), { request });
    }

    const cacheKey = new Request(`${DOMAIN}/s/${shortCode}`, { method: 'GET' });
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;

    const longUrl = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
    if (longUrl && isValidAppUrl(longUrl)) {
        const response = withResponseHeaders(Response.redirect(longUrl, 302), { request });
        response.headers.set('Cache-Control', `public, max-age=${REDIRECT_CACHE_SECONDS}`);
        response.headers.set('Vary', 'Accept-Encoding');
        ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
        return response;
    }

    return withResponseHeaders(Response.redirect(DOMAIN, 302), { request });
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
const RESERVED_OBJECT_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const MAX_TELEMETRY_PAYLOAD_CHARS = 32768;
const MAX_NESTED_KEYS_PER_GROUP = 100;

function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isSafeNestedMetricKey(key) {
    return typeof key === 'string' &&
        key.length <= 50 &&
        /^[\w-]+$/.test(key) &&
        !RESERVED_OBJECT_KEYS.has(key);
}

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
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, true);
    }
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500, {}, request, true);
    }

    // Rate limit by IP (IP is read but NEVER stored)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
        return jsonResponse({ error: 'Rate limited' }, 429, {}, request, true);
    }

    let payload;
    try {
        const rawBody = await request.text();
        if (rawBody.length > MAX_TELEMETRY_PAYLOAD_CHARS) {
            return jsonResponse({ error: 'Payload too large' }, 413, {}, request, true);
        }
        payload = JSON.parse(rawBody);
    } catch {
        return jsonResponse({ error: 'Invalid JSON' }, 400, {}, request, true);
    }

    // Validate payload shape
    const increments = payload?.increments;
    const nested = payload?.nested;
    if (!increments && !nested) {
        return jsonResponse({ error: 'Missing increments or nested fields' }, 400, {}, request, true);
    }

    // Load current counters from KV
    let counters;
    try {
        const raw = await env.TELEMETRY.get(TELEMETRY_KV_KEY);
        counters = raw ? JSON.parse(raw) : {};
    } catch {
        counters = {};
    }
    if (!isPlainObject(counters)) counters = {};

    // Apply flat increments
    if (isPlainObject(increments)) {
        for (const [key, delta] of Object.entries(increments)) {
            if (!ALLOWED_FLAT_KEYS.has(key)) continue;
            const d = Number(delta);
            if (!Number.isFinite(d) || d < 0 || d > 1e9) continue;
            counters[key] = (counters[key] || 0) + d;
        }
    }

    // Apply nested increments
    if (isPlainObject(nested)) {
        for (const [group, entries] of Object.entries(nested)) {
            if (!ALLOWED_NESTED_GROUPS.has(group)) continue;
            if (!isPlainObject(entries)) continue;
            if (!isPlainObject(counters[group])) counters[group] = {};
            for (const [key, delta] of Object.entries(entries)) {
                // Prevent special object keys and keep names compact/safe.
                if (!isSafeNestedMetricKey(key)) continue;
                const d = Number(delta);
                if (!Number.isFinite(d) || d < 0 || d > 1e9) continue;
                if (!Object.prototype.hasOwnProperty.call(counters[group], key) && Object.keys(counters[group]).length >= MAX_NESTED_KEYS_PER_GROUP) continue;
                counters[group][key] = (counters[group][key] || 0) + d;
            }
        }
    }

    // Save back to KV
    await withRetry(() => env.TELEMETRY.put(TELEMETRY_KV_KEY, JSON.stringify(counters)));

    return jsonResponse({ ok: true }, 200, {}, request, true);
}

async function handleTelemetryGet(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, true);
    }
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500, {}, request, true);
    }
    let counters;
    try {
        const raw = await env.TELEMETRY.get(TELEMETRY_KV_KEY);
        counters = raw ? JSON.parse(raw) : {};
    } catch {
        counters = {};
    }
    return jsonResponse(counters, 200, { 'Cache-Control': 'no-store' }, request, true);
}

async function handleTelemetryDelete(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, true);
    }
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500, {}, request, true);
    }

    const allowInsecureReset = env.ALLOW_UNAUTHENTICATED_TELEMETRY_RESET === 'true';
    if (!allowInsecureReset && !hasValidAdminToken(request, env)) {
        return jsonResponse({
            error: 'Unauthorized',
            hint: 'Set TELEMETRY_ADMIN_TOKEN and send it as X-Telemetry-Admin-Token to enable protected reset.',
        }, 403, {}, request, true);
    }

    await withRetry(() => env.TELEMETRY.put(TELEMETRY_KV_KEY, JSON.stringify({})));
    return jsonResponse({ ok: true, message: 'All sitewide counters reset' }, 200, {}, request, true);
}

// ── Request Router ─────────────────────────────────────────────────────────

async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        if (url.pathname !== '/api/telemetry' && url.pathname !== '/api/shorten') {
            return withResponseHeaders(new Response(null, { status: 404 }), { request, isApi: true });
        }
        const allowDelete = url.pathname === '/api/telemetry';
        const corsHeaders = getCorsHeaders(request, allowDelete);
        if (!corsHeaders) {
            return withResponseHeaders(new Response(null, { status: 403 }), { request, isApi: true, allowDeleteCors: allowDelete });
        }
        return withResponseHeaders(new Response(null, { headers: corsHeaders }), { request, isApi: true, allowDeleteCors: allowDelete });
    }

    // ── Telemetry routes ──
    if (url.pathname === '/api/telemetry') {
        if (request.method === 'POST') {
            try {
                return await handleTelemetryPost(request, env);
            } catch {
                return jsonResponse({ error: 'Server error' }, 500, {}, request, true);
            }
        }
        if (request.method === 'GET') {
            return handleTelemetryGet(request, env);
        }
        if (request.method === 'DELETE') {
            return handleTelemetryDelete(request, env);
        }
        return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST, DELETE, OPTIONS' }, request, true);
    }

    // ── Short URL routes ──

    // Handle GET request to /api/shorten (for debugging)
    if (url.pathname === '/api/shorten' && request.method === 'GET') {
        return jsonResponse({
            status: 'ok',
            message: 'Short URL API is working. Use POST to create short URLs.',
            usage: 'POST /api/shorten with { "url": "https://pt-onia.app/#..." }',
        }, 200, { 'Cache-Control': 'no-store' }, request);
    }

    // Create short URL
    if (url.pathname === '/api/shorten' && request.method === 'POST') {
        try {
            return await handleShorten(request, env);
        } catch {
            return jsonResponse({
                error: 'Server error',
                hint: 'Check that request body is valid JSON with { "url": "..." }',
            }, 500, {}, request);
        }
    }

    // Redirect short URL
    if (request.method === 'GET' && url.pathname.startsWith('/s/')) {
        const shortCode = url.pathname.slice('/s/'.length);
        return handleRedirect(shortCode, env, ctx, request);
    }

    // Pass through to origin for all other requests
    const originResponse = await fetch(request);
    return withResponseHeaders(originResponse, { request });
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, env, ctx);
    },
};
