# PTO Optimizer (pt-onia.app)

Plan time off on a 9/80 schedule, model year-end balances, and quickly find high-leverage day-off combinations.

**Live app:** https://pt-onia.app

## What It Does

- Interactive year + mobile calendars with click-to-toggle day selection.
- Built-in leave types: PTO, Activism, Personal, Wellness/Sick.
- Custom leave types with color + `counts toward days off` control.
- Hours <-> days display toggle across balances, tooltips, and projections.
- Opportunity engine and quick-select actions (Mega/Super/4-Day, Fridays, monthly Friday packs, Clear All).
- Year-end projections/tables for PTO, Wellness, Activism, and Personal.
- Save/share links via URL state, with optional short-link generation through Worker API.
- Theme/palette selector (light/dark variants).
- Secret admin trigger (`root66admin` in custom type name) opening telemetry KPI dashboard.

## Privacy

- No personal scheduling data is sent to telemetry:
  - no PTO/Activism/Wellness balances
  - no selected calendar dates
  - no holiday selections
  - no custom type names
  - no years-of-service or paycheck schedule values
- Telemetry is anonymous aggregated counters only.
- Local telemetry is stored in browser `localStorage`.
- Optional sitewide telemetry is sent in aggregate to the configured worker endpoint.
- The worker reads IP only for in-memory rate limiting and does not persist IPs.

## Deployment

### Static app hosting (GitHub Pages)

- `index.html` is a standalone app and can be hosted directly on GitHub Pages.
- `CNAME` is included for custom-domain routing.

### Optional Worker services (short links + sitewide telemetry)

`cloudflare-worker.js` handles:

- `POST /api/shorten` and `GET /s/:code` for share-link shortening.
- `POST/GET/DELETE /api/telemetry` for anonymous sitewide metrics.

Required Worker bindings in current implementation:

- `SHORT_URLS` (Cloudflare KV)
- `TELEMETRY` (Cloudflare KV)

Client config in `index.html`:

- `TELEMETRY_REMOTE_ENABLED`
- `TELEMETRY_REMOTE_ENDPOINT` (typically `https://pt-onia.app/api/telemetry`)

If you prefer D1-backed telemetry, adapt `cloudflare-worker.js` accordingly; the checked-in worker uses KV.

## Local Development

No build step is required.

1. Open `index.html` directly in a modern browser, or
2. Run a tiny static server (recommended for parity):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Folder Structure

- `index.html` - main app (UI, styles, logic, local telemetry, save/share state).
- `cloudflare-worker.js` - optional Cloudflare Worker for short URLs + sitewide telemetry.
- `README.md` - project documentation.
- `CNAME` - GitHub Pages custom domain.

## License

MIT
