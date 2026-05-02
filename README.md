# FishyTodo

A task manager where every task becomes a swimming fish. Add tasks, watch them swim around your tank, click a fish to complete it, and watch it float away.

**Live demo → [patriciamoraru.github.io/FishyTodo](https://patriciamoraru.github.io/FishyTodo/)**

---

## Screenshots

![FishyTodo tank view](docs/fishytodo.gif)

---

## Features

### Landing Page
- Welcoming intro screen with animated title and decorative fish
- "Let's swim →" CTA navigates to the main tank
- Soft wave decoration and warm radial gradient background

### Fish Tank
- Every active task spawns as a swimming fish in a full-screen animated tank
- Fish species and swim speed reflect task priority — tiny tasks glide slowly, whale tasks charge across the screen
- Click any fish to pause it and open the task modal
- Complete a task → fish floats up and disappears with an animation
- Live fish count in the bottom-right corner

### Priority System
Five priority levels, each with a distinct fish sprite:

| Priority | Fish | Est. time | Speed |
|----------|------|-----------|-------|
| Tiny | Clownfish | 5 min | Slow |
| Small | Small fish | 15 min | Easy |
| Medium | Blue tang | 30 min | Steady |
| Big | Large fish | 1 hour | Fast |
| Whale | Whale fish | All day | Charging |

### Task Modal
- Shows task name, priority badge, and fish image
- **Mark as done** — removes fish with a float-up animation
- **Release back** — returns fish to the tank
- Keyboard shortcuts: `Enter` to complete, `Escape` to release

### Mood Reef
- Daily emotional check-in with 5 mood options: Great, Good, Okay, Meh, Rough
- Each mood uses a weather-themed Lucide icon and a distinct colour
- 7-day weekly strip (Mon–Sun) showing mood markers for each day
- Tap any past day to revisit and update its mood
- Future days are disabled — you can only log what has happened
- All mood data persisted to `localStorage` keyed by date (`YYYY-MM-DD`)

### Settings Panel
- **Dark mode** — switches to a deep-sea environment with purple tones
- **Sound** — subtle splash, bubble pop, and completion chime (Web Audio API, no files)
- **Focus mode** — dims and freezes all fish except the selected one
- **Tank colour** — 5 palette presets (Sunset, Classic, Ocean, Sea Glass, Botanical)
- **View as** — switch between animated tank and a plain sorted list

### List View Fallback
- Tasks rendered as a sorted list (most urgent first)
- Shows fish image, task name, priority badge, complete and remove buttons

### Persistence
- All tasks saved to `localStorage` under key `ITEMS`
- All mood entries saved to `localStorage` under key `MOODS`
- All settings (theme, sound, focus mode, palette, view mode) persisted across sessions

---

## User Flows

**Adding a task**
1. Type a task name in the input bar at the top of the tank
2. Pick a priority from the fish dropdown
3. Click **Release fish** or press `Enter` — a new fish splashes into the tank

**Completing a task**
1. Click any swimming fish to pause it
2. In the modal, click **Mark as done** (or press `Enter`)
3. The fish floats upward and disappears

**Logging a mood**
1. Click **Mood Reef** in the navbar
2. Select one of the 5 mood options for today
3. View the weekly strip to see your mood history
4. Tap any past day to update its mood

**Switching themes / settings**
1. Click **Settings** in the navbar
2. Toggle dark mode, sound, focus mode, or pick a colour palette
3. Changes apply instantly and persist on next visit

---

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | React 19 |
| Routing | React Router v7 |
| Build tool | Vite |
| Icons | Lucide React |
| Animations | CSS `@keyframes` + `requestAnimationFrame` |
| Audio | Web Audio API |
| Styling | CSS custom properties (no CSS framework) |
| State | Context API + `localStorage` |
| Deployment | GitHub Pages via `gh-pages` |

---

## Running Locally

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/patriciamoraru/FishyTodo.git
cd FishyTodo

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## Project Structure

```
src/
├── assets/          # Fish sprite images (fish1–fish7.png)
├── components/
│   ├── Fish.jsx           # Animated fish component (requestAnimationFrame)
│   ├── FishLegend.jsx     # Priority guide card
│   ├── LandingView.jsx    # Welcome/intro landing page
│   ├── ListView.jsx       # List-view fallback
│   ├── MoodReefView.jsx   # Mood tracker page
│   ├── Navbar.jsx         # Navigation + theme toggle
│   ├── PriorityPicker.jsx # Custom priority dropdown
│   ├── SettingsView.jsx   # Settings panel
│   ├── TankBar.jsx        # Task input bar
│   ├── TankView.jsx       # Main fish tank view
│   └── TaskModal.jsx      # Task detail modal
├── context/
│   ├── MoodContext.jsx  # Mood state + localStorage
│   ├── TaskContext.jsx  # Task state + localStorage
│   └── ThemeContext.jsx # Theme, palette, focus, sound state
└── utils/
    ├── fishImages.js    # Priority → fish image/speed mapping
    ├── palettes.js      # Colour palette definitions
    └── useSounds.js     # Web Audio API sound effects hook
```
