# PTO Optimizer (pt-onia.app)

Plan time off on a 9/80 schedule, model year-end balances, and find high-leverage day-off combinations.

**Live app:** https://pt-onia.app

## Features

- Interactive desktop year calendar and mobile year/month views with tap/click day toggles.
- Built-in leave types: PTO, Activism, Personal, Wellness.
- Custom time-off types with color selection and `counts toward days off totals` control.
- Hours/Days display toggle:
  - Desktop: header toggle next to theme selector.
  - Mobile: Settings tab (`Display -> Show values in`).
- Opportunity and quick-select actions (Mega, Super, 4-Day, Fridays, 2-for-5 / 3-for-5 where available).
- Year-end projection cards and charts/tables for PTO, Wellness, Activism, and Personal.
- Stable shareable short URLs (`/s/<code>`) with human-readable word-based codes (e.g., `amber-coral-nova`).
  - Saving on an existing short URL updates the same code — no link churn.
  - Anyone with the link can view and edit the planning settings.
- Share / Export modal:
  - Copy shareable link (auto-creates short URL if needed).
  - Share year calendar as PNG image.
  - Share current month as PNG image.
  - Export selected time-off days as `.ics` calendar file (imports into Google Calendar, Outlook, etc.).
- Hidden admin KPI dashboard behavior:
  - Open `+ Add Custom Time Off Type`, enter `root66admin`, then confirm.
  - Dashboard shows anonymous aggregated KPI counters (local + optional sitewide remote).
- Mobile behavior:
  - Bottom navigation (`Year`, `Month`, `Optimize`, `Settings`).
  - Collapsible boxed sections in Optimize and Settings tabs.
  - Floating action button for quick actions and custom type creation.
  - Touch-friendly tap targets and mobile-only day-info toast.

## Privacy

No personal balances are transmitted/stored server-side; only aggregated site-wide KPIs if enabled.

- User planning data (balances, selected days, custom type definitions) stays in the URL hash and/or browser storage.
- Remote telemetry is optional and aggregates anonymous counters only.
- Short-link API stores only the app URL needed for redirect lookups — no PII.
- **Anyone with a short link can view and modify the planning state.** Short links are not access-controlled.

## Local Development

### Static site only

1. From repo root, start a static server:
   - `python3 -m http.server 8080`
2. Open: `http://localhost:8080`

### Static site + Cloudflare Worker (optional)

1. Install Wrangler (if needed): `npm i -g wrangler`
2. Configure KV namespaces and bindings for `SHORT_URLS` and `TELEMETRY`.
3. Run Worker locally: `wrangler dev cloudflare-worker.js`
4. Point telemetry/short-link requests to the Worker origin for local testing.

## Deployment

### GitHub Pages (primary host)

- `index.html` and static assets are served by GitHub Pages at `https://pt-onia.app`.
- `CNAME` should stay committed for the custom domain.

### Cloudflare Worker (optional, recommended for APIs)

- Deploy `cloudflare-worker.js`.
- Bind KV namespaces:
  - `SHORT_URLS`
  - `TELEMETRY`
- Route API and short-link paths to Worker:
  - `/s/*`
  - `/api/shorten` (POST to create, PUT to update)
  - `/api/resolve/*`
  - `/api/telemetry`
- Recommended secrets/config:
  - `TELEMETRY_ADMIN_TOKEN` (required to authorize telemetry reset/delete)
  - `ALLOW_UNAUTHENTICATED_TELEMETRY_RESET=true` only for temporary/dev fallback

## Manual Smoke Test Checklist

1. Load app on desktop and mobile widths; confirm no overlaps in header/FAB/bottom nav.
2. Toggle hours/days on desktop header and mobile settings; confirm values update consistently.
3. Add/remove built-in and custom time-off days; confirm balances and charts update.
4. Create/delete a custom type; refresh page; confirm persistence and safe recovery.
5. Click Save; confirm a short URL is created and the browser navigates to `/s/<code>`.
6. Edit selections on the short URL; click Save again; confirm the same code is updated (no new code).
7. Open Share modal; test Copy Link, Share Year PNG, Share Month PNG, Export .ics.
8. Reload from short URL; confirm state restoration matches selections.
9. If Worker enabled:
   - Verify `POST /api/shorten` creates short links and `PUT /api/shorten` updates them.
   - Verify `GET /api/resolve/<code>` returns JSON with the target URL.
   - Verify `/s/<code>` serves the SPA (no redirect for browser requests).
   - Verify telemetry POST/GET works and admin dashboard sitewide view loads.
   - Verify telemetry reset is blocked without admin token.

## License

MIT
