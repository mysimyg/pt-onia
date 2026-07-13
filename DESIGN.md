---
version: alpha
name: Patagonia-pto-optimizer-design
description: A utilitarian, photography-optional interface built on Patagonia.com's black-and-white chrome — Ridgeway Sans throughout, black as the only interactive color, squared geometry, hairline dividers instead of shadows. Status and data visualization borrow a restrained ramp from the Fitz Roy label sunset (orange, peach, sky, lavender, indigo), the one place color is allowed to speak. Built for the internal PTO Optimizer app — dense, honest, and calm. Gear, not marketing.

colors:
  primary: "#000000"
  primary-hover: "#333333"
  on-primary: "#ffffff"
  ink: "#222222"
  ink-strong: "#000000"
  ink-muted: "#666666"
  ink-subtle: "#8c8c8c"
  ink-on-dark: "#ffffff"
  ink-on-dark-muted: "#b3b3b3"
  canvas: "#ffffff"
  canvas-alt: "#f5f5f5"
  surface-footer: "#000000"
  surface-overlay: "rgba(0, 0, 0, 0.55)"
  hairline: "#e5e5e5"
  border-strong: "#cccccc"
  border-input: "#8c8c8c"
  focus-ring: "#0165a5"
  alert: "#cc0000"
  status-approved: "#2c6e49"
  status-pending: "#b45309"
  status-denied: "#cc0000"
  status-holiday: "#0165a5"
  tint-approved: "#e8f1ec"
  tint-pending: "#f7ecdd"
  tint-denied: "#f9e6e6"
  tint-holiday: "#e6eff6"
  tint-blackout: "#efefef"
  fitz-orange: "#fb6526"
  fitz-peach: "#f9a971"
  fitz-sky: "#0165a5"
  fitz-lavender: "#a68deb"
  fitz-indigo: "#3b2089"

typography:
  wordmark:
    fontFamily: "Belwe Bold, Belwe Std, Georgia, serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0
  hero-display:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.5px
  display-lg:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.25px
  heading-md:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  heading-sm:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  eyebrow:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 1.5px
    textTransform: uppercase
  body:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  body-compact:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  caption-strong:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.25px
  data-display:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.5px
  data-md:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  button:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.25px
  button-compact:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.25px
  nav-link:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
  footer-link:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 2.0
    letterSpacing: 0
  fine-print:
    fontFamily: "Ridgeway Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 8px
  lg: 16px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px

