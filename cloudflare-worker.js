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

async function handleRequest(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    // Handle GET request to /api/shorten (for debugging)
    if (url.pathname === '/api/shorten' && request.method === 'GET') {
        return new Response(JSON.stringify({
            status: 'ok',
            message: 'Short URL API is working. Use POST to create short URLs.',
            usage: 'POST /api/shorten with { "url": "https://pt-onia.app/#..." }'
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    // Create short URL
    if (url.pathname === '/api/shorten' && request.method === 'POST') {
        try {
            // Check if KV namespace is bound
            if (!env.SHORT_URLS) {
                return new Response(JSON.stringify({
                    error: 'KV namespace not configured',
                    hint: 'Bind SHORT_URLS KV namespace to this worker'
                }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }

            const { url: longUrl } = await request.json();

            // Validate URL
            if (!longUrl || !longUrl.startsWith(DOMAIN)) {
                return new Response(JSON.stringify({ error: 'Invalid URL' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }

            // Check if this URL already has a short code (use hash to avoid key length limit)
            const urlHash = await hashUrl(longUrl);
            const existingCode = await env.SHORT_URLS.get(`hash:${urlHash}`);
            if (existingCode) {
                return new Response(JSON.stringify({
                    shortUrl: `${DOMAIN}/s/${existingCode}`,
                    code: existingCode,
                    existing: true
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }

            // Generate unique short code
            let shortCode;
            let attempts = 0;
            do {
                shortCode = generateShortCode();
                const existing = await env.SHORT_URLS.get(`code:${shortCode}`);
                if (!existing) break;
                attempts++;
            } while (attempts < 10);

            if (attempts >= 10) {
                return new Response(JSON.stringify({ error: 'Failed to generate unique code' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }

            // Store both mappings (code -> url and hash -> code for deduplication)
            await env.SHORT_URLS.put(`code:${shortCode}`, longUrl);
            await env.SHORT_URLS.put(`hash:${urlHash}`, shortCode);

            return new Response(JSON.stringify({
                shortUrl: `${DOMAIN}/s/${shortCode}`,
                code: shortCode,
                existing: false
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        } catch (error) {
            return new Response(JSON.stringify({
                error: 'Server error',
                message: error.message,
                hint: 'Check that request body is valid JSON with { "url": "..." }'
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }
    }

    // Redirect short URL
    if (url.pathname.startsWith('/s/')) {
        const shortCode = url.pathname.slice(3); // Remove '/s/'
        const longUrl = await env.SHORT_URLS.get(`code:${shortCode}`);

        if (longUrl) {
            return Response.redirect(longUrl, 302);
        }

        // Short code not found - redirect to home
        return Response.redirect(DOMAIN, 302);
    }

    // Pass through to origin for all other requests
    return fetch(request);
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, env);
    },
};
