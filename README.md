# Time Off Optimizer

A visual, interactive time-off planning tool designed for employees on a **9/80 work schedule**. Plan your time off strategically to maximize long weekends, avoid losing accrued hours, and track multiple types of leave throughout the year.

**[Live Demo](https://pt-onia.github.io)**

---

## Features

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
- **8 theme options** - 4 light and 4 dark themes to choose from
- **Fully mobile responsive** - works on phones and tablets

### Multiple Time-Off Types
Track four different types of leave, each with their own color and rules:

| Type | Accrual | Rollover | Notes |
|------|---------|----------|-------|
| **PTO/Vacation** | Per paycheck (based on years of service) | Up to max cap | 9 hrs Mon-Thu, 8 hrs Friday |
| **Activism** | 18 hrs/year (flat) | None - use it or lose it | For volunteer/charitable activities |
| **Personal Days** | 5 days/year | N/A | Counts as 1 full day regardless of day of week |
| **Wellness/Sick** | 2.76 hrs/paycheck | Max 108 hrs | Can accrue over 108 during year, but excess is lost at year-end |

### Smart Optimization Suggestions

#### Mega Combos
The ultimate time-off hack! When a Monday holiday aligns with a 9/80 Friday:
- Take the **Friday before** off
- Take **Tue-Wed-Thu** off (the Super Combo)
- Take the **Monday after** off
- **Result**: Up to 16 consecutive days off!

#### Super Combos
When a Monday holiday falls in the same week as your 9/80 Friday:
- Monday = Holiday (free)
- Tuesday, Wednesday, Thursday = PTO (27 hrs)
- Friday = 9/80 day off (free)
- **Result**: 9 consecutive days off for 27 hours of PTO!

#### 4-Day Weekends
Take the Monday after a 9/80 Friday off for an extended weekend (9 hrs PTO).

#### Friday Packages
- **Every Friday Off** - Take all working Fridays off for the year
- **Summer Fridays** - All Fridays May through August
- **2 for 5 Fridays** - Months where taking 2 Fridays gives you all 5 Fridays off
- **3 for 5 Fridays** - Months where taking 3 Fridays gives you all 5 Fridays off

### Balance Projections
- **PTO Bar Chart** - Visual projection of your PTO balance throughout the year
- **Wellness Bar Chart** - Track wellness hours and see if you'll exceed the rollover limit
- **Data Tables** - See exact balances at each pay period for all time-off types
- **Work Days Off Counter** - Shows how many actual work days you're taking off (separate from total including weekends)
- **Year-End Goal Tracking** - Set a target balance and get feedback on whether you're on track

### Years of Service Presets
Automatically sets your PTO accrual rate and max cap based on tenure:

| Years of Service | PTO per Paycheck | Max Cap |
|------------------|------------------|---------|
| 0-3 years | 3.07 hrs | 120 hrs |
| 4-6 years | 4.61 hrs | 180 hrs |
| 7-9 years | 6.15 hrs | 240 hrs |
| 10+ years | 7.69 hrs | 300 hrs |
| Custom | User-defined | User-defined |

---

## How to Use

### 1. Configure Your Settings

**In the sidebar, set up your profile:**

1. **Year** - Select the calendar year you're planning
2. **Years of Service** - Choose your tenure bracket to auto-fill PTO rates, or select "Custom" to enter your own values
3. **First Paycheck of Year** - Enter the first paycheck date (used to calculate all pay periods)
4. **First 9/80 Friday of Year** - Enter the first 9/80 Friday off
5. **End-of-Year PTO Goal** (optional) - Set a target balance if you want to roll over hours

### 2. Enter Your Current Balances

**Under "Current Balances":**

- **PTO Current Balance** - How many PTO hours you have right now
- **Activism Current Balance** - Remaining activism hours
- **Personal Days** - Select how many personal days you have (0-5)
- **Wellness Current Balance** - Your current wellness/sick hour balance

### 3. Select Your Holidays

**Expand "Your Holidays" to customize:**

Check/uncheck holidays based on what your company observes. Common options:
- New Year's Day, MLK Day, Presidents Day, Memorial Day
- Juneteenth, Independence Day, Labor Day
- Columbus Day (often not observed)
- Veterans Day (often not observed)
- Thanksgiving
- Christmas Eve + Christmas Day

### 4. Plan Your Time Off

**Three ways to add time off:**

1. **Click the Calendar** - Select a time-off type (PTO, Activism, Personal, Wellness) then click any workday
2. **Use Quick Select** - Click buttons for combos, Friday packages, or month-specific deals
3. **Click Opportunities** - In the sidebar, click specific opportunities to toggle them

### 5. Review Your Plan

**Monitor your balances in real-time:**

- **Projected Year-End Balances** - See where each balance will be at year-end
- **Work Days Off** - Number of actual work days off (PTO, wellness, activism, personal, 9/80)
- **Total Days Off** - Including weekends and holidays
- **Balance Projection Charts** - Visual bar charts for PTO and Wellness
- **Warnings** - Yellow/red indicators when approaching limits

---

## Understanding the 9/80 Schedule

A 9/80 schedule means:
- **Monday - Thursday**: 9-hour workdays
- **Friday**: Either 8-hour workday OR day off (alternating)
- Every other Friday is off (your "9/80 Friday")

This affects PTO calculations:
- Taking Monday-Thursday off = **9 hours** PTO
- Taking a working Friday off = **8 hours** PTO (better value!)
- Personal days count as **1 day** regardless of which day

---

## Optimization Strategies

### Mega Combos - Maximum Time Off
For the absolute maximum consecutive days off:
1. Find a week where a Monday holiday aligns with your 9/80 Friday
2. Take the Friday before (if it's a working Friday)
3. Take Tuesday, Wednesday, Thursday
4. Take the Monday after

**Example**: Presidents Day week could give you up to 16 days off!

### Super Combos - Best Value
When a Monday holiday falls in the same week as your 9/80 Friday:
- 27 hours of PTO = 9 consecutive days off
- Look for these around MLK Day, Presidents Day, Memorial Day, Labor Day

### 2 for 5 and 3 for 5 Fridays
In months with 5 Fridays, depending on how your 9/80 schedule aligns:
- **2 for 5**: Take just 2 Fridays off to have every Friday in the month off
- **3 for 5**: Take 3 Fridays off to have every Friday in the month off

The tool automatically calculates which months qualify based on your 9/80 schedule!

### Avoid Losing Hours
- Watch the **PTO projection chart** for when you approach your max cap
- If bars turn yellow/red, you need to use more PTO
- Set an **End-of-Year Goal** to track against a specific target
- **Wellness hours** over 108 will be lost at year-end

---

## Themes

The application includes 8 color themes to suit your preference:

**Light Themes:**
- **Default** - Clean and modern
- **Minimal** - Muted, earthy tones
- **Coastal** - Ocean-inspired blues and teals
- **Bold** - Vibrant, high-contrast colors

**Dark Themes:**
- **Default** - Standard dark mode
- **Minimal** - Warm, subdued earth tones
- **Coastal** - Deep ocean night colors
- **Bold** - Neon-inspired vibrant accents

Your theme preference is saved in your browser.

---

## Technical Details

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on all screen sizes
- Touch-friendly for mobile devices

### Data Storage
- All data is stored locally in your browser session
- Theme preference is saved to localStorage
- No server, no accounts, no data collection
- Refresh the page to reset selections (theme preference persists)

### Calculations
- PTO accrues each paycheck (every 2 weeks)
- PTO is capped at your max when accruing (won't exceed cap)
- Wellness accrues each paycheck but can exceed 108 during the year
- Wellness over 108 at year-end is lost
- Activism doesn't accrue - you get 18 hrs at start of year
- Personal days are counted as whole days (not hours)

---

## Deployment

This is a single HTML file with no dependencies. To deploy:

### GitHub Pages
1. Push the `index.html` file to your repository
2. Go to Settings > Pages
3. Select your branch (usually `main`)
4. Your site will be live at `https://[username].github.io/[repo-name]`

### Local Use
Simply open `index.html` in any web browser.

---

## Customization

The tool is designed for a specific company's policies. To customize for your organization:

### Modify PTO Tiers
Find the `SERVICE_PRESETS` object in the JavaScript:
```javascript
const SERVICE_PRESETS = {
    '0-3': { ptoPerPaycheck: 3.07, maxPto: 120 },
    '4-6': { ptoPerPaycheck: 4.61, maxPto: 180 },
    '7-9': { ptoPerPaycheck: 6.15, maxPto: 240 },
    '10+': { ptoPerPaycheck: 7.69, maxPto: 300 }
};
```

### Modify Holidays
Find the `ALL_HOLIDAYS` array to add/remove holidays:
```javascript
const ALL_HOLIDAYS = [
    { id: 'newyear', name: "New Year's Day", default: true },
    // ... add your own
];
```

### Modify Fixed Values
Search for these constants in the code:
- Wellness per paycheck: `2.76`
- Wellness max rollover: `108`
- Activism yearly allowance: `18`
- Personal days max: `5`

---

## Contributing

Feel free to fork this repository and customize for your organization's policies. Pull requests welcome for:
- Bug fixes
- Accessibility improvements
- Additional optimization suggestions
- Mobile responsiveness improvements

---

## License

MIT License - Feel free to use, modify, and distribute.

---

## Acknowledgments

Built to help employees maximize their time off while staying within policy limits. Because everyone deserves to make the most of their PTO!