components:
  pencil-banner:
    backgroundColor: "{colors.surface-footer}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.body-compact}"
    height: 40px
    rounded: "{rounded.none}"
  global-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderBottom: "1px solid {colors.hairline}"
    height: 64px
    paddingX: "{spacing.lg}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    padding: 8px 12px
  nav-link-active:
    textColor: "{colors.ink-strong}"
    typography: "{typography.nav-link}"
    borderBottom: "2px solid {colors.ink-strong}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: 14px 24px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xs}"
  button-primary-disabled:
    backgroundColor: "{colors.border-strong}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.xs}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-strong}"
    border: "1px solid {colors.ink-strong}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: 13px 23px
  button-ghost-danger:
    backgroundColor: transparent
    textColor: "{colors.alert}"
    typography: "{typography.button-compact}"
    padding: 8px 12px
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    textDecoration: underline
  field-label:
    textColor: "{colors.ink}"
    typography: "{typography.caption-strong}"
    marginBottom: "{spacing.xxs}"
  input-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.border-input}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: 12px 14px
  input-field-focus:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.ink-strong}"
    outline: "2px solid {colors.focus-ring}"
    outlineOffset: 1px
  input-field-error:
    border: "1px solid {colors.alert}"
    helperTextColor: "{colors.alert}"
    helperTypography: "{typography.caption}"
  select-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.border-input}"
    rounded: "{rounded.xs}"
    padding: 12px 40px 12px 14px
    chevronColor: "{colors.ink-strong}"
  calendar-grid:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    internalDividers: "1px solid {colors.hairline}"
    rounded: "{rounded.none}"
  calendar-weekday-header:
    textColor: "{colors.ink-muted}"
    typography: "{typography.eyebrow}"
    padding: "{spacing.xs} 0"
  calendar-day:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-compact}"
    minSize: 44px
  calendar-day-weekend:
    backgroundColor: "{colors.canvas-alt}"
    textColor: "{colors.ink-muted}"
  calendar-day-holiday:
    backgroundColor: "{colors.tint-holiday}"
    textColor: "{colors.ink}"
    indicatorDot: "{colors.status-holiday}"
  calendar-day-pto-approved:
    backgroundColor: "{colors.tint-approved}"
    textColor: "{colors.ink}"
    bottomBar: "3px solid {colors.status-approved}"
  calendar-day-pto-pending:
    backgroundColor: "{colors.tint-pending}"
    textColor: "{colors.ink}"
    bottomBar: "3px dashed {colors.status-pending}"
  calendar-day-blackout:
    backgroundColor: "{colors.tint-blackout}"
    textColor: "{colors.ink-subtle}"
    pattern: diagonal-hatch
  calendar-day-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  balance-card:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
    labelTypography: "{typography.eyebrow}"
    valueTypography: "{typography.data-display}"
    valueColor: "{colors.ink-strong}"
  balance-meter:
    trackColor: "{colors.canvas-alt}"
    fillColor: "{colors.primary}"
    height: 6px
    rounded: "{rounded.pill}"
  suggestion-card:
    backgroundColor: "{colors.canvas-alt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  suggestion-card-best:
    backgroundColor: "{colors.canvas}"
    border: "2px solid {colors.ink-strong}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
    badgeBackground: "{colors.primary}"
    badgeTextColor: "{colors.on-primary}"
    badgeTypography: "{typography.eyebrow}"
  status-chip-approved:
    backgroundColor: "{colors.tint-approved}"
    textColor: "{colors.status-approved}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  status-chip-pending:
    backgroundColor: "{colors.tint-pending}"
    textColor: "{colors.status-pending}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  status-chip-denied:
    backgroundColor: "{colors.tint-denied}"
    textColor: "{colors.status-denied}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  request-table-header:
    textColor: "{colors.ink-muted}"
    typography: "{typography.eyebrow}"
    borderBottom: "1px solid {colors.ink-strong}"
    padding: "{spacing.sm} 0"
  request-table-row:
    textColor: "{colors.ink}"
    typography: "{typography.body-compact}"
    borderBottom: "1px solid {colors.hairline}"
    padding: "{spacing.md} 0"
  toast-success:
    backgroundColor: "{colors.ink-strong}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  alert-banner-error:
    backgroundColor: "{colors.tint-denied}"
    textColor: "{colors.ink}"
    borderLeft: "3px solid {colors.alert}"
    typography: "{typography.body-compact}"
    padding: "{spacing.sm} {spacing.md}"
  modal:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.sm}"
    shadow: "0 8px 32px rgba(0, 0, 0, 0.24)"
    overlayColor: "{colors.surface-overlay}"
    padding: "{spacing.xl}"
  empty-state:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body}"
    padding: "{spacing.section} {spacing.lg}"
    alignment: center
  footer:
    backgroundColor: "{colors.surface-footer}"
    textColor: "{colors.ink-on-dark}"
    linkColor: "{colors.ink-on-dark}"
    linkTypography: "{typography.footer-link}"
    mutedTextColor: "{colors.ink-on-dark-muted}"
    padding: "{spacing.section} {spacing.lg}"
---

# Patagonia — PTO Optimizer Design System

## Overview

Patagonia.com runs on one of the most disciplined chrome palettes in retail: black, white, and a narrow band of grays. The storefront's `meta theme-color` is literally `black`. Photography carries all emotion; the interface around it is deliberately mute — black text on white canvas, black CTAs, hairline dividers, a black footer, and almost no radius anywhere. The label art (the Fitz Roy skyline at sunset) is the only sanctioned burst of color in the brand's visual world, and it never leaks into buttons or nav.

The PTO Optimizer inherits that discipline and adapts it for a data-dense internal tool. Where the storefront uses full-bleed imagery, the app uses whitespace and structure. Where the storefront saves color for photographs, the app saves color for **meaning**: request status (approved / pending / denied), holidays, and data visualization. Everything a user can click is black. Everything the system is telling them is a status tint. Nothing is decorative.

