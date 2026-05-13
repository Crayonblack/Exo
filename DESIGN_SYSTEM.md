# EXO Energy Management System - Design System Documentation

## Overview

The EXO Design System is a comprehensive UI kit built for energy management dashboards. It features a modern, data-focused aesthetic with full light/dark mode support, built on Next.js, Tailwind CSS, and Unovis for data visualization.

---

## Design Principles

1. **Data-First**: Optimized for displaying real-time energy metrics clearly
2. **Accessible**: WCAG 2.1 AA compliant with proper contrast ratios
3. **Responsive**: Mobile-first approach with tablet and desktop breakpoints
4. **Themeable**: Complete light/dark mode support via CSS variables
5. **Performant**: Optimized for fast rendering and minimal bundle size

---

## Color System

### Semantic Color Tokens

All colors are defined as CSS variables with automatic light/dark mode support.

#### Data Visualization Colors

```css
--data-solar: #00D9FF        /* Cyan - Solar generation */
--data-battery: #FF6B9D      /* Coral/Pink - Battery storage */
--data-load: #A855F7         /* Purple - System load */
--data-grid-export: #10B981  /* Green - Grid export */
--data-grid-import: #F59E0B  /* Amber - Grid import */
```

#### Semantic State Colors

```css
--success: #10B981   /* Success states, positive indicators */
--warning: #F59E0B   /* Warnings, caution states */
--error: #EF4444     /* Errors, critical alerts */
--info: #00D9FF      /* Informational messages */
```

#### Foundation Colors

**Light Mode:**
```css
--background: #FFFFFF
--foreground: #0A0E14
--card: #FFFFFF
--border: rgba(0, 0, 0, 0.1)
--muted: #ECECF0
--muted-foreground: #717182
```

**Dark Mode:**
```css
--background: #0A0E14
--foreground: #FFFFFF
--card: #161B22
--border: rgba(255, 255, 255, 0.1)
--muted: #1F2937
--muted-foreground: #9CA3AF
```

### Using Colors

```tsx
// Via Tailwind classes
<div className="bg-data-solar text-foreground" />

// Via CSS variables
<div style={{ color: 'var(--data-battery)' }} />
```

---

## Typography

### Font Stack

Primary font: **Inter** (Google Fonts)

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| **H1** | 32px | 700 | 1.5 | Page titles, main dashboard heading |
| **H2** | 24px | 600 | 1.5 | Section headers |
| **H3** | 20px | 600 | 1.5 | Card titles, subsection headers |
| **H4** | 16px | 600 | 1.5 | Small headers |
| **Body Large** | 16px | 400 | 1.5 | Primary content |
| **Body Default** | 14px | 400 | 1.5 | Default text |
| **Body Small** | 12px | 400 | 1.5 | Labels, captions |
| **Metric Large** | 48px | 700 | 1.2 | Main metric values |
| **Metric Medium** | 32px | 600 | 1.2 | Secondary metrics |
| **Metric Small** | 24px | 600 | 1.2 | Compact metrics |

### Usage Examples

```tsx
<h1>Energy Dashboard</h1>              {/* Heading 1 */}
<h2>24-Hour Power Usage</h2>           {/* Heading 2 */}
<h3>System Status</h3>                 {/* Heading 3 */}
<p className="text-base">Content</p>   {/* Body text */}
<span className="text-3xl font-bold">3.2</span>  {/* Metric value */}
```

---

## Spacing System

Based on an **8px grid** for consistent rhythm and alignment.

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-1` | 4px | Tight spacing, icon gaps |
| `spacing-2` | 8px | Compact element spacing |
| `spacing-3` | 12px | Default gaps between items |
| `spacing-4` | 16px | Comfortable spacing, padding |
| `spacing-5` | 24px | Section spacing |
| `spacing-6` | 32px | Large gaps between sections |
| `spacing-7` | 48px | Major section breaks |
| `spacing-8` | 64px | Page-level spacing |

### Tailwind Equivalents

```tsx
<div className="p-4">   {/* 16px padding (spacing-4) */}
<div className="gap-6">  {/* 24px gap (spacing-5) */}
<div className="mb-8">   {/* 32px margin-bottom (spacing-6) */}
```

---

## Components

### Button

Multi-variant button component with size options.

**Variants:**
- `primary` - Main actions (filled, high contrast)
- `secondary` - Secondary actions (subtle background)
- `ghost` - Tertiary actions (transparent, hover effect)
- `destructive` - Dangerous actions (red/error color)

**Sizes:**
- `small` - 32px height, compact padding
- `medium` - 40px height (default)
- `large` - 48px height, prominent

**Usage:**
```tsx
import { Button } from '@/app/components/Button';

