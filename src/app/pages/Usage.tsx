'use client';

import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { Zap, Home, Lightbulb, Wind, Tv, Thermometer, Droplet } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { SkeletonStatGrid, SkeletonChart, SkeletonTable, SkeletonCard } from '../components/Skeleton';

const devices = [
  { id: 1, name: 'HVAC System', room: 'Whole House', power: 2.8, status: 'active', icon: <Wind className="w-5 h-5" /> },
  { id: 2, name: 'Refrigerator', room: 'Kitchen', power: 0.8, status: 'active', icon: <Home className="w-5 h-5" /> },
  { id: 3, name: 'Water Heater', room: 'Utility', power: 1.5, status: 'active', icon: <Zap className="w-5 h-5" /> },
  { id: 4, name: 'Lighting', room: 'All Rooms', power: 0.4, status: 'active', icon: <Lightbulb className="w-5 h-5" /> },
  { id: 5, name: 'Entertainment', room: 'Living Room', power: 0.3, status: 'standby', icon: <Tv className="w-5 h-5" /> },
];

export default function Usage() {
  const isLoading = useLoadingState({ delay: 850 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={3} className="grid-cols-1 md:grid-cols-3" />
        <SkeletonChart height={300} />
        <SkeletonTable rows={5} />
        <SkeletonCard lines={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="gradient" glow className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Consumption Today</div>
          <div className="text-3xl font-bold text-foreground">45.2 kWh</div>
          <div className="text-xs text-success mt-2 flex items-center gap-1">
            ↓ 12% vs yesterday
            <span className="inline-block w-1 h-1 rounded-full bg-success animate-pulse" />
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Average Power</div>
          <div className="text-3xl font-bold text-foreground">3.8 kW</div>
          <div className="text-xs text-muted-foreground mt-2">Real-time average</div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Peak Usage</div>
          <div className="text-3xl font-bold text-foreground">7.2 kW</div>
          <div className="text-xs text-warning mt-2 flex items-center gap-1">
            At 6:45 PM
            <span className="inline-block w-1 h-1 rounded-full bg-warning animate-pulse" />
          </div>
        </Card>
      </div>

      {/* Usage Chart */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">Daily Consumption</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Hourly breakdown</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">Day</button>
            <button className="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">Week</button>
            <button className="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">Month</button>
          </div>
        </div>
        <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed border-border">
          <div className="text-center space-y-2">
            <div className="text-4xl">⚡</div>
            <p className="text-sm text-muted-foreground">Hourly Usage Chart</p>
          </div>
        </div>
      </Card>

      {/* Device List */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-4 sm:mb-6 text-base">Active Devices</h3>
        <div className="space-y-3 sm:space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-background/30 backdrop-blur-sm hover:bg-accent/30 hover:border-primary/30 hover:shadow-[0_0_16px_rgba(0,229,255,0.1)] transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(0,229,255,0.3)] transition-all duration-300 flex-shrink-0">
                {device.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{device.name}</div>
                <div className="text-xs text-muted-foreground truncate">{device.room}</div>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-sm font-medium whitespace-nowrap">{device.power} kW</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">Current draw</div>
                </div>
                <Badge variant={device.status === 'active' ? 'success' : 'neutral'} showDot size="small">
                  {device.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-6 text-base">Consumption by Category</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Wind className="w-6 h-6 sm:w-8 sm:h-8 text-data-load flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Climate Control</span>
                <span className="text-xs text-muted-foreground font-medium">41%</span>
              </div>
              <ProgressBar value={41} max={100} color="load" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>18.5 kWh</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-data-solar flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Water Heating</span>
                <span className="text-xs text-muted-foreground font-medium">27%</span>
              </div>
              <ProgressBar value={27} max={100} color="solar" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>12.3 kWh</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Home className="w-6 h-6 sm:w-8 sm:h-8 text-data-battery flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Appliances</span>
                <span className="text-xs text-muted-foreground font-medium">22%</span>
              </div>
              <ProgressBar value={22} max={100} color="battery" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>9.8 kWh</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-data-grid-import flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Lighting & Other</span>
                <span className="text-xs text-muted-foreground font-medium">10%</span>
              </div>
              <ProgressBar value={10} max={100} color="grid-import" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>4.6 kWh</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
