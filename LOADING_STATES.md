# Loading States Implementation

Complete loading experience added across the EXO Energy Management System.

## Components Created

### 1. **Spinner** (`/src/app/components/Spinner.tsx`)
A themed loading spinner with glow effects that adapt to light/dark modes.

**Sizes:**
- `small` - 16px (4×4)
- `medium` - 32px (8×8) - default
- `large` - 48px (12×12)

**Features:**
- Primary color with glow effect
- Theme-aware shadows
- Accessible with screen reader text
- Smooth animation

---

### 2. **InitialLoader** (`/src/app/components/InitialLoader.tsx`)
Full-screen loading screen shown on app initialization.

**Features:**
- EXO logo with pulse animation
- Large glowing spinner
- Animated background orbs (cyan, amber)
- Loading status text
- 2-second display duration

**Design:**
- Fixed full-screen overlay
- Z-index: 9999 (above everything)
- Smooth fade-in animations
- Theme-aware background

---

### 3. **Skeleton Loaders** (`/src/app/components/Skeleton.tsx`)
Shape-matching skeleton loaders for content placeholders.

**Base Component:**
- `Skeleton` - Base skeleton with variants (default, circular, rectangular)

**Preset Components:**
- `SkeletonMetricCard` - Matches MetricCard dimensions
- `SkeletonCard` - Generic card with configurable lines
- `SkeletonChart` - Chart placeholder with configurable height
- `SkeletonListItem` - List item with icon, text, and action
- `SkeletonProgressItem` - Progress bar placeholder
- `SkeletonStatGrid` - Grid of metric cards
- `SkeletonTable` - Table/list with multiple rows

**Features:**
- Pulse animation
- Theme-aware muted colors
- Exact shape matching for smooth transitions
- Configurable dimensions

---

### 4. **EmptyState** (`/src/app/components/EmptyState.tsx`)
Component for displaying when no data is available.

**Features:**
- Optional icon
- Title and description
- Optional call-to-action button
- Centered layout
- Responsive spacing

---

### 5. **useLoadingState Hook** (`/src/app/hooks/useLoadingState.ts`)
Custom React hook for simulating loading delays.

**Options:**
- `delay` - Loading duration in ms (default: 1000ms)
- `minDuration` - Minimum display time (default: 500ms)

**Usage:**
```tsx
const isLoading = useLoadingState({ delay: 800 });
```

---

## Page Implementations

### Dashboard (`/src/app/pages/Dashboard.tsx`)
**Loading Time:** 800ms  
**Skeleton Structure:**
- 4 metric cards (stat grid)
- Large chart (350px height)
- 3 cards in grid layout

---

### Analytics (`/src/app/pages/Analytics.tsx`)
**Loading Time:** 900ms  
**Skeleton Structure:**
- 4 metric cards (stat grid)
- Large chart (400px height)
- 2 cards in side-by-side grid

---

### Usage (`/src/app/pages/Usage.tsx`)
**Loading Time:** 850ms  
**Skeleton Structure:**
- 3 metric cards (stat grid)
- Chart (300px height)
- Table with 5 rows
- Card with 5 lines

---

### Alerts (`/src/app/pages/Alerts.tsx`)
**Loading Time:** 750ms  
**Skeleton Structure:**
- 4 metric cards (stat grid)
- Table with 5 rows
- Card with 6 lines

---

### System Health (`/src/app/pages/SystemHealth.tsx`)
**Loading Time:** 700ms  
**Skeleton Structure:**
- 4 metric cards (stat grid)
- Two-column grid:
  - Left: 4 smaller cards
  - Right: 2 larger cards
- 3 metric cards in row

---

### Settings (`/src/app/pages/Settings.tsx`)
**Loading Time:** 600ms  
**Skeleton Structure:**
- Large card (6 lines)
- Card (5 lines)
- Two-column grid of cards (4 lines each)
- Card (3 lines)

---

## App Initialization

**File:** `/src/app/App.tsx`

The app shows the `InitialLoader` for 2 seconds before rendering the router.

```tsx
const [isInitialLoading, setIsInitialLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsInitialLoading(false);
  }, 2000);
  return () => clearTimeout(timer);
}, []);
```

---

## Theme Support

All loading components are **fully theme-aware**:

### Light Theme:
- Skeleton: `bg-muted/50` (light gray)
- Spinner glow: `shadow-[0_0_20px_rgba(0,168,201,0.6)]` (60% opacity)
- Background orbs: Subtle with lower opacity

### Dark Theme:
- Skeleton: `bg-muted/50` (dark gray)
- Spinner glow: `dark:shadow-[0_0_20px_rgba(0,229,255,0.4)]` (40% opacity)
- Background orbs: More vibrant with higher contrast

---

## Responsive Design

All skeletons adapt to screen sizes:

**Mobile:**
- Stat grids: 1 column
- Charts: Full width
- Cards: Stacked vertically

**Tablet:**
- Stat grids: 2 columns
- Two-column layouts active

**Desktop:**
- Stat grids: 4 columns
- Full multi-column layouts
- Wider card dimensions

---

## Animation Details

### Pulse Animation
```css
animate-pulse
```
- Opacity: 0.6 → 1 → 0.6
- Duration: 2s
- Easing: ease-in-out

### Spin Animation
```css
animate-spin
```
- 360° rotation
- Duration: 1s
- Linear timing

### Custom Animations (InitialLoader)
- Logo pulse: 2s duration
- Text pulse: 2s duration, 0.5s delay
- Orbs: 3s pulse, staggered delays

---

## Best Practices

### DO:
✅ Match skeleton shapes to actual content  
✅ Use consistent loading times across similar pages  
✅ Show skeletons for a minimum of 500ms (prevents flash)  
✅ Use theme-aware colors  
✅ Provide accessible loading indicators

### DON'T:
❌ Show loading for less than 300ms (jarring)  
❌ Use skeletons that don't match content shape  
❌ Forget screen reader text for spinners  
❌ Hardcode colors (breaks themes)  
❌ Make loading times too long (>2s feels slow)

---

## Future Enhancements

Potential improvements:

1. **Skeleton Shimmer Effect**
   - Add shimmer animation to skeletons
   - Gradient sweep left-to-right

2. **Progress Indicators**
   - Show actual loading progress percentage
   - File upload progress bars

3. **Retry Mechanisms**
   - Empty states with retry buttons
   - Error states with reload

4. **Smart Loading**
   - Cache loaded data
   - Optimistic UI updates
   - Partial loading (load what's visible first)

5. **Loading Priorities**
   - Load critical data first
   - Progressive enhancement
   - Skeleton placeholders for below-fold content

---

## Testing Checklist

- [ ] Initial loader appears on first visit
- [ ] All pages show skeleton loaders
- [ ] Skeletons match actual content shapes
- [ ] Light theme colors work correctly
- [ ] Dark theme colors work correctly
- [ ] Mobile layouts don't break
- [ ] Tablet layouts render properly
- [ ] Desktop layouts are optimal
- [ ] Animations are smooth (no jank)
- [ ] Screen readers announce loading states
- [ ] Loading times feel appropriate

---

**Implementation Date:** May 7, 2026  
**Status:** ✅ Complete  
**Coverage:** 100% of pages