<Button variant="primary" size="medium" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="ghost" size="small">
  Cancel
</Button>
```

---

### MetricCard

Core component for displaying energy metrics with trend indicators.

**Props:**
- `label` (string) - Metric label
- `value` (string | number) - Main metric value
- `unit` (string, optional) - Unit of measurement
- `change` (number, optional) - Percentage change
- `trend` ('up' | 'down' | 'neutral', optional) - Trend direction
- `color` ('solar' | 'battery' | 'load' | 'grid-export' | 'grid-import', optional) - Border color
- `icon` (ReactNode, optional) - Icon element
- `size` ('small' | 'medium' | 'large') - Card size

**Usage:**
```tsx
import { MetricCard } from '@/app/components/MetricCard';
import { Sun } from 'lucide-react';

<MetricCard
  label="Solar Generation"
  value="4.8"
  unit="kW"
  change={12.3}
  trend="up"
  color="solar"
  icon={<Sun className="w-5 h-5" />}
/>
```

---

### Card

Base container component with consistent styling.

**Usage:**
```tsx
import { Card } from '@/app/components/Card';

<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

---

### Badge

Status indicator with semantic color variants.

**Variants:**
- `success` - Green, positive states
- `warning` - Amber, caution states
- `error` - Red, error states
- `info` - Cyan, informational
- `neutral` - Gray, default state

**Props:**
- `showDot` (boolean) - Display status dot indicator

**Usage:**
```tsx
import { Badge } from '@/app/components/Badge';

<Badge variant="success" showDot>Online</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error" showDot>Critical</Badge>
```

---

### ProgressBar

Visual representation of progress, capacity, or usage.

**Props:**
- `value` (number) - Current value
- `max` (number) - Maximum value (default: 100)
- `label` (string, optional) - Progress label
- `showValue` (boolean) - Display numeric value
- `size` ('small' | 'default' | 'large') - Bar height
- `color` - Data color variant

**Usage:**
```tsx
import { ProgressBar } from '@/app/components/ProgressBar';

<ProgressBar
  label="Battery Charge"
  value={82}
  max={100}
  showValue={true}
  color="battery"
  size="default"
/>
```

---

### Charts (Unovis)

#### PowerUsageChart

Stacked bar chart for 24-hour power usage visualization.

**Data Structure:**
```typescript
interface PowerUsageData {
  time: string;
  load?: number;
  solar?: number;
  battery?: number;
  gridImport?: number;
  gridExport?: number;
}
```

**Usage:**
```tsx
import { PowerUsageChart } from '@/app/components/PowerUsageChart';

const data = [
  { time: '00:00', solar: 0, battery: 2.1, load: 3.2 },
  { time: '02:00', solar: 0, battery: 1.8, load: 2.8 },
  // ...
];

<PowerUsageChart
  data={data}
  height={350}
  showLegend={true}
/>
```

#### DonutChart

Circular chart for energy source distribution.

**Data Structure:**
```typescript
interface DonutDataItem {
  name: string;
  value: number;
  color: string;
}
```

**Usage:**
```tsx
import { DonutChart } from '@/app/components/DonutChart';

const data = [
  { name: 'Solar', value: 4.8, color: '#00D9FF' },
  { name: 'Battery', value: 2.1, color: '#FF6B9D' },
  { name: 'Grid', value: 1.6, color: '#F59E0B' },
];

<DonutChart
  data={data}
  title="Energy Sources"
  size={200}
  showValue={true}
/>
```

#### EnergyFlowChart

Line or area chart for time-series energy flow data.

**Data Structure:**
```typescript
interface EnergyDataPoint {
  timestamp: number;
  solar: number;
  battery: number;
  load: number;
  grid: number;
}
```

**Usage:**
```tsx
import { EnergyFlowChart } from '@/app/components/EnergyFlowChart';

<EnergyFlowChart
  data={timeSeriesData}
  height={300}
  type="area"
/>
```

