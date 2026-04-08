# Adhira's Moves

A React Native / Expo app for tracking baby exercises and milestones.

## Visual Assets

### App Icons
- **icon.png** (1024x1024) — Main app icon with baby silhouette on coral/sage background
- **adaptive-icon.png** (1024x1024) — Android adaptive icon with masked design

### Splash Screen
- **splash.png** (1284x2778) — Warm cream background with app logo and tagline

### Exercise Illustrations (`src/assets/exercises/`)
Friendly 400x400px PNG illustrations for each exercise (6 available, SVG sources included):
- `bicycle-legs.png` — Baby on back, legs cycling motion (gas relief)
- `tummy-time.png` — Baby on tummy, head up
- `iloveu-massage.png` — Hands doing I-Love-U massage pattern on baby belly
- `knees-to-chest.png` — Baby on back, knees brought to chest
- `chest-to-chest.png` — Parent holding baby chest-to-chest
- `side-lying.png` — Baby on side for play

### Milestone Badges (`src/assets/badges/`)
Achievement-style 120x120px badges for milestone tracking:
- `milestone-2mo.png` — 2 Months badge (soft pink)
- `milestone-4mo.png` — 4 Months badge (soft yellow)
- `milestone-6mo.png` — 6 Months badge (soft green)
- `milestone-9mo.png` — 9 Months badge (soft blue)
- `milestone-12mo.png` — 12 Months badge (soft purple)
- `milestone-complete.png` — Checkmark/celebration badge

### Category Icons (`src/assets/categories/`)
120x120px icons for exercise categories:
- `gas-relief.png` — Wind/gas icon
- `tummy-time.png` — Baby on tummy icon
- `strength.png` — Baby arm/strength icon
- `coordination.png` — Baby reaching/grasping
- `stretch.png` — Baby stretching
- `crawling.png` — Baby crawling motion

### Design System
- **Colors**: Coral (#E8A87C), Sage (#85C1A5), Cream (#FDF8F3)
- **Style**: Simple, friendly, minimal line art
- **Format**: PNG with transparency, SVG source files included
- **Inclusive**: Diverse baby representations where applicable

## Features

- 🏃 **16 Developmental Exercises** — Gas relief, tummy time, stretches, coordination, crawling prep, walking prep
- ⚡ **Quick Routines** — Auto-advancing timer routines (Morning Wake-Up, Tummy Time, Bedtime Wind-Down, etc.)
- 📊 **CDC Milestone Tracker** — Track developmental milestones by age (2/4/6/9/12 months)
- 👶 **Baby Profile** — Set your baby's name and birth date to filter age-appropriate exercises
- 💾 **Offline Storage** — All data saved locally on your device

## Tech Stack

- Expo SDK 54
- React Native 0.81.5
- React Navigation (Bottom Tabs + Native Stack)
- AsyncStorage for local data persistence

## Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone.

## Building Native Apps

This app uses **EAS (Expo Application Services)** to build standalone APK and iOS apps.

### Prerequisites

1. Create a free Expo account: https://expo.dev/signup
2. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
3. Log in:
   ```bash
   eas login
   ```

### Build Android APK (Sideload)

```bash
# Build APK for direct install
eas build --platform android --profile preview
```

- Downloads a `.apk` file you can install directly on Android
- Share via WhatsApp, email, or download link
- No Play Store required

### Build iOS (TestFlight)

**Requires Apple Developer account ($99/year)**

```bash
# Build for TestFlight distribution
eas build --platform ios
```

- Uploads to App Store Connect
- Distribute via TestFlight to your devices
- Or publish to App Store

### Build for App Stores

```bash
# Production builds for both platforms
eas build --platform all --profile production
```

## Project Structure

```
├── App.jsx                 # Main app entry
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.jsx      # Dashboard with quick routines
│   │   ├── ExerciseListScreen.jsx  # Browse exercises
│   │   ├── ExerciseDetailScreen.jsx
│   │   ├── RoutinePlayerScreen.jsx   # Timer with auto-advance
│   │   ├── MilestonesScreen.jsx
│   │   └── SettingsScreen.jsx      # Baby profile editor
│   ├── components/        # Reusable components
│   ├── context/
│   │   └── AppContext.jsx   # Baby profile, favorites, completed
│   ├── data/
│   │   ├── exercises.js     # Exercise database
│   │   ├── milestones.js    # CDC milestones
│   │   └── routines.js      # Quick routine definitions
│   └── theme/
│       └── index.js         # Colors, spacing, typography
├── assets/                # Icons, splash screen, images
├── app.json               # Expo configuration
└── eas.json               # EAS build configuration
```

## Baby Profile

Set your baby's name and birth date in **Settings** to:
- See your baby's current age (e.g., "3 weeks old")
- Auto-filter exercises by age-appropriateness
- Track milestones for your baby's specific age group

## Customization

Edit `src/theme/index.js` to change colors, spacing, or typography.

## License

Private — for personal use.