The cultural anchor is *Let My People Go Surfing* — this is a tool that helps people leave the building, so it should feel like Patagonia gear: functional, durable, zero flash. Dense but never cramped, honest about numbers, quiet enough that a balance of `14.5 days` in `{typography.data-display}` is the loudest thing on the screen.

**Key Characteristics:**
- Black is the only interactive color: `{colors.primary}` carries every CTA, selected calendar day, active nav state, and meter fill — exactly as black carries "Add to Cart" on the storefront
- Ridgeway Sans everywhere (Patagonia's custom grotesque, introduced 2025); Belwe Bold appears only in the `{typography.wordmark}` lockup, mirroring the logo/heritage split on patagonia.com
- Squared geometry: buttons and inputs sit at `{rounded.xs}` (2px), cards at `{rounded.sm}` (4px) max — pills are reserved for status chips and meters
- Flat elevation: hairlines (`{colors.hairline}`) do the separating; the only shadow in the system belongs to `{component.modal}`
- Status semantics own the color budget: approved green, pending amber, denied red, holiday blue — each paired with a soft tint for calendar fills so the grid stays readable at a glance
- The Fitz Roy accent ramp (`{colors.fitz-orange}` → `{colors.fitz-indigo}`) is sampled from the label sunset and is legal **only** in charts and data visualization — never in chrome
- Black footer on white canvas, black pencil banner up top: the page is bookended in ink just like the storefront

## Colors

> **Source pages:** patagonia.com home, shop landing (`/shop/mens`, `/shop/web-specials`), and the global nav/footer chrome shared across them. Storefront values that could not be pulled from a live stylesheet are close approximations and are listed in **Known Gaps** — true them up against the internal brand guide before locking `v1`.

### Brand & Chrome
- **Ink Black** (`{colors.primary}`, `{colors.ink-strong}`, `{colors.surface-footer}` — `#000000`): The brand's working color. Primary buttons, the pencil banner, the footer, selected calendar days, active nav underlines. When the app wants you to act, it goes black — same rule as the storefront.
- **Hover Charcoal** (`{colors.primary-hover}` — `#333333`): The single hover shift for black surfaces. No color change on hover, only a lightening — interaction stays monochrome.
- **Pure White** (`{colors.canvas}`, `{colors.on-primary}` — `#ffffff`): Every page background and every label on black. White is a full partner, not a void.

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): Default app background, cards, inputs, calendar weekdays.
- **Canvas Alt** (`{colors.canvas-alt}` — `#f5f5f5`): Weekend calendar cells, secondary suggestion cards, meter tracks — the quiet gray Patagonia uses for utility blocks.
- **Footer Black** (`{colors.surface-footer}` — `#000000`): Footer and pencil banner. The app is framed in ink top and bottom.
- **Overlay** (`{colors.surface-overlay}` — `rgba(0, 0, 0, 0.55)`): Modal scrim only.

### Text
- **Body Ink** (`{colors.ink}` — `#222222`): Default text. Near-black, softened one step from pure black so long tables read comfortably.
- **Strong Ink** (`{colors.ink-strong}` — `#000000`): Headings, data values, table header rules.
- **Muted** (`{colors.ink-muted}` — `#666666`) and **Subtle** (`{colors.ink-subtle}` — `#8c8c8c`): Secondary metadata and disabled/blackout text. Subtle is the floor — nothing lighter carries words.
- **On Dark** (`{colors.ink-on-dark}` — `#ffffff`, muted `#b3b3b3`): Footer and toast text.

### Status & Signal
- **Approved** (`{colors.status-approved}` — `#2c6e49`): Alpine green. Approved requests, confirmed days.
- **Pending** (`{colors.status-pending}` — `#b45309`): Dry-amber. Awaiting manager action.
- **Denied / Alert** (`{colors.status-denied}`, `{colors.alert}` — `#cc0000`): The lone red, in the spirit of the storefront's sale-price red — used for denials, blackout violations, and destructive actions. Never decorative.
- **Holiday** (`{colors.status-holiday}` — `#0165a5`): Company holidays and office closures; doubles as the `{colors.focus-ring}` for keyboard focus.
- Each status has a matching **tint** (`{colors.tint-approved}`, `{colors.tint-pending}`, `{colors.tint-denied}`, `{colors.tint-holiday}`, `{colors.tint-blackout}`) for calendar fills and chips. Text on a tint is always the full-strength status color or `{colors.ink}` — never white.

