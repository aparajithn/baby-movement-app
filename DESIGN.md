# Baby Movement App - UI/UX Design

## App Name: "Adhira's Moves" (or "Tiny Moves")

## Design Philosophy
- **Mobile-first**: Parents use this one-handed while holding baby
- **Calm & warm**: Soft colors, no harsh contrasts
- **Quick access**: Exercises load fast, instructions are scannable
- **Trustworthy**: Clear safety notes, CDC milestone validation

## Color Palette

```css
--primary: #E8A87C;        /* Soft coral/orange - warmth */
--primary-dark: #D4956A;   /* Darker coral for active states */
--secondary: #85C1A5;      /* Sage green - calming */
--background: #FDF8F3;     /* Warm cream */
--surface: #FFFFFF;        /* Cards */
--text-primary: #3D3D3D;   /* Soft black */
--text-secondary: #6B6B6B; /* Gray */
--accent: #C4A77D;         /* Warm sand */
--danger: #E07A7A;         /* Soft red for warnings */
--success: #7BC17B;        /* Soft green */
```

## Typography
- **Headings**: System font bold, 24-32px
- **Body**: System font regular, 16px
- **Small**: 14px for durations, tips
- **Line height**: 1.5 for readability

## Screen Structure

### 1. Home Screen

```
┌─────────────────────────────┐
│  [Baby Icon]  Good morning  │
│  Adhira is 3 weeks old      │
├─────────────────────────────┤
│  QUICK ROUTINES             │
│  ┌────────┐ ┌────────┐     │
│  │ 💨 Gas │ │ 🍼     │     │
│  │ Relief │ │ Tummy  │     │
│  └────────┘ └────────┘     │
│  ┌────────┐ ┌────────┐     │
│  │ ☀️     │ │ 🌙     │     │
│  │ Morning│ │Bedtime │     │
│  └────────┘ └────────┘     │
├─────────────────────────────┤
│  EXPLORE BY AGE             │
│  [0-2mo] [2-4mo] [4-6mo]   │
│  [6-8mo] [8-10mo][10-12mo]  │
│              [12mo+]        │
├─────────────────────────────┤
│  📊 MILESTONES              │
│  2mo ▓▓░░░░░░ 25%          │
│  Tap to track progress →    │
└─────────────────────────────┘
```

**Navigation**: Bottom tab bar (Home, Exercises, Milestones, Settings)

### 2. Age-Based Exercise List

```
┌─────────────────────────────┐
│ ← 0-2 Months (Newborn)      │
├─────────────────────────────┤
│ FILTERS: [All] [Gas] [Core] │
├─────────────────────────────┤
│ ┌─────────────────────────┐│
│ │ 💨 Bicycle Legs         ││
│ │ Move trapped air        ││
│ │ ⏱️ 1 min  •  ↗ Easy     ││
│ └─────────────────────────┘│
│ ┌─────────────────────────┐│
│ │ 🤲 I Love U Massage     ││
│ │ Tummy massage for gas   ││
│ │ ⏱️ 3 min  •  ↗ Easy     ││
│ └─────────────────────────┘│
│ ┌─────────────────────────┐│
│ │ 💪 Chest-to-Chest        ││
│ │ Gentle neck strengthening││
│ │ ⏱️ 5 min  •  ↗ Easy     ││
│ └─────────────────────────┘│
│ ...                         │
└─────────────────────────────┘
```

### 3. Exercise Detail Screen

```
┌─────────────────────────────┐
│ ← Bicycle Legs      [♡]     │
├─────────────────────────────┤
│  [Animation/Image Placeholder]│
│  Baby on back, legs cycling  │
├─────────────────────────────┤
│  BEST FOR: Gas relief        │
│  AGE: 0+ months              │
│  DURATION: 1-3 minutes       │
│  DIFFICULTY: Easy ↗          │
├─────────────────────────────┤
│  HOW TO DO IT               │
│  1. Lay baby on back on      │
│     firm surface             │
│  2. Hold legs at calves      │
│  3. Slowly cycle one leg     │
│     toward belly while       │
│     extending the other      │
│  4. Alternate for 30-60s     │
├─────────────────────────────┤
│  💡 TIPS                     │
│  • Best 20-30 min after feed │
│  • Watch for cues of relief  │
├─────────────────────────────┤
│  ⚠️ SAFETY                   │
│  • Stop if baby fusses       │
│  • Support head always       │
├─────────────────────────────┤
│  [START TIMER] [MARK DONE]  │
└─────────────────────────────┘
```

