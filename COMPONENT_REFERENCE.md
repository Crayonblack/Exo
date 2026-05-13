# Component Reference Guide

Quick reference for all EXO Design System components.

## Table of Contents

1. [Button](#button)
2. [Card](#card)
3. [Badge](#badge)
4. [MetricCard](#metriccard)
5. [ProgressBar](#progressbar)
6. [PowerUsageChart](#powerusagechart)
7. [DonutChart](#donutchart)
8. [EnergyFlowChart](#energyflowchart)
9. [ConsumptionBreakdown](#consumptionbreakdown)
10. [SystemStatus](#systemstatus)
11. [ActiveAlerts](#activealerts)
12. [SideNav](#sidenav)
13. [BottomNav](#bottomnav)
14. [ThemeToggle](#themetoggle)

---

## Button

### Import
```tsx
import { Button } from '@/app/components/Button';
```

### Props
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'small' | 'medium' | 'large';
}
```

### Examples
```tsx
// Primary button
<Button variant="primary" onClick={handleSave}>
  Save Changes
</Button>

// Small ghost button
<Button variant="ghost" size="small">
  Cancel
</Button>

// Large destructive button
<Button variant="destructive" size="large" onClick={handleDelete}>
  Delete Account
</Button>
```

---

## Card

### Import
```tsx
import { Card } from '@/app/components/Card';
```

### Props
```typescript
interface CardProps extends HTMLAttributes<HTMLDivElement> {}
```

### Examples
```tsx
// Basic card
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>

// Card with custom padding
<Card className="p-8">
  Large padding content
</Card>
```

---

## Badge

### Import
```tsx
import { Badge } from '@/app/components/Badge';
```

### Props
```typescript
interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'small' | 'default';
  showDot?: boolean;
}
```

### Examples
```tsx
// Success badge with dot
<Badge variant="success" showDot>
  Online
</Badge>

// Warning badge
<Badge variant="warning">
  Low Battery
</Badge>

// Small error badge
<Badge variant="error" size="small">
  Critical
</Badge>
```

---

## MetricCard

### Import
```tsx
import { MetricCard } from '@/app/components/MetricCard';
import { Sun } from 'lucide-react';
```

### Props
```typescript
interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import';
}
```

### Examples
```tsx
// Solar generation metric
<MetricCard
  label="Solar Generation"
  value="4.8"
  unit="kW"
  change={12.3}
  trend="up"
  color="solar"
  icon={<Sun className="w-5 h-5" />}
/>

// Battery level (large)
<MetricCard
  label="Battery Level"
  value={82}
  unit="%"
  size="large"
  color="battery"
/>

// Small metric (mobile)
<MetricCard
  label="Load"
  value="3.2"
  unit="kW"
  size="small"
  color="load"
/>
```

---

## ProgressBar

### Import
```tsx
import { ProgressBar } from '@/app/components/ProgressBar';
```

### Props
```typescript
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'small' | 'default' | 'large';
  color?: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import' | 'primary';
  className?: string;
}
```

### Examples
```tsx
// Battery charge progress
<ProgressBar
  label="Battery Charge"
  value={82}
  max={100}
  showValue={true}
  color="battery"
/>

// Small progress bar
<ProgressBar
  value={45}
  size="small"
  color="solar"
/>

// Large with custom max value
<ProgressBar
  label="Solar Capacity"
  value={3.2}
  max={5.0}
  showValue={true}
  size="large"
  color="solar"
/>
```

---

## PowerUsageChart

### Import
```tsx
import { PowerUsageChart } from '@/app/components/PowerUsageChart';
```

### Data Structure
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

### Props
```typescript
interface PowerUsageChartProps {
  data: PowerUsageData[];
  className?: string;
  height?: number;
  showLegend?: boolean;
  dataKeys?: Array<{
    key: keyof PowerUsageData;
    name: string;
    color: string;
  }>;
}
```

### Examples
```tsx
const data = [
  { time: '00:00', solar: 0, battery: 2.1, load: 3.2, gridImport: 1.1 },
  { time: '02:00', solar: 0, battery: 1.8, load: 2.8, gridImport: 1.0 },
  // ...
];

// Full chart with legend
<PowerUsageChart
  data={data}
  height={350}
  showLegend={true}
/>

// Compact chart without legend
<PowerUsageChart
  data={data}
  height={250}
  showLegend={false}
/>

// Custom data keys
<PowerUsageChart
  data={data}
  dataKeys={[
    { key: 'solar', name: 'Solar Power', color: '#00D9FF' },
    { key: 'load', name: 'Consumption', color: '#A855F7' },
  ]}
/>
```

---

## DonutChart

### Import
```tsx
import { DonutChart } from '@/app/components/DonutChart';
```

### Data Structure
```typescript
interface DonutDataItem {
  name: string;
  value: number;
  color: string;
}
```

### Props
```typescript
interface DonutChartProps {
  data: DonutDataItem[];
  className?: string;
  size?: number;
  title?: string;
  showValue?: boolean;
}
```

### Examples
```tsx
const data = [
  { name: 'Solar', value: 4.8, color: '#00D9FF' },
  { name: 'Battery', value: 2.1, color: '#FF6B9D' },
  { name: 'Grid', value: 1.6, color: '#F59E0B' },
];

// With title and values
<DonutChart
  data={data}
  title="Energy Sources"
  showValue={true}
  size={200}
/>

// Compact version
<DonutChart
  data={data}
  size={150}
  showValue={false}
/>
```

---

## EnergyFlowChart

### Import
```tsx
import { EnergyFlowChart } from '@/app/components/EnergyFlowChart';
```

### Data Structure
```typescript
interface EnergyDataPoint {
  timestamp: number;
  solar: number;
  battery: number;
  load: number;
  grid: number;
}
```

### Props
```typescript
interface EnergyFlowChartProps {
  data: EnergyDataPoint[];
  className?: string;
  height?: number;
  type?: 'line' | 'area';
}
```

### Examples
```tsx
const timeSeriesData = [
  { timestamp: 1609459200000, solar: 2.5, battery: 3.1, load: 4.2, grid: 1.1 },
  { timestamp: 1609462800000, solar: 3.8, battery: 2.5, load: 3.9, grid: 0.8 },
  // ...
];

// Area chart
<EnergyFlowChart
  data={timeSeriesData}
  height={300}
  type="area"
/>

// Line chart
<EnergyFlowChart
  data={timeSeriesData}
  type="line"
/>
```

---

## ConsumptionBreakdown

### Import
```tsx
import { ConsumptionBreakdown } from '@/app/components/ConsumptionBreakdown';
```

### Data Structure
```typescript
interface ConsumptionItem {
  name: string;
  value: number;
  percentage: number;
  color: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import';
}
```

### Props
```typescript
interface ConsumptionBreakdownProps {
  title: string;
  items: ConsumptionItem[];
  className?: string;
}
```

### Examples
```tsx
const consumptionData = [
  { name: 'HVAC System', value: 2.8, percentage: 35, color: 'load' },
  { name: 'Lighting', value: 1.2, percentage: 15, color: 'solar' },
  { name: 'Appliances', value: 2.4, percentage: 30, color: 'battery' },
  { name: 'Electronics', value: 1.6, percentage: 20, color: 'grid-import' },
];

<ConsumptionBreakdown
  title="Top Consumers"
  items={consumptionData}
/>
```

---

## SystemStatus

### Import
```tsx
import { SystemStatus } from '@/app/components/SystemStatus';
```

### Props
```typescript
interface SystemStatusProps {
  className?: string;
}
```

### Examples
```tsx
<SystemStatus />

<SystemStatus className="col-span-2" />
```

---

## ActiveAlerts

### Import
```tsx
import { ActiveAlerts } from '@/app/components/ActiveAlerts';
```

### Props
```typescript
interface ActiveAlertsProps {
  className?: string;
}
```

### Examples
```tsx
<ActiveAlerts />

<ActiveAlerts className="mb-6" />
```

---

## SideNav

### Import
```tsx
import { SideNav } from '@/app/components/SideNav';
```

### Props
```typescript
interface SideNavProps {
  className?: string;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}
```

### Examples
```tsx
const [activeNav, setActiveNav] = useState('Dashboard');

<SideNav
  activeItem={activeNav}
  onItemClick={(item) => setActiveNav(item)}
  className="w-64"
/>
```

---

## BottomNav

### Import
```tsx
import { BottomNav } from '@/app/components/BottomNav';
```

### Props
```typescript
interface BottomNavProps {
  className?: string;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}
```

### Examples
```tsx
const [activeNav, setActiveNav] = useState('Dashboard');

<BottomNav
  activeItem={activeNav}
  onItemClick={(item) => setActiveNav(item)}
/>
```

---

## ThemeToggle

### Import
```tsx
import { ThemeToggle } from '@/app/components/ThemeToggle';
```

### Examples
```tsx
// Simple usage
<ThemeToggle />

// In a header
<header className="flex justify-between items-center">
  <h1>Dashboard</h1>
  <ThemeToggle />
</header>
```

---

## Common Patterns

### Dashboard Header
```tsx
<div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-3xl font-bold mb-1">Energy Dashboard</h1>
    <p className="text-muted-foreground">Real-time monitoring</p>
  </div>
  <ThemeToggle />
</div>
```

### Metrics Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <MetricCard {...metric1} />
  <MetricCard {...metric2} />
  <MetricCard {...metric3} />
  <MetricCard {...metric4} />
</div>
```

### Two-Column Layout
```tsx
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  <div className="xl:col-span-2">
    <PowerUsageChart data={data} />
  </div>
  <div>
    <DonutChart data={donutData} />
  </div>
</div>
```

### Mobile Header
```tsx
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-2">
    <Zap className="w-6 h-6 text-primary" />
    <h1 className="text-2xl font-bold">EXO</h1>
  </div>
  <ThemeToggle />
</div>
```

---

## Tips & Best Practices

### Performance
- Wrap chart components with `React.memo()` for large datasets
- Use `useMemo()` for data transformations
- Lazy load charts that aren't immediately visible

### Responsive Design
- Use responsive grid classes: `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`
- Adjust card sizes on mobile: `size="small"` for MetricCard
- Hide legends on mobile charts: `showLegend={false}`

### Accessibility
- Always provide `aria-label` for icon-only buttons
- Ensure sufficient color contrast (use design tokens)
- Add keyboard navigation support

### TypeScript
- Define data interfaces for type safety
- Use `as const` for fixed data arrays
- Leverage component prop types for autocomplete

---

**Last Updated**: 2026-05-07