### Fitz Roy Accent Ramp (data visualization only)
Sampled from the label's sunset skyline: `{colors.fitz-orange}` `#fb6526`, `{colors.fitz-peach}` `#f9a971`, `{colors.fitz-sky}` `#0165a5`, `{colors.fitz-lavender}` `#a68deb`, `{colors.fitz-indigo}` `#3b2089`. Use in this order for categorical series (PTO type breakdowns, team coverage charts, year-over-year comparisons). These hexes are community-sampled from label art, not pulled from the brand guide — see Known Gaps. The rule is absolute: **the ramp never touches buttons, nav, links, or text.**

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — `#e5e5e5`): Card edges, table rows, nav bottom, calendar grid lines. The system's primary separator.
- **Border Strong** (`{colors.border-strong}` — `#cccccc`): Disabled button fill and heavier structural rules.
- **Border Input** (`{colors.border-input}` — `#8c8c8c`): Resting input stroke — dark enough to read as fillable, one step below full ink which is reserved for focus.

## Typography

### Font Family
- **Ridgeway Sans** — Patagonia's first custom grotesque, introduced in early 2025 and named for a former colleague. It is the app's only working face: headings, body, data, buttons, captions. Proprietary; request desktop/web files and the licensed weight set from Brand/Creative. Fallback stack: `Helvetica Neue, Helvetica, Arial, sans-serif`.
- **Belwe Bold** — the wordmark face since 1973. In the app it appears exactly once: the `{typography.wordmark}` lockup in `{component.global-nav}` ("Patagonia · PTO Optimizer" or equivalent). It never sets headings, UI copy, or data. Belwe is a licensed commercial face (Bitstream); confirm coverage before shipping it in a web bundle, or render the lockup as an SVG asset.

### Hierarchy
| Token | Face | Size / Weight | Use |
|---|---|---|---|
| `{typography.wordmark}` | Belwe Bold | 24 / 700 | Nav lockup only |
| `{typography.hero-display}` | Ridgeway Sans | 48 / 700 | Dashboard greeting, empty-state hero |
| `{typography.display-lg}` | Ridgeway Sans | 36 / 700 | Page titles |
| `{typography.heading-md}` | Ridgeway Sans | 28 / 700 | Section heads ("Your Balance", "Suggested Windows") |
| `{typography.heading-sm}` | Ridgeway Sans | 20 / 500 | Card titles, modal titles |
| `{typography.eyebrow}` | Ridgeway Sans | 12 / 700 / +1.5px / caps | Labels above data, table headers, weekday row |
| `{typography.body}` / `{typography.body-strong}` | Ridgeway Sans | 16 / 400–500 | Default copy, form values |
| `{typography.body-compact}` | Ridgeway Sans | 14 / 400 | Tables, calendar cells, toasts |
| `{typography.data-display}` / `{typography.data-md}` | Ridgeway Sans | 40–24 / 700 | Balance numbers — set with tabular numerals (`font-variant-numeric: tabular-nums`) |
| `{typography.caption}` / `{typography.caption-strong}` | Ridgeway Sans | 13 / 400–500 | Helper text, chips, field labels |
| `{typography.button}` / `{typography.button-compact}` | Ridgeway Sans | 16–14 / 500 | CTAs — sentence case, never uppercase |
| `{typography.nav-link}` / `{typography.footer-link}` | Ridgeway Sans | 14 / 400 | Chrome links |
| `{typography.fine-print}` | Ridgeway Sans | 12 / 400 | Policy footnotes, accrual math disclosures |

