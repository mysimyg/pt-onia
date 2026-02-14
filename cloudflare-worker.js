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
 *    - pt-onia.app/s/*              -> this worker
 *    - pt-onia.app/api/shorten      -> this worker
 *    - pt-onia.app/api/resolve/*    -> this worker
 *    - pt-onia.app/api/telemetry    -> this worker
 *
 * SHORT URL USAGE:
 * - POST /api/shorten with { "url": "https://pt-onia.app/#..." }
 *   Creates a new short URL with a word-based code (e.g. amber-coral-nova)
 *   Returns { "shortUrl": "https://pt-onia.app/s/amber-coral-nova", "code": "amber-coral-nova" }
 *
 * - PUT /api/shorten with { "code": "amber-coral-nova", "url": "https://pt-onia.app/#newstate" }
 *   Updates an existing short code to point to a new URL.
 *   Returns { "shortUrl": "...", "code": "...", "updated": true }
 *
 * - GET /api/resolve/<code>
 *   Returns JSON { "url": "https://pt-onia.app/#..." } without redirecting.
 *   Allows the frontend to resolve the state and stay on /s/<code>.
 *
 * - GET /s/<code>
 *   If browser (Accept: text/html): serves the SPA index.html (browser stays on /s/<code>).
 *   If API/non-browser: 302 redirect to the long URL.
 *
 * SHORT CODE FORMAT:
 * - New codes: word-based, 3 hyphen-separated words (e.g. amber-coral-nova)
 * - Legacy codes: 6 alphanumeric characters (e.g. AbC123)
 * - Both formats are accepted everywhere
 *
 * RATE LIMITS:
 * - CREATE (POST /api/shorten): 5 requests/minute per IP
 * - UPDATE (PUT /api/shorten): 20 requests/minute per IP
 * - Telemetry: 30 requests/minute per IP
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
const WORD_CODE_REGEX = /^[a-z]{3,8}-[a-z]{3,8}-[a-z]{3,8}$/;
const MAX_SHORTEN_BODY_BYTES = 32768; // 32KB max request body
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

// ── Word-based short code wordlist (~200 words) ────────────────────────────
const WORDLIST = [
    'amber', 'apex', 'aqua', 'arch', 'aura', 'avid', 'axis',
    'base', 'beam', 'birch', 'blaze', 'bliss', 'bloom', 'bold', 'bolt', 'bond', 'brave', 'breeze', 'brook', 'byte',
    'calm', 'cape', 'cedar', 'charm', 'chase', 'chime', 'cider', 'cliff', 'cloud', 'clover', 'coast', 'cobalt', 'coral', 'core', 'cozy', 'craft', 'crest', 'crisp', 'cross', 'crown',
    'dale', 'dart', 'dawn', 'delta', 'dew', 'dove', 'dream', 'drift', 'dune', 'dusk',
    'echo', 'edge', 'elm', 'ember', 'epic', 'even',
    'fable', 'fawn', 'fern', 'field', 'finch', 'fire', 'fjord', 'flame', 'flare', 'flash', 'fleet', 'flora', 'flow', 'flux', 'foam', 'forge', 'fox', 'frost', 'fuse',
    'gale', 'gem', 'glade', 'gleam', 'glen', 'glow', 'gold', 'grace', 'grain', 'grove', 'gust',
    'halo', 'harbor', 'haven', 'hawk', 'hazel', 'heath', 'helm', 'heron', 'hill', 'honey', 'hue', 'husk',
    'iris', 'isle', 'ivy',
    'jade', 'jazz', 'jest', 'jewel', 'jovial', 'joy', 'just',
    'keen', 'kelp', 'kind', 'kite',
    'lake', 'lark', 'latch', 'leaf', 'light', 'lily', 'lime', 'linen', 'lotus', 'luna', 'lush', 'lynx',
    'maple', 'marsh', 'mast', 'mead', 'mesa', 'mist', 'mocha', 'moon', 'moss', 'muse',
    'nest', 'noble', 'north', 'nova', 'null',
    'oak', 'oasis', 'ocean', 'olive', 'onyx', 'opal', 'orbit', 'otter',
    'palm', 'path', 'peak', 'pearl', 'pier', 'pilot', 'pine', 'pixel', 'plum', 'point', 'pond', 'port', 'prism', 'pulse',
    'quartz', 'quest', 'quick', 'quill',
    'rain', 'rapid', 'raven', 'realm', 'reed', 'reef', 'ridge', 'rift', 'river', 'robin', 'root', 'rose', 'ruby', 'rust',
    'sage', 'sail', 'sand', 'satin', 'seed', 'shade', 'shore', 'silk', 'slate', 'snow', 'solar', 'sonic', 'spark', 'spire', 'star', 'steel', 'stone', 'storm', 'swift', 'sage',
    'teal', 'tempo', 'terra', 'thyme', 'tide', 'timber', 'torch', 'trail', 'trove', 'tulip', 'tusk',
    'vale', 'vapor', 'vault', 'vine', 'viola', 'vivid', 'volt',
    'wave', 'weave', 'wheat', 'wild', 'willow', 'wind', 'wren',
    'yarn', 'yew',
    'zen', 'zero', 'zinc', 'zone',
];

function generateWordCode() {
    const pick = () => WORDLIST[Math.floor(Math.random() * WORDLIST.length)];
    return `${pick()}-${pick()}-${pick()}`;
}

function generateHexFallbackCode() {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

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

function getCorsHeaders(request, { allowDelete = false, allowPut = false } = {}) {
    const origin = getAllowedOrigin(request);
    if (!origin) return null;
    const methods = ['GET', 'POST', 'OPTIONS'];
    if (allowDelete) methods.push('DELETE');
    if (allowPut) methods.push('PUT');
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': methods.join(', '),
        'Access-Control-Allow-Headers': 'Content-Type, X-Telemetry-Admin-Token',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin',
    };
}

function withResponseHeaders(response, { request = null, isApi = false, allowDeleteCors = false, allowPutCors = false, headers = {} } = {}) {
    const wrapped = new Response(response.body, response);
    const securityHeaders = isApi ? API_SECURITY_HEADERS : BASE_SECURITY_HEADERS;
    Object.entries(securityHeaders).forEach(([key, value]) => wrapped.headers.set(key, value));

    if (request) {
        const corsHeaders = getCorsHeaders(request, { allowDelete: allowDeleteCors, allowPut: allowPutCors });
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

function jsonResponse(payload, status = 200, headers = {}, request = null, { allowDeleteCors = false, allowPutCors = false } = {}) {
    const response = new Response(JSON.stringify(payload), {
        status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return withResponseHeaders(response, { request, isApi: true, allowDeleteCors, allowPutCors, headers });
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
    return SHORT_CODE_REGEX.test(code) || WORD_CODE_REGEX.test(code);
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

// ── Rate Limiting ──────────────────────────────────────────────────────────
// In-memory rate limiter — per-IP per-bucket, resets each worker instance / isolate
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000;

const RATE_LIMITS = {
    telemetry: 30,      // 30 requests/minute
    shortenCreate: 5,   // 5 creates/minute (stricter)
    shortenUpdate: 20,  // 20 updates/minute (more lenient)
};

function isRateLimited(ip, bucket = 'telemetry') {
    const now = Date.now();
    const key = `${bucket}:${ip}`;
    let entry = rateLimitMap.get(key);
    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        entry = { windowStart: now, count: 0 };
        rateLimitMap.set(key, entry);
    }
    entry.count++;
    // Periodically prune old entries
    if (rateLimitMap.size > 10000) {
        for (const [k, v] of rateLimitMap) {
            if (now - v.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(k);
        }
    }
    const max = RATE_LIMITS[bucket] || 30;
    return entry.count > max;
}

// ── Short URL handlers ─────────────────────────────────────────────────────

async function readShortenBody(request) {
    const rawBody = await request.text();
    if (rawBody.length > MAX_SHORTEN_BODY_BYTES) {
        return { error: 'Payload too large', status: 413 };
    }
    try {
        return { payload: JSON.parse(rawBody) };
    } catch {
        return { error: 'Invalid JSON payload', status: 400 };
    }
}

async function handleShortenCreate(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request);
    }
    if (!env.SHORT_URLS) {
        return jsonResponse({
            error: 'KV namespace not configured',
            hint: 'Bind SHORT_URLS KV namespace to this worker',
        }, 500, {}, request);
    }

    // Rate limit CREATE operations (stricter)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip, 'shortenCreate')) {
        return jsonResponse({ error: 'Rate limited' }, 429, {}, request);
    }

    const { payload, error, status } = await readShortenBody(request);
    if (error) {
        return jsonResponse({
            error,
            hint: 'Send body as { "url": "https://pt-onia.app/#..." }',
        }, status, {}, request);
    }

    const longUrl = payload?.url;
    if (!longUrl || !isValidAppUrl(longUrl)) {
        return jsonResponse({ error: 'Invalid URL' }, 400, {}, request);
    }

    const urlHash = await hashUrl(longUrl);
    const existingCode = await withRetry(() => env.SHORT_URLS.get(`hash:${urlHash}`));
    if (existingCode && WORD_CODE_REGEX.test(existingCode)) {
        // Already has a word-based code — return it
        return jsonResponse({
            shortUrl: `${DOMAIN}/s/${existingCode}`,
            code: existingCode,
            existing: true,
        }, 200, {}, request);
    }
    // If existingCode is a legacy (non-word) code, fall through to create a
    // new word-based code. The old code stays valid for backward compat but
    // the hash reverse-lookup will be updated to point to the new code.

    // Generate a word-based code, with collision retry and hex fallback
    let shortCode;
    let attempts = 0;
    do {
        shortCode = generateWordCode();
        const existing = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
        if (!existing) break;
        attempts++;
    } while (attempts < 10);

    // If all word-based attempts collided, fall back to random hex
    if (attempts >= 10) {
        shortCode = generateHexFallbackCode();
        const existing = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
        if (existing) {
            return jsonResponse({ error: 'Failed to generate unique code' }, 500, {}, request);
        }
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

async function handleShortenUpdate(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, { allowPutCors: true });
    }
    if (!env.SHORT_URLS) {
        return jsonResponse({
            error: 'KV namespace not configured',
            hint: 'Bind SHORT_URLS KV namespace to this worker',
        }, 500, {}, request, { allowPutCors: true });
    }

    // Rate limit UPDATE operations (more lenient)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip, 'shortenUpdate')) {
        return jsonResponse({ error: 'Rate limited' }, 429, {}, request, { allowPutCors: true });
    }

    const { payload, error, status } = await readShortenBody(request);
    if (error) {
        return jsonResponse({
            error,
            hint: 'Send body as { "code": "word-word-word", "url": "https://pt-onia.app/#..." }',
        }, status, {}, request, { allowPutCors: true });
    }

    const code = payload?.code;
    const newUrl = payload?.url;

    if (!code || !isValidShortCode(code)) {
        return jsonResponse({ error: 'Invalid or missing code' }, 400, {}, request, { allowPutCors: true });
    }
    if (!newUrl || !isValidAppUrl(newUrl)) {
        return jsonResponse({ error: 'Invalid or missing URL' }, 400, {}, request, { allowPutCors: true });
    }

    // Verify the code exists
    const oldUrl = await withRetry(() => env.SHORT_URLS.get(`code:${code}`));
    if (!oldUrl) {
        return jsonResponse({ error: 'Short code not found' }, 404, {}, request, { allowPutCors: true });
    }

    // If the URL hasn't changed, no-op
    if (oldUrl === newUrl) {
        return jsonResponse({
            shortUrl: `${DOMAIN}/s/${code}`,
            code,
            updated: false,
            message: 'URL unchanged',
        }, 200, {}, request, { allowPutCors: true });
    }

    // Delete old hash reverse lookup
    const oldHash = await hashUrl(oldUrl);
    const newHash = await hashUrl(newUrl);

    await withRetry(() => Promise.all([
        env.SHORT_URLS.put(`code:${code}`, newUrl),
        env.SHORT_URLS.delete(`hash:${oldHash}`),
        env.SHORT_URLS.put(`hash:${newHash}`, code),
    ]));

    // Invalidate cache for this short code
    const cacheKey = new Request(`${DOMAIN}/s/${code}`, { method: 'GET' });
    await caches.default.delete(cacheKey);

    return jsonResponse({
        shortUrl: `${DOMAIN}/s/${code}`,
        code,
        updated: true,
    }, 200, {}, request, { allowPutCors: true });
}

async function handleResolve(shortCode, request, env) {
    if (!env.SHORT_URLS || !isValidShortCode(shortCode)) {
        return jsonResponse({ error: 'Invalid short code' }, 400, {}, request);
    }

    const longUrl = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
    if (!longUrl) {
        return jsonResponse({ error: 'Short code not found' }, 404, {}, request);
    }

    return jsonResponse({
        url: longUrl,
        code: shortCode,
    }, 200, { 'Cache-Control': 'no-store' }, request);
}

async function handleRedirect(shortCode, env, ctx, request) {
    if (!env.SHORT_URLS || !isValidShortCode(shortCode)) {
        return withResponseHeaders(Response.redirect(DOMAIN, 302), { request });
    }

    // If browser navigation (Accept: text/html), serve the SPA so browser stays on /s/<code>
    const accept = request.headers.get('Accept') || '';
    if (accept.includes('text/html')) {
        const longUrl = await withRetry(() => env.SHORT_URLS.get(`code:${shortCode}`));
        if (!longUrl) {
            return withResponseHeaders(Response.redirect(DOMAIN, 302), { request });
        }

        // Fetch the origin index.html and serve it at /s/<code>
        // Inject the resolved long URL as a meta tag so the client can
        // restore state without needing a separate /api/resolve call.
        try {
            const originResponse = await fetch(`${DOMAIN}/`, {
                headers: { 'Accept': 'text/html' },
            });
            let html = await originResponse.text();
            // Inject resolved URL meta tag into <head>
            const escapedUrl = longUrl.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            const metaTag = `<meta name="x-resolved-url" content="${escapedUrl}">`;
            html = html.replace('<head>', `<head>\n${metaTag}`);
            return withResponseHeaders(new Response(html, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'no-store',
                },
            }), { request });
        } catch {
            // Fallback to redirect if origin fetch fails
            return withResponseHeaders(Response.redirect(longUrl, 302), { request });
        }
    }

    // Non-browser (API) requests: redirect as before
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

async function handleTelemetryPost(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, { allowDeleteCors: true });
    }
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500, {}, request, { allowDeleteCors: true });
    }

    // Rate limit by IP (IP is read but NEVER stored)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip, 'telemetry')) {
        return jsonResponse({ error: 'Rate limited' }, 429, {}, request, { allowDeleteCors: true });
    }

    let payload;
    try {
        const rawBody = await request.text();
        if (rawBody.length > MAX_TELEMETRY_PAYLOAD_CHARS) {
            return jsonResponse({ error: 'Payload too large' }, 413, {}, request, { allowDeleteCors: true });
        }
        payload = JSON.parse(rawBody);
    } catch {
        return jsonResponse({ error: 'Invalid JSON' }, 400, {}, request, { allowDeleteCors: true });
    }

    // Validate payload shape
    const increments = payload?.increments;
    const nested = payload?.nested;
    if (!increments && !nested) {
        return jsonResponse({ error: 'Missing increments or nested fields' }, 400, {}, request, { allowDeleteCors: true });
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

    return jsonResponse({ ok: true }, 200, {}, request, { allowDeleteCors: true });
}

async function handleTelemetryGet(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, { allowDeleteCors: true });
    }
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500, {}, request, { allowDeleteCors: true });
    }
    let counters;
    try {
        const raw = await env.TELEMETRY.get(TELEMETRY_KV_KEY);
        counters = raw ? JSON.parse(raw) : {};
    } catch {
        counters = {};
    }
    return jsonResponse(counters, 200, { 'Cache-Control': 'no-store' }, request, { allowDeleteCors: true });
}

async function handleTelemetryDelete(request, env) {
    if (!requestLooksSameOrigin(request)) {
        return jsonResponse({ error: 'Forbidden origin' }, 403, {}, request, { allowDeleteCors: true });
    }
    if (!env.TELEMETRY) {
        return jsonResponse({ error: 'TELEMETRY KV namespace not configured' }, 500, {}, request, { allowDeleteCors: true });
    }

    const allowInsecureReset = env.ALLOW_UNAUTHENTICATED_TELEMETRY_RESET === 'true';
    if (!allowInsecureReset && !hasValidAdminToken(request, env)) {
        return jsonResponse({
            error: 'Unauthorized',
            hint: 'Set TELEMETRY_ADMIN_TOKEN and send it as X-Telemetry-Admin-Token to enable protected reset.',
        }, 403, {}, request, { allowDeleteCors: true });
    }

    await withRetry(() => env.TELEMETRY.put(TELEMETRY_KV_KEY, JSON.stringify({})));
    return jsonResponse({ ok: true, message: 'All sitewide counters reset' }, 200, {}, request, { allowDeleteCors: true });
}

// ── Request Router ─────────────────────────────────────────────────────────

async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        const allowedPreflightPaths = new Set(['/api/telemetry', '/api/shorten']);
        const isResolvePath = url.pathname.startsWith('/api/resolve/');

        if (!allowedPreflightPaths.has(url.pathname) && !isResolvePath) {
            return withResponseHeaders(new Response(null, { status: 404 }), { request, isApi: true });
        }

        const allowDelete = url.pathname === '/api/telemetry';
        const allowPut = url.pathname === '/api/shorten';
        const corsHeaders = getCorsHeaders(request, { allowDelete, allowPut });
        if (!corsHeaders) {
            return withResponseHeaders(new Response(null, { status: 403 }), { request, isApi: true, allowDeleteCors: allowDelete, allowPutCors: allowPut });
        }
        return withResponseHeaders(new Response(null, { headers: corsHeaders }), { request, isApi: true, allowDeleteCors: allowDelete, allowPutCors: allowPut });
    }

    // ── Telemetry routes ──
    if (url.pathname === '/api/telemetry') {
        if (request.method === 'POST') {
            try {
                return await handleTelemetryPost(request, env);
            } catch {
                return jsonResponse({ error: 'Server error' }, 500, {}, request, { allowDeleteCors: true });
            }
        }
        if (request.method === 'GET') {
            return handleTelemetryGet(request, env);
        }
        if (request.method === 'DELETE') {
            return handleTelemetryDelete(request, env);
        }
        return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST, DELETE, OPTIONS' }, request, { allowDeleteCors: true });
    }

    // ── Short URL routes ──

    // Handle GET request to /api/shorten (for debugging)
    if (url.pathname === '/api/shorten' && request.method === 'GET') {
        return jsonResponse({
            status: 'ok',
            message: 'Short URL API is working. Use POST to create, PUT to update.',
            usage: {
                create: 'POST /api/shorten with { "url": "https://pt-onia.app/#..." }',
                update: 'PUT /api/shorten with { "code": "word-word-word", "url": "https://pt-onia.app/#..." }',
                resolve: 'GET /api/resolve/<code>',
            },
        }, 200, { 'Cache-Control': 'no-store' }, request);
    }

    // Create short URL
    if (url.pathname === '/api/shorten' && request.method === 'POST') {
        try {
            return await handleShortenCreate(request, env);
        } catch {
            return jsonResponse({
                error: 'Server error',
                hint: 'Check that request body is valid JSON with { "url": "..." }',
            }, 500, {}, request);
        }
    }

    // Update short URL
    if (url.pathname === '/api/shorten' && request.method === 'PUT') {
        try {
            return await handleShortenUpdate(request, env);
        } catch {
            return jsonResponse({
                error: 'Server error',
                hint: 'Check that request body is valid JSON with { "code": "...", "url": "..." }',
            }, 500, {}, request, { allowPutCors: true });
        }
    }

    // Resolve short URL (JSON, no redirect)
    if (request.method === 'GET' && url.pathname.startsWith('/api/resolve/')) {
        const shortCode = url.pathname.slice('/api/resolve/'.length);
        try {
            return await handleResolve(shortCode, request, env);
        } catch {
            return jsonResponse({ error: 'Server error' }, 500, {}, request);
        }
    }

    // Redirect short URL (or serve SPA for browser requests)
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
