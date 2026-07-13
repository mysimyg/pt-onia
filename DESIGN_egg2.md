---
version: 3.0.0
name: Britannia — Great British Kit
description: An unmistakably British design system for Claude AI. Built from the national icons — the Union trichrome of Pantone-280 blue, pillar-box red and white; heraldic royal gold; British Racing Green; and warm parchment. Typeset in the great British publishing duo, Caslon for mastheads and Gill Sans for everything else. Signature devices lifted straight from the streets: the Underground roundel, triangular bunting, the prize rosette, the perforated postage stamp, and the hanging pub sign. The voice is warm, polite and idiomatic — "Right then", "Brilliant", "Just a tick", "Terribly sorry". Ordered and well-mannered on an 8px grid, but proud of its colours and never mistakable for anywhere else on earth.

colors:
  primary: "#012169"          # Union Blue — the Pantone 280 of the national flag; nav, primary actions, authority
  primary-pressed: "#00133F"  # Admiralty — hover/pressed deepening of Union Blue
  secondary: "#004225"        # British Racing Green — success, heritage highlights, quiet approval
  accent: "#FBF7EC"           # Parchment — card backgrounds, hospitality panels, quotes, off-canvas menus
  red: "#C8102E"              # Pillar-Box Red — the flag's red, the telephone box, the post box; a hero accent
  gold: "#C8A951"             # Royal Gold — heraldic gilt; crests, royal-warrant lockups, rosette centres, medallions
  canvas: "#FFFFFF"           # White — the flag's white; default page and card body
  canvas-soft: "#F4F1E4"      # Portland Stone — derived; alternate wash, zebra rows, recessed wells
  mist: "#DED8C7"             # Chalk — derived; the warm 1px hairline, dividers, disabled states
  ink: "#14213D"              # Westminster Ink — standard body text and dark UI elements (a near-black navy)
  ink-soft: "#45496B"         # Slate — derived; secondary text, captions, helper copy
  ink-muted: "#8A8B9E"        # Drizzle — derived; placeholder text, timestamps, fine print
  error: "#C8102E"            # alias of red — Pillar-Box Red doubles as the danger/destructive colour
  success: "#004225"          # alias of secondary — confirmations and success banners
  on-primary: "#FFFFFF"       # text/icons on blue, green, and red surfaces
  on-gold: "#14213D"          # Westminster Ink text on royal-gold surfaces
  hairline: "#DED8C7"         # alias of mist — the universal 1px border stroke
  focus: "#C8102E"            # focus ring — Pillar-Box Red, 2px; visibility is a courtesy

typography:
  masthead:
    fontFamily: "Libre Caslon Display"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  h1:
    fontFamily: "Libre Caslon Display"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  h2:
    fontFamily: "Libre Caslon Text"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  h3:
    fontFamily: "Gill Sans"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body:
    fontFamily: "Gill Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-medium:
    fontFamily: "Gill Sans"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0
  small:
    fontFamily: "Gill Sans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label:
    fontFamily: "Gill Sans"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
  button:
    fontFamily: "Gill Sans"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.02em
  overline:
    fontFamily: "Gill Sans"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.12em
  micro:
    fontFamily: "Gill Sans"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.02em

rounded:
  none: 0px
  standard: 4px               # the working radius — buttons, cards, inputs, modals
  sign: "12px 12px 4px 4px"   # hanging pub-sign cards — rounded top, square foot
  full: 9999px                # roundels, rosettes, medallions, radio dots, avatars

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  xxl: 64px

elevation:
  card: "0px 4px 6px -1px rgba(1, 33, 105, 0.12)"
  overlay: "0px 10px 15px -3px rgba(1, 33, 105, 0.14), 0px 4px 6px -2px rgba(1, 33, 105, 0.06)"
  sign: "0px 6px 10px -2px rgba(1, 33, 105, 0.16)"   # the gentle sway of a hanging sign
  border: "1px solid #DED8C7"

patterns:
  union-jack:
    description: "The Union Flag, used as a compact brand device (favicons, badge fills, the app icon) and as a faint watermark on empty states. Diagonals and cross in Pillar-Box Red on Union Blue with white fimbriation. Never stretched, never behind body text."
    colors: ["{colors.primary}", "{colors.red}", "{colors.canvas}"]
  bunting:
    description: "A string of triangular pennants alternating Union Blue, Pillar-Box Red, and White, hung along the top edge of headers and celebratory banners. Pennants are equilateral, 24px tall, on a 1px chalk string."
    colors: ["{colors.primary}", "{colors.red}", "{colors.canvas}"]
  tartan:
    description: "A muted two-colour tartan sett (Racing Green ground, Union Blue and Chalk overchecks) filling hospitality wells and the off-canvas menu at 8–12% strength so text stays legible. Woven, not printed — kept quiet."
    colors: ["{colors.secondary}", "{colors.primary}", "{colors.mist}"]
  roundel:
    description: "The Transport-style roundel — a solid ring with a horizontal bar across the centre. Union Blue ring by default (Pillar-Box Red for alerts), used as the app's status device, list bullets, and section markers."
    colors: ["{colors.primary}", "{colors.red}"]
  stamp-perforation:
    description: "The scalloped, perforated edge of a postage stamp, applied as a frame to avatars and feature images. A 2px chalk perforation band inside a 4px white gutter."
    colors: ["{colors.mist}", "{colors.canvas}"]