### 4. Quick Routine Screen (Gas Relief Example)

```
┌─────────────────────────────┐
│ ← Gas Relief Routine         │
│    4 exercises • ~10 min    │
├─────────────────────────────┤
│  1. Bicycle Legs            │
│     ⏱️ 1 min  [Start ▶]     │
│                              │
│  2. I Love U Massage        │
│     ⏱️ 3 min  [Start ▶]     │
│                              │
│  3. Knees to Chest          │
│     ⏱️ 2 min  [Start ▶]     │
│                              │
│  4. Tummy Time              │
│     ⏱️ 2 min  [Start ▶]     │
│                              │
├─────────────────────────────┤
│  [START FULL ROUTINE]       │
│  Auto-advances with timer   │
└─────────────────────────────┘
```

### 5. Milestone Tracker

```
┌─────────────────────────────┐
│  Adhira's Milestones        │
│  Born: March 14, 2026       │
├─────────────────────────────┤
│  📍 2 MONTHS (Apr 14)       │
│  ▓▓▓▓▓▓▓░░░ 70%            │
│                              │
│  ☑ Holds head up on tummy   │
│  ☑ Opens hands briefly      │
│  ☐ Moves arms and legs      │
│  ☐ Turns head to sounds     │
├─────────────────────────────┤
│  📍 4 MONTHS (Jul 14)       │
│  ░░░░░░░░░░░ 0%             │
│  [View milestones] →        │
├─────────────────────────────┤
│  📍 6 MONTHS (Sep 14)       │
│  [Locked until Jul 14]      │
├─────────────────────────────┤
│  ℹ️ Based on CDC guidelines  │
└─────────────────────────────┘
```

## Component Library

### Button Variants
- **Primary**: Coral background, white text, rounded (8px radius)
- **Secondary**: White background, coral border, coral text
- **Ghost**: No background, text only with icon
- **Floating Action**: Circular, coral, shadow

### Card Component
- White background
- 12px border radius
- Subtle shadow (0 2px 8px rgba(0,0,0,0.08))
- 16px padding
- Pressable with ripple effect

### Age Badge
- Small capsule shape
- Color-coded by age group:
  - 0-2mo: Soft pink
  - 2-4mo: Soft yellow
  - 4-6mo: Soft green
  - 6-12mo: Soft blue

### Timer Component
- Circular progress indicator
- Large time display (48px)
- Start/Pause button centered
- Auto-advance to next exercise

## Navigation Structure

```
Bottom Tab Navigator:
├── Home (🏠)
│   └── Age selector → Exercise list
│   └── Quick routines
│
├── Exercises (📋)
│   └── Filter by category
│   └── Search
│   └── Favorites
│
├── Milestones (📊)
│   └── Progress by age
│   └── CDC reference
│
└── Settings (⚙️)
    └── Baby profile
    └── Notifications
    └── About
```

## Data Structure

### Exercise Object
```typescript
interface Exercise {
  id: string;
  name: string;
  category: 'gas' | 'core' | 'strength' | 'coordination' | 'stretch';
  ageRange: [number, number]; // months
  duration: string; // "1-3 min"
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  steps: string[];
  benefits: string[];
  safety: string[];
  tips: string[];
  imageUrl?: string;
  isFavorite: boolean;
}
```

### Routine Object
```typescript
interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: RoutineExercise[];
  totalDuration: string;
  ageRange: [number, number];
}

interface RoutineExercise {
  exerciseId: string;
  durationSeconds: number;
  order: number;
}
```

## Assets Needed

### Icons (suggested library: Lucide or Phosphor)
- 💨 Wind/Gas relief
- 💪 Strength/Core
- 🤲 Hands
- ☀️ Sun (morning)
- 🌙 Moon (bedtime)
- 🍼 Baby
- ⏱️ Timer
- ⚠️ Warning
- ✅ Check
- ▶️ Play
- ⏸️ Pause
- ♡ Heart (favorite)
- 🏠 Home
- 📋 List
- 📊 Chart
- ⚙️ Settings

### Illustrations
- Baby in various exercise positions
- Parent demonstrating exercises
- Progress/milestone celebration

### Optional
- Short video clips for each exercise
- Animation for timer/countdown

## Tech Notes

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (bottom tabs + stack)
- **State**: React Context or Zustand
- **Storage**: AsyncStorage for favorites/completed
- **Animations**: React Native Animated API

---

*Design complete. Ready for development phase.*