---

### Navigation

#### SideNav (Desktop)

Vertical sidebar navigation for desktop layouts.

**Props:**
- `activeItem` (string) - Currently active navigation item
- `onItemClick` (function) - Click handler for navigation items

**Usage:**
```tsx
import { SideNav } from '@/app/components/SideNav';

<SideNav
  activeItem={activeNav}
  onItemClick={(item) => setActiveNav(item)}
  className="w-64"
/>
```

#### BottomNav (Mobile)

Bottom navigation bar optimized for mobile devices.

**Usage:**
```tsx
import { BottomNav } from '@/app/components/BottomNav';

<BottomNav
  activeItem={activeNav}
  onItemClick={(item) => setActiveNav(item)}
/>
```

---

### ThemeToggle

Button component for switching between light and dark modes.

**Usage:**
```tsx
import { ThemeToggle } from '@/app/components/ThemeToggle';

<ThemeToggle />
```

---

## Layout Patterns

### Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm - Small tablets */ }
@media (min-width: 768px)  { /* md - Tablets */ }
@media (min-width: 1024px) { /* lg - Desktop */ }
@media (min-width: 1280px) { /* xl - Large desktop */ }
@media (min-width: 1536px) { /* 2xl - Extra large */ }
```

### Grid Layouts

**Metrics Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <MetricCard {...metric1} />
  <MetricCard {...metric2} />
  <MetricCard {...metric3} />
  <MetricCard {...metric4} />
</div>
```

**Dashboard Layout:**
```tsx
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  <div className="xl:col-span-2">
    {/* Main content */}
  </div>
  <div>
    {/* Sidebar content */}
  </div>
</div>
```

---

## Theming

### Implementing Theme Switch

```tsx
'use client';
import { useTheme } from 'next-themes';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Custom Theme Colors

To customize colors, update CSS variables in `styles/theme.css`:

```css
:root {
  --data-solar: #YOUR_COLOR;
  --data-battery: #YOUR_COLOR;
  /* ... */
}

.dark {
  --data-solar: #YOUR_DARK_MODE_COLOR;
  /* ... */
}
```

---

## Best Practices

### 1. Component Composition

```tsx
// ✅ Good - Composable, reusable
<Card className="p-6">
  <h3 className="font-semibold mb-4">Title</h3>
  <ProgressBar value={75} label="Usage" />
</Card>

// ❌ Avoid - Monolithic components
<ComplexCardWithEverything title="Title" progress={75} />
```

### 2. Responsive Design

```tsx
// ✅ Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// ❌ Desktop-first (harder to maintain)
<div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1">
```

### 3. Color Usage

```tsx
// ✅ Use semantic tokens
<div className="bg-data-solar text-foreground">

// ❌ Hardcoded colors
<div style={{ backgroundColor: '#00D9FF' }}>
```

### 4. Accessibility

```tsx
// ✅ Proper labels and ARIA
<Button aria-label="Toggle theme" onClick={toggleTheme}>
  <Icon />
</Button>

// ❌ No context for screen readers
<button onClick={toggleTheme}>
  <Icon />
</button>
```

---

## Customization Guide

### Adding New Data Colors

1. Define in `styles/theme.css`:
```css
:root {
  --data-wind: #3B82F6;
}

.dark {
  --data-wind: #60A5FA;
}
```

2. Add to Tailwind theme:
```css
@theme inline {
  --color-data-wind: var(--data-wind);
}
```

3. Use in components:
```tsx
<MetricCard color="wind" />
```

### Creating Custom Components

Follow the established pattern:

```tsx
'use client'; // If using hooks or interactivity

import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface CustomComponentProps {
  // Define props
}

export const CustomComponent = forwardRef<HTMLDivElement, CustomComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-styles', className)}
        {...props}
      />
    );
  }
);

CustomComponent.displayName = 'CustomComponent';
```

---

## Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **Unovis**: https://unovis.dev/docs
- **Lucide Icons**: https://lucide.dev
- **next-themes**: https://github.com/pacocoursey/next-themes

---

## Support & Contribution

For questions, issues, or contributions:
1. Check existing documentation
2. Review component examples in `/app/components/DesignSystemShowcase.tsx`
3. Open an issue for bugs or feature requests

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-07  
**License**: MIT