### Principles
- The weight ladder is 400 / 500 / 700. Nothing lighter than 400 carries text; 700 is reserved for headings and data values so bold always means "this is the point."
- Display sizes tighten (`-0.5px` to `-0.25px`); body and below sit at neutral tracking. Only `{typography.eyebrow}` tracks open, and only in caps.
- Numbers are content. PTO balances, day counts, and dates get `{typography.data-display}` / `{typography.data-md}` with tabular numerals so columns and meters align.
- Sentence case everywhere except eyebrows. The storefront's voice is plainspoken; buttons say "Request time off," not "REQUEST TIME OFF."

### Note on Font Substitutes
If Ridgeway Sans files are unavailable in an environment, the Helvetica-family fallback preserves proportions closely enough for layout work; `Inter` or `Roboto` at matched sizes are acceptable last-resort stand-ins for prototypes only. For the Belwe wordmark, there is no good free substitute — commonly suggested stand-ins (Cormorant Garamond, Playfair Display, Libre Baskerville) miss its Kuenstler weight and warmth. Prefer shipping the lockup as an approved SVG from Brand rather than substituting.

## Layout

### Spacing System
An 8px base with a 4px half-step: `{spacing.xxs}` 4 → `{spacing.xs}` 8 → `{spacing.sm}` 12 → `{spacing.md}` 16 → `{spacing.lg}` 24 → `{spacing.xl}` 32 → `{spacing.xxl}` 48 → `{spacing.section}` 64. The app is denser than the storefront's marketing pages — section rhythm is 64px, not 80+ — because this is a work tool, not a campaign. Card interiors default to `{spacing.lg}`; form fields stack at `{spacing.md}`; page sections separate at `{spacing.section}`.

### Grid & Container
- 12-column grid, `{spacing.lg}` (24px) gutters, content max-width **1440px**, page padding `{spacing.lg}` (desktop) / `{spacing.md}` (mobile).
- Dashboard reference layout: balance cards in a 3-up row, calendar taking 8 columns with the optimizer suggestion rail in the remaining 4.
- Tables and the calendar run full container width; forms cap at ~560px for comfortable line length.

### Whitespace Philosophy
The storefront lets photography breathe; the app lets **numbers** breathe. Balance values get empty space around them instead of borders-on-borders. When a region feels crowded, remove a rule line before shrinking a margin — and switch surface (`{colors.canvas}` ↔ `{colors.canvas-alt}`) before adding either.

## Elevation & Depth

Patagonia chrome is flat. Separation comes from hairlines and surface swaps, not shadows:
- Level 0 — page: `{colors.canvas}`, no elevation.
- Level 0.5 — cards, calendar, tables: `1px {colors.hairline}` border, no shadow.
- Level 1 — `{component.modal}` only: `0 8px 32px rgba(0, 0, 0, 0.24)` over `{colors.surface-overlay}`. This is the system's single shadow.
- Toasts float by contrast (black on white), not by blur.

### Decorative Depth
None. No gradients, no glassmorphism, no layered translucency. If a surface needs emphasis, it gets a 2px black border (`{component.suggestion-card-best}`) — the same move the storefront makes with black CTAs on white.

## Shapes

### Border Radius Scale
- `{rounded.none}` 0px — calendar grid, tables, pencil banner, footer: structural surfaces stay square.
- `{rounded.xs}` 2px — buttons and inputs. Patagonia CTAs read as near-square; 2px keeps corners from pixel-snagging without going soft.
- `{rounded.sm}` 4px — cards, modals, toasts.
- `{rounded.md}` 8px / `{rounded.lg}` 16px — reserved; use only if a future surface genuinely needs it (avatar containers, image thumbnails).
- `{rounded.pill}` — status chips and `{component.balance-meter}` only. A pill always means "read me, don't click me."

### Geometry
Blocks are rectangular and grid-locked. The calendar is the app's visual signature: a hairline lattice of perfect squares where color fills — not shapes — carry state. Any photography (login screen, empty states) runs edge-to-edge and uncropped by radius, per storefront convention.

## Components

### Top Navigation & Pencil Banner
`{component.pencil-banner}` (black, 40px) carries one line — company holiday reminders, enrollment deadlines — in `{typography.body-compact}` white. Below it, `{component.global-nav}` (white, 64px, hairline bottom): `{typography.wordmark}` lockup left; `{component.nav-link}` items (Dashboard, Calendar, Requests, Team) center-left; user menu right. Active section takes `{component.nav-link-active}`'s 2px black underline — the storefront's active-state grammar.

