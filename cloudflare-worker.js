/**
 * Cloudflare Worker for pt-onia.app Short URL Service
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Cloudflare Dashboard > Workers & Pages
 * 2. Create a new Worker
 * 3. Paste this code
 * 4. Create a KV namespace called "SHORT_URLS"
 * 5. Bind the KV namespace to this worker with variable name "SHORT_URLS"
 * 6. Add a route: pt-onia.app/s/* -> this worker
 * 7. Add a route: pt-onia.app/api/shorten -> this worker
 *
 * USAGE:
 * - POST /api/shorten with { "url": "https://pt-onia.app/#..." }
 * - Returns { "shortUrl": "https://pt-onia.app/s/abc123" }
 * - GET /s/abc123 redirects to the full URL
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

async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: CORS_HEADERS,
        });
    }

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
