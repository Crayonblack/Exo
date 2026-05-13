'use client';

import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { MetricCard } from './MetricCard';
import { ProgressBar } from './ProgressBar';
import { Sun, Battery, Zap, TrendingUp } from 'lucide-react';

export function DesignSystemShowcase() {
  return (
    <div className="space-y-12 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold mb-2">EXO Design System</h1>
        <p className="text-muted-foreground text-lg">
          Energy Management System UI Kit & Component Library
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Color System</h2>
          <p className="text-muted-foreground">
            Semantic color tokens with automatic light/dark mode support
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Solar', class: 'bg-data-solar', value: '#00D9FF' },
            { name: 'Battery', class: 'bg-data-battery', value: '#FF6B9D' },
            { name: 'Load', class: 'bg-data-load', value: '#A855F7' },
            { name: 'Grid Export', class: 'bg-data-grid-export', value: '#10B981' },
            { name: 'Grid Import', class: 'bg-data-grid-import', value: '#F59E0B' },
          ].map((color) => (
            <Card key={color.name} className="p-4">
              <div className={`w-full h-20 rounded-lg ${color.class} mb-3`} />
              <div className="font-medium text-sm">{color.name}</div>
              <div className="text-xs text-muted-foreground">{color.value}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Typography</h2>
          <p className="text-muted-foreground">Clear hierarchy for energy data</p>
        </div>

        <Card className="p-6 space-y-4">
          <div>
            <h1>Heading 1 - Dashboard Title</h1>
            <p className="text-xs text-muted-foreground">32px / Bold / Used for main page titles</p>
          </div>
          <div>
            <h2>Heading 2 - Section Header</h2>
            <p className="text-xs text-muted-foreground">24px / Semibold / Section headers</p>
          </div>
          <div>
            <h3>Heading 3 - Card Title</h3>
            <p className="text-xs text-muted-foreground">20px / Semibold / Card headers</p>
          </div>
          <div>
            <p className="text-base">Body Text - Default content and descriptions</p>
            <p className="text-xs text-muted-foreground">16px / Regular / Body copy</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Small Text - Labels and secondary info</p>
            <p className="text-xs text-muted-foreground">14px / Regular / Labels</p>
          </div>
        </Card>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Buttons</h2>
          <p className="text-muted-foreground">Multiple variants and sizes</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Badges</h2>
          <p className="text-muted-foreground">Status indicators and labels</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge variant="success" showDot>Online</Badge>
            <Badge variant="warning" showDot>Warning</Badge>
            <Badge variant="error" showDot>Error</Badge>
            <Badge variant="info" showDot>Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </Card>
      </section>

      {/* Metric Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Metric Cards</h2>
          <p className="text-muted-foreground">Core component for displaying energy metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard
            label="Solar Generation"
            value="4.8"
            unit="kW"
            change={12.3}
            trend="up"
            color="solar"
            icon={<Sun className="w-5 h-5" />}
          />
          <MetricCard
            label="Battery Level"
            value="82"
            unit="%"
            change={3.5}
            trend="up"
            color="battery"
            icon={<Battery className="w-5 h-5" />}
          />
          <MetricCard
            label="Current Load"
            value="3.2"
            unit="kW"
            change={5.2}
            trend="down"
            color="load"
            icon={<Zap className="w-5 h-5" />}
          />
          <MetricCard
            label="Grid Import"
            value="1.6"
            unit="kW"
            change={8.1}
            trend="neutral"
            color="grid-import"
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* Progress Bars */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Progress Bars</h2>
          <p className="text-muted-foreground">Visual representation of capacity and usage</p>
        </div>

        <Card className="p-6 space-y-6">
          <ProgressBar label="Solar Capacity" value={75} showValue color="solar" />
          <ProgressBar label="Battery Charge" value={82} showValue color="battery" />
          <ProgressBar label="System Load" value={60} showValue color="load" />
          <ProgressBar label="Grid Export" value={45} showValue color="grid-export" />
        </Card>
      </section>

      {/* Spacing System */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Spacing Scale</h2>
          <p className="text-muted-foreground">8px-based spacing system</p>
        </div>

        <Card className="p-6 space-y-4">
          {[
            { name: 'spacing-1', value: '4px', class: 'w-1' },
            { name: 'spacing-2', value: '8px', class: 'w-2' },
            { name: 'spacing-3', value: '12px', class: 'w-3' },
            { name: 'spacing-4', value: '16px', class: 'w-4' },
            { name: 'spacing-5', value: '24px', class: 'w-6' },
            { name: 'spacing-6', value: '32px', class: 'w-8' },
            { name: 'spacing-8', value: '64px', class: 'w-16' },
          ].map((space) => (
            <div key={space.name} className="flex items-center gap-4">
              <div className={`${space.class} h-8 bg-primary rounded`} />
              <div className="text-sm">
                <span className="font-medium">{space.name}</span>
                <span className="text-muted-foreground ml-2">{space.value}</span>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