### Buttons
- `{component.button-primary}` — black fill, white label, 2px radius, `14px 24px` padding (44px+ target). One per view region. Hover shifts to `{colors.primary-hover}`; disabled drops to `{colors.border-strong}` fill.
- `{component.button-secondary}` — white fill, 1px black border. Pairs with primary for cancel/back.
- `{component.button-ghost-danger}` — text-only red for "Cancel request" / "Delete draft." Red never gets a filled button; denial is signal, not celebration.
- `{component.text-link}` — underlined ink, storefront-style. Links are always underlined; color alone never marks a link.

### Calendar
The core surface. `{component.calendar-grid}` is a hairline lattice; `{component.calendar-weekday-header}` runs `{typography.eyebrow}`. Day states, in visual priority order: `{component.calendar-day-selected}` (black/white) > `{component.calendar-day-blackout}` (hatched gray) > `{component.calendar-day-pto-approved}` (green tint + 3px solid bottom bar) > `{component.calendar-day-pto-pending}` (amber tint + 3px dashed bar) > `{component.calendar-day-holiday}` (blue tint + dot) > `{component.calendar-day-weekend}` (`{colors.canvas-alt}`) > `{component.calendar-day}`. Solid bar = confirmed, dashed = provisional — state survives colorblind viewing and grayscale printing.

### Cards & Data
- `{component.balance-card}` — eyebrow label ("Available PTO"), `{typography.data-display}` value, `{component.balance-meter}` beneath (black fill on gray track), `{typography.caption}` accrual note.
- `{component.suggestion-card}` — the optimizer's output: gray blocks listing candidate windows ("Take Jul 2–3, get 9 days off for 4 days PTO") with day-math in `{typography.data-md}`. The top recommendation upgrades to `{component.suggestion-card-best}`: white, 2px black border, black "Best value" eyebrow badge.
- `{component.request-table-header}` + `{component.request-table-row}` — eyebrow headers over a 1px black rule; rows separate on hairlines with a `{component.status-chip-*}` in the status column.

