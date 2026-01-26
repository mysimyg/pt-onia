# Time Off Optimizer

A visual, interactive time-off planning tool designed for employees on a **9/80 work schedule**. Plan your time off strategically to maximize long weekends, avoid losing accrued hours, and track multiple types of leave throughout the year.

**[Live App](https://pt-onia.app)**

---

## Features

### Cross-Device Sync
- **Save & Share** - Click "Save" to generate a shareable link with all your settings
- **Access Anywhere** - Open the link on any device to restore your exact setup
- **No Account Required** - Your data is encoded in the URL, no login needed
- **Short URLs** - Use the Cloudflare Worker integration for memorable short links

### Interactive Calendar
- **Click any workday** to toggle time off
- **Color-coded days** for easy visualization:
  - **Green** - Company holidays
  - **Blue** - 9/80 Fridays (already off)
  - **Diagonal split** - Days that are both a holiday and 9/80 Friday
  - **Pink** - PTO/Vacation
  - **Purple** - Activism hours
  - **Gold** - Personal days
  - **Teal** - Wellness/Sick time
  - **Gray** - Weekends
- **Past dates** are dimmed and don't affect future balance calculations
- **Hover tooltips** show details for each day

### Mobile Experience
- **Year View** - See all 12 months at a glance with color-coded mini calendars
- **Month View** - Navigate between months with detailed day selection
- **Stats Tab** - Quick access to projected balances and opportunities
- **Settings Tab** - Configure all options on mobile
- **Bottom Navigation** - Thumb-friendly tab bar (Year/Month/Stats/Settings)
- **Floating Action Button** - Quick access to common actions

### 8 Theme Options
**Light Themes:**
- Default - Clean and modern
- Minimal - Muted, earthy tones (Muji-inspired)
- Coastal - Ocean blues and teals
- Bold - Vibrant, high-contrast

**Dark Themes:**
- Default - Standard dark mode
- Minimal - Warm earth tones (Wabi-sabi inspired)
- Coastal - Deep ocean night
- Bold - Neon-inspired accents

### Multiple Time-Off Types
Track four different types of leave:

| Type | Accrual | Rollover | Notes |
|------|---------|----------|-------|
| **PTO/Vacation** | Per paycheck (based on years of service) | Up to max cap | 9 hrs Mon-Thu, 8 hrs Friday |
| **Activism** | 18 hrs/year (flat) | None - use it or lose it | For volunteer activities |
| **Personal Days** | 5 days/year | N/A | Counts as 1 full day |
| **Wellness/Sick** | 2.76 hrs/paycheck | Max 108 hrs | Excess lost at year-end |

### Smart Optimization Suggestions

#### Mega Combos
When a Monday holiday aligns with a 9/80 Friday:
- Take Friday before + Tue-Wed-Thu + Monday after
- **Result**: Up to 16 consecutive days off!

#### Super Combos
Monday holiday + 9/80 Friday same week:
- Take Tue-Wed-Thu (27 hrs PTO)
- **Result**: 9 consecutive days off!

#### Friday Packages
- **Every Friday Off** - All working Fridays for the year
- **Summer Fridays** - May through August
- **2 for 5 / 3 for 5** - Strategic months for maximum Friday coverage

### Balance Projections
- Visual bar charts for PTO and Wellness
- Data tables showing balances at each pay period
- Work Days Off counter
- Year-End Goal tracking

---

## How to Use

### 1. Configure Settings
- Select your **Year** and **Years of Service** bracket
- Enter **First Paycheck** and **First 9/80 Friday** dates
- Optionally set a **Year-End PTO Goal**

### 2. Enter Current Balances
- PTO hours, Activism hours, Personal days, Wellness hours

### 3. Select Holidays
- Check/uncheck holidays your company observes

### 4. Plan Time Off
- **Click calendar days** to toggle time off
- **Use Quick Select** for combos and packages
- **Click Opportunities** to add pre-calculated options

### 5. Save & Share
- Click **Save** to generate a shareable link
- Bookmark or share the link to access from any device

---

## Short URL Service (Cloudflare Workers)

For shorter, more shareable URLs, set up the included Cloudflare Worker.

### Setup Instructions

1. **Create a Cloudflare account** at [cloudflare.com](https://cloudflare.com) (free)

2. **Add your domain** (pt-onia.app) to Cloudflare

3. **Create a KV Namespace:**
   - Dashboard → Workers & Pages → KV
   - Create namespace called `SHORT_URLS`

4. **Create a Worker:**
   - Dashboard → Workers & Pages → Create Worker
   - Paste the contents of `cloudflare-worker.js`
   - Save and deploy

5. **Bind KV to Worker:**
   - Worker Settings → Variables → KV Namespace Bindings
   - Variable name: `SHORT_URLS`
   - KV Namespace: Select your `SHORT_URLS` namespace

6. **Add Routes:**
   - Worker Settings → Triggers → Routes
   - Add: `pt-onia.app/s/*` → your worker
   - Add: `pt-onia.app/api/shorten` → your worker

### Usage
Once configured, the app will automatically use short URLs like:
```
https://pt-onia.app/s/abc123
```

---

## Years of Service Presets

| Years | PTO per Paycheck | Max Cap |
|-------|------------------|---------|
| 0-3   | 3.07 hrs | 120 hrs |
| 4-6   | 4.61 hrs | 180 hrs |
| 7-9   | 6.15 hrs | 240 hrs |
| 10+   | 7.69 hrs | 300 hrs |
| Custom | User-defined | User-defined |

---

## Understanding the 9/80 Schedule

- **Monday - Thursday**: 9-hour workdays
- **Friday**: Either 8-hour workday OR day off (alternating)
- Every other Friday is off (your "9/80 Friday")

**PTO Impact:**
- Monday-Thursday off = **9 hours** PTO
- Working Friday off = **8 hours** PTO
- Personal days = **1 day** regardless of weekday

---

## Technical Details

### Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for all screen sizes
- Touch-optimized for mobile

### Data Storage
- Settings encoded in URL hash (shareable)
- Theme preference saved to localStorage
- No server-side storage required
- No accounts or data collection

### Dependencies
- Single HTML file
- Google Fonts (Inter)
- Optional: Cloudflare Worker for short URLs

---

## Deployment

### GitHub Pages
1. Push `index.html` to your repository
2. Settings → Pages → Select branch
3. Add custom domain (pt-onia.app)
4. Enable HTTPS

### Custom Domain DNS
Add to your domain's DNS:
- `A` records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `CNAME` for www: `your-username.github.io`

---

## Customization

### Modify PTO Tiers
```javascript
const SERVICE_PRESETS = {
    '0-3': { ptoPerPaycheck: 3.07, maxPto: 120 },
    '4-6': { ptoPerPaycheck: 4.61, maxPto: 180 },
    // ...
};
```

### Modify Holidays
```javascript
const ALL_HOLIDAYS = [
    { id: 'newyear', name: "New Year's Day", default: true },
    // ...
];
```

### Fixed Values
- Wellness per paycheck: `2.76`
- Wellness max rollover: `108`
- Activism yearly: `18`
- Personal days max: `5`

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main application (single-file, no dependencies) |
| `cloudflare-worker.js` | Short URL service for Cloudflare Workers |
| `README.md` | Documentation |

---

## License

MIT License - Feel free to use, modify, and distribute.

---

Built to help employees maximize their time off while staying within policy limits.