components:
  nav-bar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm} {spacing.md}"
    height: 64px
    topAccent: "3px solid {colors.gold}"
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.sm}"
    activeIndicator: "2px solid {colors.gold}"
  wordmark:
    description: "Brand lockup at nav-left — a small Union-Jack roundel device followed by the product name in Caslon."
    device: "{patterns.roundel}"
    typography: "{typography.h3}"
    textColor: "{colors.on-primary}"
  breadcrumb:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    typography: "{typography.small}"
    separator: "›"
    currentColor: "{colors.ink}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.md}"
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.md}"
    transition: "background-color 150ms ease"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.md}"
    height: 44px
  button-royal:
    description: "The ceremonial call-to-action — royal-gold fill with Westminster-Ink text and a 1px darker-gold rule. Reserved for the single most important 'By Appointment' moment on a page."
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    border: "1px solid #A98A34"
    typography: "{typography.button}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.md}"
    height: 44px
  button-destructive:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.md}"
    height: 44px
  button-quiet:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.sm}"
    hoverBackground: "{colors.canvas-soft}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.ink-muted}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.body}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.sm}"
    height: 44px
  text-input-focus:
    border: "1px solid {colors.red}"
    ring: "0 0 0 2px {colors.focus}"
  text-input-error:
    border: "1px solid {colors.error}"
    ring: "0 0 0 2px {colors.error}"
  select-dropdown:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.body}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.sm}"
    height: 44px
  field-label:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    marginBottom: "{spacing.xs}"
  helper-text:
    textColor: "{colors.ink-soft}"
    typography: "{typography.small}"
    marginTop: "{spacing.xs}"
  checkbox:
    size: 20px
    rounded: "{rounded.standard}"
    border: "1px solid {colors.hairline}"
    checkedBackground: "{colors.primary}"
    checkColor: "{colors.on-primary}"
  radio-option:
    size: 20px
    rounded: "{rounded.full}"
    border: "1px solid {colors.hairline}"
    checkedRing: "{colors.primary}"
  toggle:
    description: "Track-and-thumb switch. Off is chalk; on is Union Blue with a white thumb. The one place a pill shape (the track) is sanctioned."
    trackOff: "{colors.mist}"
    trackOn: "{colors.primary}"
    thumb: "{colors.canvas}"
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    boxShadow: "{elevation.card}"
    rounded: "{rounded.standard}"
    padding: "{spacing.md}"
  card-parchment:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.standard}"
    padding: "{spacing.md}"
  card-sign:
    description: "The hanging pub-sign card — rounded top, square foot, a soft sway shadow and a 3px Union-Blue top rule, as if suspended from a bracket. For feature callouts and hero tiles."
    backgroundColor: "{colors.canvas}"
    topRule: "3px solid {colors.primary}"
    boxShadow: "{elevation.sign}"
    rounded: "{rounded.sign}"
    padding: "{spacing.md}"
  crest-header:
    description: "Royal-warrant masthead lockup — a centred gold crest device above a Caslon title, with a hairline rule and 'By appointment' overline. Opens important pages."
    device: "{patterns.union-jack}"
    accentColor: "{colors.gold}"
    titleTypography: "{typography.masthead}"
    overlineTypography: "{typography.overline}"
  quote-block:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    borderLeft: "4px solid {colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.standard}"
    padding: "{spacing.sm} {spacing.md}"
  section-header:
    textColor: "{colors.ink}"
    typography: "{typography.h2}"
    borderBottom: "1px solid {colors.hairline}"
    paddingBottom: "{spacing.sm}"
    marginBottom: "{spacing.md}"
  divider:
    backgroundColor: "{colors.mist}"
    height: 1px
    margin: "{spacing.md} 0"
  bunting-divider:
    description: "A festive section break — a string of triangular Union-trichrome pennants on a chalk line. For celebratory dashboards and empty-state cheer, used sparingly."
    pattern: "{patterns.bunting}"
    height: 24px
    margin: "{spacing.lg} 0"
  table-header:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    borderBottom: "2px solid {colors.primary}"
    padding: "{spacing.xs} {spacing.sm}"
  table-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    borderBottom: "1px solid {colors.hairline}"
    padding: "{spacing.xs} {spacing.sm}"
    hoverBackground: "{colors.canvas-soft}"
  badge-neutral:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.standard}"
    padding: "2px {spacing.xs}"
  badge-success:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.micro}"
    rounded: "{rounded.standard}"
    padding: "2px {spacing.xs}"
  badge-error:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-primary}"
    typography: "{typography.micro}"
    rounded: "{rounded.standard}"
    padding: "2px {spacing.xs}"
  rosette:
    description: "A prize/election rosette — a pleated Union-Blue (or Racing-Green) ring around a gold medallion centre, with two ribbon tails below. The mark of something featured, won, or 'best in show'."
    ringColor: "{colors.primary}"
    centreColor: "{colors.gold}"
    centreText: "{colors.on-gold}"
    tailColor: "{colors.red}"
    rounded: "{rounded.full}"
  roundel-status:
    description: "The Transport roundel used as a live status device — Racing-Green bar for operating/normal, Pillar-Box-Red for disruption, Drizzle for closed."
    ringColorDefault: "{colors.primary}"
    barColorGood: "{colors.secondary}"
    barColorAlert: "{colors.red}"
    rounded: "{rounded.full}"
  alert-error:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderLeft: "4px solid {colors.error}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.standard}"
    padding: "{spacing.sm} {spacing.md}"
  alert-success:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderLeft: "4px solid {colors.secondary}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.standard}"
    padding: "{spacing.sm} {spacing.md}"
  alert-notice:
    description: "The 'Mind the gap' notice — a Union-Blue banner strip with white text and a roundel device at left, for standing service messages."
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    device: "{patterns.roundel}"
    rounded: "{rounded.standard}"
    padding: "{spacing.sm} {spacing.md}"
  dropdown-menu:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    boxShadow: "{elevation.overlay}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs}"
    itemPadding: "{spacing.xs} {spacing.sm}"
    itemHover: "{colors.canvas-soft}"
  modal:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    boxShadow: "{elevation.overlay}"
    rounded: "{rounded.standard}"
    padding: "{spacing.lg}"
    maxWidth: 560px
    scrimColor: "rgba(1, 33, 105, 0.45)"
    topAccent: "3px solid {colors.gold}"
  tabs:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    activeColor: "{colors.primary}"
    activeIndicator: "2px solid {colors.red}"
    typography: "{typography.label}"
    padding: "{spacing.xs} {spacing.sm}"
  stamp-frame:
    description: "Postage-stamp frame for avatars and feature images — a perforated chalk edge inside a white gutter. Avatars are round-perforated; feature images are 16:9 with a straight perforation."
    pattern: "{patterns.stamp-perforation}"
    rounded: "{rounded.standard}"
  footer-bar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl} {spacing.md}"
    topAccent: "3px solid {colors.gold}"

  # ─── Examples (illustrative) — kit-mirror demonstration surfaces ───
  ex-pricing-tier:
    description: "Default pricing tier card. Re-uses card chrome on the white canvas surface."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.standard}"
    padding: "{spacing.md}"
  ex-pricing-tier-featured:
    description: "Featured/recommended tier — polarity-flipped Union-Blue surface with white text and a Royal-Gold rosette reading 'Best in show'."
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    badgeBackground: "{colors.gold}"
    badgeText: "{colors.on-gold}"
    rounded: "{rounded.standard}"
    padding: "{spacing.md}"
  ex-product-selector:
    description: "What's Included summary card — Racing-Green roundel ticks per included line."
    backgroundColor: "{colors.canvas}"
    tickColor: "{colors.secondary}"
    rounded: "{rounded.standard}"
    padding: "{spacing.md}"
  ex-cart-drawer:
    description: "Order summary — line items per add-on with chalk hairline dividers and a Union-Blue total row."
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.standard}"
    padding: "{spacing.md}"
    item-divider: "{colors.hairline}"
    totalColor: "{colors.primary}"
  ex-app-shell-row:
    description: "Sidebar nav row. Active state uses a 3px Union-Blue left rule and a Portland-Stone fill."
    backgroundColor: transparent
    activeBackground: "{colors.canvas-soft}"
    activeIndicator: "3px solid {colors.primary}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.sm}"
  ex-data-table-cell:
    description: "Default data-table th + td chrome. Header uses the label voice on Portland Stone with a 2px Union-Blue underrule; body uses small."
    headerBackground: "{colors.canvas-soft}"
    headerTypography: "{typography.label}"
    bodyTypography: "{typography.small}"
    cellPadding: "{spacing.xs} {spacing.sm}"
    rowBorder: "{colors.hairline}"
  ex-auth-form-card:
    description: "Sign-in / sign-up card. Card chrome with text-input primitives inside and a single Union-Blue primary button; a small roundel wordmark at the top."
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.standard}"
    padding: "{spacing.lg}"
  ex-modal-card:
    description: "Modal dialog surface — card chrome with the overlay shadow, a 3px gold top accent, over the Union-Blue scrim."
    backgroundColor: "{colors.canvas}"
    boxShadow: "{elevation.overlay}"
    rounded: "{rounded.standard}"
    padding: "{spacing.lg}"
  ex-empty-state-card:
    description: "Empty-state frame on Parchment with a faint Union-Jack watermark, captioned in the warm reserved voice ('Nothing here just yet, I'm afraid.')."
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xl}"
    captionTypography: "{typography.body}"
  ex-toast:
    description: "Toast notification — card shape + card shadow, sliding in with restraint (150ms, no bounce)."
    backgroundColor: "{colors.canvas}"
    boxShadow: "{elevation.card}"
    rounded: "{rounded.standard}"
    padding: "{spacing.xs} {spacing.sm}"
    typography: "{typography.body}"