### Inputs & Forms
`{component.field-label}` above every control — no floating labels, no placeholder-as-label. `{component.input-field}` and `{component.select-field}` share the 2px-radius, gray-stroke resting state; focus swaps to a black border plus the `{colors.focus-ring}` blue outline (the app's only non-black interactive color, earned by accessibility). Errors stroke red with `{typography.caption}` helper text below. Date ranges compose two inputs joined by an em dash, opening the calendar as picker.

### Status & Feedback
`{component.status-chip-approved|pending|denied}` — tinted pills with full-strength status text. `{component.toast-success}` — black bar, bottom-left, auto-dismiss. `{component.alert-banner-error}` — red-tinted banner, 3px red left rule, for blocking problems (insufficient balance, blackout conflict). `{component.empty-state}` — centered muted copy with a single primary button; photography optional.

### Footer
`{component.footer}` is storefront-black: white links (Policy handbook, Holiday schedule, HR contact, Ironclad Guarantee-style plain answers), muted gray legal line in `{typography.fine-print}`. Every page ends in ink.

## Do's and Don'ts

### Do
- Keep black the only clickable color — if it's interactive, it's black (or underlined ink).
- Pair every status color with its tint, and every calendar state with a non-color cue (bar, dash, dot, hatch).
- Set all balances and day counts in `{typography.data-display}`/`{typography.data-md}` with tabular numerals.
- Use surface swaps (`{colors.canvas}` ↔ `{colors.canvas-alt}`) before borders, and borders before shadows.
- Write buttons in sentence case, plainspoken: "Request time off," "Save draft."
- Reserve the Fitz Roy ramp for charts, applied in the fixed order orange → peach → sky → lavender → indigo.

### Don't
- Don't introduce a "brand accent" button color — the storefront has none, and neither does this app.
- Don't use `{colors.alert}` red for anything except denial, conflict, and destruction; never for emphasis.
- Don't round buttons past `{rounded.xs}` or cards past `{rounded.sm}` — pill CTAs read as a different brand entirely.
- Don't put white text on status tints, or status text on white without its chip.
- Don't set headings in Belwe — the wordmark is a logo, not a typeface choice.
- Don't add drop shadows to cards, nav, or calendar; the modal owns the only shadow.
- Don't let Fitz Roy colors into chrome, chips, or text — data visualization only.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Phone | ≤ 640px | Single column; calendar switches month-grid → week strip + agenda list; balance cards stack; nav collapses to hamburger + wordmark |
| Tablet portrait | 641–1023px | 2-up balance cards; calendar full-width with suggestion rail below; tables allow horizontal scroll |
| Desktop | 1024–1439px | Full 12-col dashboard: 8-col calendar + 4-col rail; 3-up balance cards |
| Wide | ≥ 1440px | Content locks at 1440px; margins absorb extra width |

### Touch Targets
- Minimum 44 × 44px everywhere. Calendar day cells hold 44px+ at all breakpoints — on phone the week-strip cells widen rather than shrink.
- `{component.button-primary}` lands ≈ 44 × 120px; table rows accept full-row tap on mobile with the chip as the visual anchor.

### Collapsing Strategy
- **Nav**: full link row → hamburger sheet at ≤ 640px; wordmark persists, pencil banner truncates to one line with no wrap.
- **Calendar**: month grid → horizontally scrollable week strip + vertical agenda ("Jul 3 — Approved PTO"). State colors and bars carry over 1:1.
- **Suggestion rail**: right rail → stacked cards under the calendar; `{component.suggestion-card-best}` always sorts first.
- **Tables**: column priority Date > Status > Type > Approver; lower-priority columns fold into an expandable row detail.

### Image Behavior
Photography is optional chrome here — login and empty states only. When used, it runs full-bleed, art-directed crops per breakpoint, `loading="lazy"` except the login hero, and never behind text without a `{colors.surface-overlay}` scrim.

## Iteration Guide

1. Work one component at a time and address it by key (`{component.calendar-day-pto-pending}`, `{component.balance-card}`).
2. State variants live as sibling entries (`-hover`, `-disabled`, `-selected`, `-pending`) — never as prose-only notes.
3. Reference `{token.refs}` everywhere; a raw hex in a component spec is a bug.
4. Document default + active/pressed; treat hover as a lightness shift on black, nothing else.
5. The two hard boundaries: black-only interactivity, and Fitz Roy colors confined to data-viz. Proposals that cross either need Brand sign-off, not a token edit.
6. New status semantics (e.g., "floating holiday") get a full set: color + tint + chip + calendar-day entry + non-color cue.
7. When emphasis is needed, escalate in this order: whitespace → surface swap → 2px black border. Stop there.

## Known Gaps

- **Approximated grays and red**: `{colors.ink}` `#222222`, `{colors.canvas-alt}` `#f5f5f5`, `{colors.hairline}` `#e5e5e5`, `{colors.border-strong}` `#cccccc`, and `{colors.alert}` `#cc0000` are close matches to storefront chrome, not values read from a production stylesheet. Verify against the internal brand guide / patagonia.com CSS and true up before `v1`.
- **Ridgeway Sans weight set**: the shipped weights (and whether a true 500 exists) weren't publicly documented at time of writing; the 400/500/700 ladder assumes a standard grotesque family. Confirm with Brand/Creative and remap `body-strong`/`button` if needed.
- **Belwe licensing**: Bitstream commercial license; web-embedding rights unverified here. The safe default is the SVG-lockup route.
- **Fitz Roy ramp**: hexes are community-sampled from label art, not brand-guide values. Fine for internal charts; swap in official values if the brand guide specifies them.
- **Dark mode**: not defined. The storefront ships light-only; if the app needs one, start by inverting canvas/ink and re-testing every tint for contrast.
- **Storefront button radius**: documented here as 2px from visual inspection; if production CSS says 0 or 4, adopt it globally via `{rounded.xs}`.
- **Status colors are an extension**: the storefront has no approved/pending/denied semantics; these were designed to Patagonia's restraint (muted, outdoorsy, AA on white) but are original to this app.