---


## Overview

Britannia is the web rendered as **the Great British high street**: the red pillar box on the corner, the blue-and-red Underground roundel over the stairs, the bunting strung across the market, the royal warrant above the shop door, and a Penguin paperback on the bench. Where the previous heritage system whispered its Britishness in muted navy and cream — and, frankly, could have been a Scandinavian bank — this one says it out loud. The nation's own colours, its own typefaces, and its own street furniture are the design language, deployed with enough confidence that the interface could not possibly be mistaken for anywhere else.

The system is built on the **Union trichrome**: Pantone-280 Union Blue `{colors.primary}` for authority and structure, Pillar-Box Red `{colors.red}` for energy and attention, and White `{colors.canvas}` between them. A fourth voice, **Royal Gold** `{colors.gold}`, is the heraldic gilt reserved for ceremony — crests, royal-warrant lockups, prize rosettes, and the single most important action on a page. **British Racing Green** `{colors.secondary}` carries success and quiet approval, and **Parchment** `{colors.accent}` warms the hospitality surfaces like the pages of a well-read Penguin Classic. The neutrals are warmed to **Portland Stone** and **Chalk** so even the quiet chrome feels like it belongs to an old building rather than a spreadsheet.

Character comes from **iconic devices, not decoration**. The Transport roundel is the app's status mark and its bullet point. Triangular bunting breaks celebratory sections. The prize rosette flags what's featured or won. Postage-stamp perforations frame avatars and photographs. The hanging pub sign gives feature cards their shape and their gentle sway. And it is all typeset in the two faces that *are* British publishing — **Caslon** for mastheads and headings (the broadsheet, the Penguin cover, the printed proclamation) and **Gill Sans** for every piece of UI (Eric Gill's humanist sans, the BBC, the Church of England, the old railway). The result is ordered and impeccably well-mannered — still an 8px grid, still one working radius — but proudly, unmistakably British.

**Key Characteristics:**
- The **Union trichrome leads**: Union Blue chrome, Pillar-Box Red accents and alerts, White grounds — the national flag as a working palette, not a decoration.
- **Royal Gold** is the ceremonial fourth colour — crests, warrants, rosettes, and one exceptional "By Appointment" action per page. It is gilt, so it is rationed.
- Typeset in the **great British duo**: Caslon serif for mastheads/headings, Gill Sans humanist sans for all UI. Hierarchy and heritage in one move.
- **Signature devices** stand in for ornament: the roundel (status + bullets), bunting (celebratory dividers), the rosette (featured/won), stamp perforations (avatars/photos), and the hanging-sign card.
- **Warm neutrals** — Portland Stone and Chalk instead of cold grey — so the quiet chrome reads as aged stone, not office software.
- A **strict 8px grid** and one working 4px radius keep the whole thing ordered and tailored; the colour is bold but the geometry is disciplined.
- **Voice-led**: warm, polite, idiomatic British — "Right then", "Brilliant", "Just a tick", "Terribly sorry" — a first-class design token applied to every state.

## Colors

The palette is the **national flag plus a gilt frame and a green baize**. Read it in three layers: the Union trichrome that carries brand, structure and attention; the two heritage accents (gold for ceremony, green for approval); and the warm stone-and-parchment neutrals everything is printed on.

### The Union Trichrome
- **Union Blue** (`{colors.primary}` — #012169): The Pantone 280 of the actual Union Flag and the anchor of the system. Fills the navigation bar, primary buttons, the footer, focus-adjacent structure, table underrules, and heavy display accents. If something is *official* — an action, a commitment, the system speaking — it is Union Blue.
- **Admiralty** (`{colors.primary-pressed}` — #00133F): The hover/pressed deepening of Union Blue. Interactive state of primary surfaces only; never a resting fill.
- **Pillar-Box Red** (`{colors.red}` / `{colors.error}` — #C8102E): The flag's red, the telephone box, the post box. A genuine hero accent — roundel alerts, bunting, rosette tails, the focus ring, destructive actions, and error rules. Because red is both brand and danger here, it always means *look at this*: it is never spent on flat decoration where nothing is happening.
- **White** (`{colors.canvas}` / `{colors.on-primary}` — #FFFFFF): The flag's white; the default page and card ground, and the text/icon colour on every blue, green, and red surface.

### Heritage Accents
- **Royal Gold** (`{colors.gold}` — #C8A951): Heraldic gilt. Crest devices, royal-warrant mastheads, rosette centres, medallions, the top accent rule on nav/footer/modal, and the single ceremonial `button-royal` per page. Gold is precious, so it is rationed — a little reads as regal; a lot reads as tacky.
- **British Racing Green** (`{colors.secondary}` / `{colors.success}` — #004225): Quiet approval and success — roundel "good" bars, success banners' left rules, confirmation ticks, included-line ticks. Distinguished from blue by meaning *outcome* rather than *action*.

### Surface & Neutrals (warmed)
- **Parchment** (`{colors.accent}` — #FBF7EC): The hospitality surface — card callouts, pull-quotes, off-canvas menus, and empty-state frames. The warm cream of a well-read paperback.
- **Portland Stone** (`{colors.canvas-soft}` — #F4F1E4, derived): The gentlest recess — table headers, zebra rows, hover washes, sidebar wells. Warm off-white, like the stone of a civic building.
- **Chalk** (`{colors.mist}` / `{colors.hairline}` — #DED8C7, derived): The universal warm 1px stroke — dividers, borders, table rules — and the fill of disabled states.

### Text
- **Westminster Ink** (`{colors.ink}` — #14213D): Standard body text and dark UI elements. A near-black navy rather than pure black — softer, and quietly on-brand.
- **Slate** (`{colors.ink-soft}` — #45496B, derived): Secondary text — captions, helper copy, breadcrumb ancestors, table metadata.
- **Drizzle** (`{colors.ink-muted}` — #8A8B9E, derived): Placeholder text, timestamps, fine print. The quietest legible voice.
- **On-Gold Ink** (`{colors.on-gold}` — #14213D): Westminster Ink is the *only* text colour permitted on royal-gold fills; white on gold fails contrast and is forbidden.

### Semantic & Focus
- **Success** (`{colors.success}` — Racing Green): Confirmations, completed states, "Brilliant — all sorted."
- **Error / Destructive** (`{colors.error}` — Pillar-Box Red): Validation failures, destructive confirmation, critical alerts.
- **Focus** (`{colors.focus}` — Pillar-Box Red): Every focusable element receives a 2px pillar-box-red ring. Red is the loudest colour in the kit precisely so keyboard focus is never in doubt.

### Contrast Notes
Union Blue on white and white on Union Blue both clear WCAG AA comfortably at all sizes. Westminster Ink on Parchment passes AA for body text. Royal Gold is a *fill* colour carrying Westminster-Ink text only (never white, and never as small text on white). Pillar-Box Red carries white text on fills, or works as 4px rules and focus rings — it is not used for small red text on a white ground.

## Typography

### Font Families
The system speaks in the **two faces that define British print**, and never mixes in a third:

- **Libre Caslon** (mastheads, H1, H2) — an open-source cut of William Caslon's English serif, the letterform of proclamations, broadsheet mastheads, and Penguin covers. It gives headings the authority of the printed page. Fallback cascade: `"Libre Caslon Display"` / `"Libre Caslon Text"` → `Georgia` → `"Times New Roman"` → `serif`.
- **Gill Sans** (H3 and all UI — body, labels, buttons, tables, badges) — Eric Gill's humanist sans, the type of the BBC, the Church of England, Penguin's spines, and the old railway. It is the most British sans there is. Fallback cascade: `"Gill Sans"` → `"Gill Sans Nova"` → `"Gill Sans MT"` → `Frutiger` → a humanist `sans-serif`.

The pairing is the identity: a **Caslon masthead over Gill Sans copy** is instantly legible as British publishing. Do not substitute a geometric sans (Futura, Poppins) for Gill, and do not set headings in the sans — the serif/sans contrast is doing structural work.

### Hierarchy

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.masthead}` | Libre Caslon Display | 44px | 700 | 1.1 | 0 | Royal-warrant page mastheads, hero titles |
| `{typography.h1}` | Libre Caslon Display | 36px | 700 | 1.2 | 0 | Page titles |
| `{typography.h2}` | Libre Caslon Text | 28px | 700 | 1.3 | 0 | Section headings |
| `{typography.h3}` | Gill Sans | 20px | 600 | 1.4 | 0 | Card titles, panel headings |
| `{typography.body}` | Gill Sans | 16px | 400 | 1.6 | 0 | Standard reading copy |
| `{typography.body-medium}` | Gill Sans | 16px | 500 | 1.6 | 0 | Emphasized body, lead paragraphs |
| `{typography.label}` | Gill Sans | 14px | 600 | 1.2 | 0.04em | Form labels, nav links, table headers, tabs |
| `{typography.button}` | Gill Sans | 16px | 600 | 1 | 0.02em | Button text — sentence case |
| `{typography.overline}` | Gill Sans | 12px | 600 | 1.2 | 0.12em | "By appointment" eyebrows, kicker labels |
| `{typography.small}` | Gill Sans | 14px | 400 | 1.5 | 0 | Captions, helper text, footer links |
| `{typography.micro}` | Gill Sans | 12px | 400 | 1.4 | 0.02em | Badges, timestamps, fine print |

### Principles
- **Serif leads, sans serves.** Caslon carries every masthead and section head; Gill Sans carries everything you interact with. That single contrast supplies most of the hierarchy.
- **The overline is the one place letters space out.** `{typography.overline}` sets small, tracked, sentence-or-title-case eyebrows ("By appointment", "Departures") — a nod to signage. Everywhere else, tracking stays tight or natural.
- **Body breathes at 1.6.** Reading copy is unhurried, like a broadsheet column.
- **Never shout in a heading.** Caslon at 700 has all the gravity it needs; no ALL-CAPS masonry, no exclamation marks. Warmth comes from the *words*, not the case.

### Note on Font Substitutes
Libre Caslon is on Google Fonts (self-hostable). Gill Sans is a Monotype face present on most Apple systems; where it cannot be loaded, the humanist fallback cascade above holds the 8px grid. Do not swap Gill for a geometric sans, and do not swap Caslon for a slab or display face — the specific serif/humanist pairing *is* the brand.

## Layout

### Spacing System
- **Base unit**: 8px (`{spacing.xs}`) — the ordered baseline grid. All margins, paddings, and gaps are multiples of it.
- **Tokens**: `{spacing.xs}` 8px · `{spacing.sm}` 16px · `{spacing.md}` 24px · `{spacing.lg}` 32px · `{spacing.xl}` 48px · `{spacing.xxl}` 64px
- Cards carry **24px** interior padding (`{spacing.md}`); forms and modals use **32px** (`{spacing.lg}`). Sections are separated by 48–64px. The colour may be loud, but the spacing is orderly — nothing crowds.

### Grid & Container
- **Container**: max-width 1280px, centred, **24px** horizontal padding on mobile expanding to **48px** on desktop.
- **Columns**: a 12-column grid with 24px gutters. Common splits: full-width hero (often under a `crest-header`), 8/4 content-and-aside, 6/6 comparison, 4/4/4 card rows.
- **Nav**: a single 64px `{components.nav-bar}` Union-Blue slab topped by a 3px `{colors.gold}` rule — a roundel wordmark at left, sentence-case links centre/right, one action at the far right (a white ghost button, or the gold `button-royal` where the moment warrants it).
- **Page rhythm**: nav → optional breadcrumb → `crest-header` or H1 block → sectioned content separated by `{components.section-header}` rules (with the occasional `bunting-divider` on celebratory pages) → Union-Blue `{components.footer-bar}`.

### Whitespace Philosophy
Whitespace is **the civic square around the monuments**. The devices — roundels, crests, rosettes — are bold, so they are given room to be seen. Generous margins and hairline rules do the separating; the colour never has to fight for space because the space is calm around it.

### Responsive Strategy

#### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Single column; 24px gutters; nav collapses to a roundel disclosure toggle; cards stack full-width |
| Tablet | 640–1023px | Two-column layouts permitted; 32px gutters; asides drop below content |
| Desktop | ≥ 1024px | Full 12-column grid; 48px gutters; max container 1280px |

#### Touch Targets
All interactive elements maintain a **44×44px minimum** hit area. Buttons and inputs are 44px tall by token; checkboxes (20px), radios, and roundel controls receive invisible padding to reach the minimum.

#### Collapsing Strategy
On narrow viewports: the nav keeps its Union-Blue slab and gold top-rule and collapses links behind a roundel disclosure toggle (the off-canvas menu is `{colors.accent}` Parchment with a faint tartan well — the one theatrical moment permitted); card rows stack in source order; the 8/4 split becomes content-then-aside; tables scroll horizontally within a hairline well or reflow to stacked label/value rows; modals become full-width sheets with 24px margins, corners still 4px, gold top-rule intact.

#### Image Behavior
Imagery is framed, not bled: photographs sit inside `stamp-frame` perforated edges or plain 4px-cornered hairline frames, never full-bleed behind text. Avatars use the round stamp perforation (the sanctioned `{rounded.full}` use, alongside roundels and rosettes). Aspect ratios are fixed per slot (16:9 features, 1:1 avatars). No parallax, no drift — images sit still, like framed prints on a wall.

## Elevation & Depth

Depth is **framed prints and hanging signs**, not levitation. Shadows are shallow and tinted Union Blue rather than black; the 1px Chalk border is always the primary edge.

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No shadow; optional `{colors.hairline}` 1px rule | Page body, dividers, table rows, quiet panels |
| 1 — Card | `{elevation.border}` + `{elevation.card}` (0 4px 6px -1px rgba(1,33,105,0.12)) | Cards, toasts, form panels |
| 1.5 — Sign | `{elevation.sign}` (0 6px 10px -2px rgba(1,33,105,0.16)) | `card-sign` hanging feature cards — a touch more shadow to read as suspended |
| 2 — Overlay | `{elevation.border}` + `{elevation.overlay}` | Dropdowns, popovers, modals |

### Rules of Depth
- Every shadow is **Union-Blue-tinted** (`rgba(1, 33, 105, …)`) — never neutral black — so elevation stays in the family.
- No element floats without its 1px border; the stroke is the edge, the shadow the confirmation.
- Hover changes *colour* (`{colors.primary-pressed}` on buttons, `{colors.canvas-soft}` washes on rows), not elevation. The one motion exception: `card-sign` may sway 1–2° on hover, like a pub sign in a breeze, over 200ms ease.
- The modal scrim is `rgba(1, 33, 105, 0.45)` — a Union-Blue dusk, not a black void.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed slabs only — nav bar, footer, dividers, banners |
| `{rounded.standard}` | 4px | The working radius — buttons, cards, inputs, modals, badges, tabs |
| `{rounded.sign}` | 12px 12px 4px 4px | Hanging pub-sign cards only — rounded shoulders, square foot |
| `{rounded.full}` | 9999px | Roundels, rosettes, medallions, radio dots, avatars, the toggle track |

The signature is **disciplined geometry carrying bold colour**. One working 4px radius keeps buttons, cards, and inputs tailored and uniform; the circle is reserved for the devices that *are* circles (roundel, rosette, medallion, avatar) so it always reads as meaningful, never as a generic pill. The only sanctioned pill is the `toggle` track. No 50px stadium buttons — the moment a button goes pill-shaped, the kit stops being British and starts being a generic SaaS trial.

### Geometry Notes
- The **roundel** is a stroked ring with a solid horizontal bar — never a filled disc — so it stays unmistakably Transport-y.
- **Left accent rules** on quotes and alerts are 4px solid verticals; **top accent rules** on nav/footer/modal are 3px gold horizontals.
- **Checkboxes** are 4px-cornered squares; **radios** are circles. Focus rings trace the element's own geometry at a 2px offset in pillar-box red.

## Components

> Each spec covers Default plus documented interactive states. Variants live as separate `components:` entries in the frontmatter; hardcode the referenced hex values when generating code.

### Navigation

**`nav-bar`** — Primary top navigation
- A 64px `{colors.primary}` Union-Blue slab, sharp-cornered, topped by a 3px `{colors.gold}` rule like the gilt line above a shopfront. Carries the roundel `wordmark` at left and sentence-case `{typography.label}` links in white. One action sits far-right — a white ghost button, or the gold `button-royal` for a genuinely important call. Padding `{spacing.sm}`/`{spacing.md}`.

**`wordmark`** — Brand lockup
- A small Union-Jack `roundel` device followed by the product name in Caslon (`{typography.h3}`), white on the navy slab. The device is the app's mark; keep it to ~28px.

**`nav-link`** — Navigation item
- Transparent resting state, white text; the active page carries a 2px `{colors.gold}` underline — gilt marks "you are here." Hover applies a faint white wash (8%), never a colour change.

**`breadcrumb`** — Ancestry trail
- `{typography.small}` in `{colors.ink-soft}`, separated by `›` chevrons, current page in `{colors.ink}`. Sits beneath the nav with `{spacing.sm}` clearance.

**`tabs`** — In-page section switcher
- Sentence-case `{typography.label}` in `{colors.ink-soft}`; the active tab in `{colors.primary}` with a 2px `{colors.red}` underline (the pillar-box mark of the current view), resting on a full-width Chalk baseline. No boxed tab chrome.

### Buttons

**`button-primary`** — The official action
- `{colors.primary}` Union-Blue fill, white text, 4px corners, 44px tall. Hover deepens to `{colors.primary-pressed}` over 150ms ease. One per view where possible.

**`button-royal`** — The ceremonial action
- `{colors.gold}` Royal-Gold fill, `{colors.on-gold}` Westminster-Ink text, 1px darker-gold rule, same geometry. Reserved for the single most important "By Appointment" moment on a page (upgrade, publish, confirm the big thing). Never more than one per view — gilt loses its lustre in a crowd.

**`button-secondary`** — The measured alternative
- White fill, `{colors.primary}` text, 1px Union-Blue border. Hover washes to `{colors.canvas-soft}`. For "Cancel," "Go back," comparison actions.

**`button-destructive`** — The regrettable necessity
- `{colors.red}` Pillar-Box-Red fill, white text, same geometry. Paired with a confirmation modal whose copy is honest: "This can't be undone, I'm afraid."

**`button-quiet`** — The tertiary murmur
- Transparent, Union-Blue text, hover wash of `{colors.canvas-soft}`. For low-stakes inline actions.

**Disabled state (all buttons)** — `{colors.mist}` Chalk fill, `{colors.ink-muted}` text, no border, cursor not-allowed.

### Inputs & Forms

**`text-input`** — Standard text field
- White fill, `{colors.ink}` text, Drizzle placeholder, 4px corners, 1px Chalk stroke, 44px tall. Focus applies a 2px `{colors.red}` ring (`{components.text-input-focus}`); error swaps ring and border to red with `{components.helper-text}` explaining precisely what went wrong.

**`select-dropdown`** — Native select
- Same chassis as `text-input` with a modest Westminster-Ink chevron.

**`field-label`** — Form label
- `{typography.label}` in `{colors.ink}`, sitting **above** its input with `{spacing.xs}` clearance — never floating inside, never disappearing on focus. Required fields append a discreet "(required)" in Slate.

**`helper-text`** — Guidance & validation
- `{typography.small}` in Slate; switches to `{colors.error}` for validation. Copy is specific and courteous: "That doesn't look quite like an email address, sorry."

**`checkbox` / `radio-option`** — Choice controls
- Checkbox: 20px 4px-cornered square, checked fills `{colors.primary}` with a white tick. Radio: 20px circle, Union-Blue ring-and-dot when selected. `{typography.body}` labels, full-label hit areas.

**`toggle`** — On/off switch
- Chalk track when off, Union-Blue track with white thumb when on. The sole sanctioned pill; used only for binary settings.

### Cards & Panels

**`card`** — The standard panel
- White fill, 1px Chalk border, `{elevation.card}` shadow, 4px corners, `{spacing.md}` padding. Title in `{typography.h3}`, body in `{typography.body}`.

**`card-parchment`** — The hospitality panel
- Identical chrome on `{colors.accent}` Parchment. For callouts, "did you know" asides, pull-quotes, and the off-canvas menu — where the system offers a cup of tea rather than a form.

**`card-sign`** — The hanging feature card
- A `{rounded.sign}` card (rounded shoulders, square foot) with a 3px Union-Blue top rule and the deeper `{elevation.sign}` shadow, reading as a suspended pub sign. Hero tiles and feature callouts. May sway 1–2° on hover.

**`crest-header`** — Royal-warrant masthead
- A centred gold crest device (a small Union-Jack roundel within a gold wreath) above a `{typography.overline}` eyebrow ("By appointment") and a `{typography.masthead}` Caslon title, closed by a hairline rule. Opens important pages with ceremony.

**`quote-block`** — Attributed quotation
- Parchment fill, 4px Union-Blue left rule, `{typography.body}` italic copy, attribution in `{typography.small}` Slate.

**`section-header`** — Content section heading
- `{typography.h2}` Caslon over a full-width 1px Chalk bottom rule with `{spacing.sm}` clearance — the broadsheet section rule.

**`divider` / `bunting-divider`** — Section breaks
- `divider`: 1px Chalk with `{spacing.md}` margins, used sparingly. `bunting-divider`: a string of triangular Union-trichrome pennants for celebratory pages only — a dashboard win, an onboarding finish. Never more than once per page.

### Tables & Data

**`table-header`** — Column headings
- `{colors.canvas-soft}` Portland-Stone fill, `{typography.label}` sentence-case headings, a 2px `{colors.primary}` Union-Blue underrule (crisper and more "departures board" than a hairline).

**`table-row`** — Data row
- White fill, `{typography.small}` cells, 1px Chalk bottom rule, hover wash of Portland Stone. Numeric columns right-align; long tables zebra with Portland Stone. The table sits in a hairline-bordered 4px well.

**`badge-neutral` / `badge-success` / `badge-error`** — Status marks
- `{typography.micro}` sentence-case in a 4px chip: Chalk/ink for neutral, Racing-Green/white for success ("Sorted"), Pillar-Box-Red/white for failure ("Failed").

**`rosette`** — The prize mark
- A pleated Union-Blue (or Racing-Green) ring around a Royal-Gold medallion centre with two Pillar-Box-Red ribbon tails. Marks the featured tier, the winning option, the "best in show." Used once per comparison set.

**`roundel-status`** — Live status device
- The Transport roundel as a status pip: Racing-Green bar = operating/normal, Pillar-Box-Red bar = disruption/error, Drizzle bar = closed/inactive. Doubles as the list bullet throughout the kit.

### Feedback & Overlays

**`alert-error` / `alert-success`** — Inline banners
- White panels, 1px Chalk border, 4px corners, 4px semantic left rule (red or green). Copy leads with the fact, follows with the remedy: "Terribly sorry — that didn't save. Do give it another go in a moment."

**`alert-notice`** — Standing service message
- The "Mind the gap" strip: a Union-Blue banner with white text and a white roundel device at left, for persistent notices (maintenance, announcements). Calm, official, unmissable.

**`toast`** — Transient confirmation
- Card chrome sliding in bottom-right over 150ms ease (no bounce), self-dismissing after 5s with a quiet progress rule. For expected outcomes: "Brilliant — all sorted."

**`modal`** — Dialog
- A max-560px white panel, overlay elevation, 4px corners, 3px gold top-rule, `{spacing.lg}` padding, over the Union-Blue dusk scrim. Title in `{typography.h3}`, body in `{typography.body}`, actions right-aligned with the primary (or royal) button last. Destructive confirmations restate the consequence plainly.

**`dropdown-menu`** — Menu panel
- White, hairline-bordered, overlay-shadowed, `{spacing.xs}` padding; items in `{typography.body}` with Portland-Stone hover. Destructive items sit last, divided off, in `{colors.error}` text.

**`footer-bar`** — Page footer
- A `{colors.primary}` Union-Blue slab with a 3px `{colors.gold}` top-rule, `{spacing.xl}` padding, white `{typography.small}` link columns and a `{typography.micro}` copyright line. Closes the page as the nav opened it — official, gilt-edged, symmetrical.

### Examples (illustrative)

> Kit-mirror demonstration surfaces. Each `ex-*` entry references brand-native primitives so downstream consumers (`/preview-design`, `/generate-kit`) re-skin the same surfaces consistently.

**`ex-pricing-tier`** — Default pricing tier card. Re-uses card chrome on the white canvas surface.
- Properties: `backgroundColor`, `textColor`, `borderColor`, `rounded`, `padding`

**`ex-pricing-tier-featured`** — Featured tier — polarity-flipped Union-Blue surface with white text and a Royal-Gold `rosette` reading "Best in show." Understated geometry, loud only in colour: no scale-up, no glow.
- Properties: `backgroundColor`, `textColor`, `badgeBackground`, `badgeText`, `rounded`, `padding`

**`ex-product-selector`** — What's Included summary card. Racing-Green `roundel` ticks per included line.
- Properties: `backgroundColor`, `tickColor`, `rounded`, `padding`

**`ex-cart-drawer`** — Order summary — add-on line items divided by Chalk hairlines, closing on a Union-Blue `{typography.body-medium}` total row.
- Properties: `backgroundColor`, `rounded`, `padding`, `item-divider`, `totalColor`

**`ex-app-shell-row`** — Sidebar nav row. Active state uses a 3px Union-Blue left rule and a Portland-Stone fill; no filled pills.
- Properties: `backgroundColor`, `activeBackground`, `activeIndicator`, `rounded`, `padding`

**`ex-data-table-cell`** — Default data-table th + td chrome. Header uses the label voice on Portland Stone with a 2px Union-Blue underrule; body uses small.
- Properties: `headerBackground`, `headerTypography`, `bodyTypography`, `cellPadding`, `rowBorder`

**`ex-auth-form-card`** — Sign-in / sign-up card. Card chrome with text-input primitives, a roundel wordmark at the top, and a single Union-Blue primary button; the forgot-password link is a `{components.button-quiet}`.
- Properties: `backgroundColor`, `rounded`, `padding`

**`ex-modal-card`** — Modal dialog surface — card chrome with the overlay shadow and a 3px gold top-rule, over the Union-Blue scrim.
- Properties: `backgroundColor`, `boxShadow`, `rounded`, `padding`

**`ex-empty-state-card`** — Empty-state frame on Parchment with a faint Union-Jack watermark, captioned in the warm reserved voice ("Nothing here just yet, I'm afraid.") and one quiet secondary action.
- Properties: `backgroundColor`, `rounded`, `padding`, `captionTypography`

**`ex-toast`** — Toast notification surface — card shape + card shadow, arriving and departing at 150ms ease with no bounce.
- Properties: `backgroundColor`, `boxShadow`, `rounded`, `padding`, `typography`

## Voice & Microcopy

The written register is a design token in its own right: **warm, polite, and idiomatically British** — the tone of a friendly shopkeeper who knows their trade. It is more colloquial than a stiff institution, but never rude, never shouty, and never American tech-speak.

| Moment | Register | Example |
|---|---|---|
| Empty state | Warm understatement | "Nothing here just yet, I'm afraid." |
| Success | Genuine but modest | "Brilliant — all sorted." / "Spot on, that's saved." |
| Error | Apologetic, takes the blame | "Terribly sorry, something's gone awry. Do try again in a tick." |
| Destructive confirm | Plain and kind | "Are you quite sure? This can't be undone, I'm afraid." |
| Loading | Patient and cheery | "Just a tick…" / "Half a mo…" |
| Placeholder | Friendly instruction | "Pop your email in here." |
| Greeting / CTA | Inviting | "Right then — shall we?" / "Off we go." |
| Farewell / done | Warm sign-off | "Mind how you go." |

### Principles
- **Be warm, not corporate.** "Brilliant," "Spot on," "Just a tick," "Right then," "Do give it a go" — the everyday British idiom, used lightly. A little goes a long way; every third word needn't be slang.
- **Apologise sincerely, once.** Errors take the blame ("Terribly sorry"), say what happened, offer the remedy, then stop.
- **Sentence case everywhere.** Buttons, labels, headings, badges — sentence case without exception.
- **No tech-bro idiom, no shouting.** Nothing is "awesome," nobody "crushes it," and there are no exclamation-mark pile-ups. Enthusiasm shows through reliability and a well-placed "Brilliant."

## Do's and Don'ts

### Do
- **Lead with the Union trichrome**: Union-Blue chrome, Pillar-Box-Red accents/alerts/focus, White grounds. The flag is the palette.
- **Ration Royal Gold to ceremony** — crests, warrants, rosettes, and one `button-royal` per page. Gilt is precious.
- Pair **Caslon mastheads with Gill Sans UI** — the serif/sans contrast is the brand; don't set headings in the sans.
- Use the **signature devices for meaning**: roundel = status/bullets, rosette = featured/won, bunting = celebration, stamp = photos/avatars, hanging sign = feature cards.
- Keep **warm neutrals** (Portland Stone, Chalk) — never cold office grey.
- **Reference these tokens and hardcode the exact hex values** (`#012169`, not `theme.primary`; `4px`, not `rounded-md`).
- Give every focusable element the **2px Pillar-Box-Red focus ring** and every interactive element a 44px minimum hit area.
- Write every state in the **warm British voice** ("Brilliant — all sorted," "Nothing here just yet, I'm afraid").

### Don't
- Don't let the palette go **muted-generic** — if it could pass for a Scandinavian bank, it has failed. Show the colours.
- Don't **overspend the gold** — more than one gold action, or gold as a background wash, reads as tacky, not regal. And never white text on gold.
- Don't use **pill/stadium buttons**; corners are exactly 4px. `{rounded.full}` is for roundels, rosettes, medallions, radios, avatars, and the toggle track only.
- Don't **stretch, tilt, or fade the Union Jack** behind body text, and don't fill discs where a stroked roundel is meant — keep the devices recognisable.
- Don't **shout** — no ALL-CAPS UI text, no exclamation-mark microcopy, no Americanised "Oops!".
- Don't introduce **floating glows, borderless cards, or springy motion** — depth is framed prints and hanging signs; transitions are 150ms ease (the sign-sway is the sole 200ms exception).
- Don't **mix in a third typeface** or set headings in Gill Sans; hierarchy is Caslon-over-Gill within the documented scale.

## Agent Instructions for Claude

When generating React components or HTML/CSS for this project, you must:

1. **Reference these design tokens before writing any UI logic.** Frontmatter tokens are the single source of truth for colour, type, spacing, radius, patterns, and elevation.
2. **Hardcode the exact hex values provided** — `#012169` Union Blue, `#C8102E` Pillar-Box Red, `#C8A951` Royal Gold, `#004225` Racing Green, `#FBF7EC` Parchment — rather than guessing variables, and use `4px`, not `rounded-md`.
3. **Make the Britishness visible, not just described.** Reach for the Union trichrome, the Caslon+Gill Sans pairing, and at least one signature device (roundel, bunting, rosette, stamp frame, hanging-sign card, or crest header) on any substantial surface. A screen with none of these has missed the brief.
4. **Ration Royal Gold** to crests, warrants, rosettes, top-accent rules, and a single `button-royal` per view — always with `{colors.on-gold}` ink, never white.
5. **Apply the warm, polite British voice** to every empty state, success, error, and placeholder ("Brilliant — all sorted," "Terribly sorry, something's gone awry," "Just a tick…," "Pop your email in here").
6. **Enforce the geometry mechanically**: 4px corners on buttons/cards/inputs, `{rounded.full}` reserved for roundels/rosettes/avatars/radios/toggle track, 1px `#DED8C7` Chalk borders, Union-Blue-tinted shadows, 8px-multiple spacing, 44px minimum interactive heights, and the 2px `#C8102E` focus ring on every focusable element.
7. **Refuse the forbidden vocabulary**: no pill/stadium buttons, no muted-generic palette, no gradients or Apple-style glows, no white-on-gold, no ALL-CAPS UI text, no third typeface, no springy motion (bar the single hanging-sign sway).
