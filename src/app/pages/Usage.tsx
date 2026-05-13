'use client';

import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/core/ProgressBar';
import { AnimatedNumber } from '../components/core/AnimatedNumber';
import { Badge } from '../components/core/Badge';
import { Zap, Home, Lightbulb, Wind, Tv, Thermometer, Droplet } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { useState } from 'react';
import { Skeleton, SkeletonStatGrid, SkeletonChart, SkeletonTable, SkeletonCard, SkeletonListItem } from '../components/core/Skeleton';
import { PowerUsageChart, PowerUsageData } from '../components/charts/PowerUsageChart';

const generateUsageData = (filter: 'Day' | 'Week' | 'Month'): PowerUsageData[] => {
  const data: PowerUsageData[] = [];
  let points = 24; 
  let timeStep = 60 * 60 * 1000; 

  if (filter === 'Week') {
    points = 7;
    timeStep = 24 * 60 * 60 * 1000; 
  } else if (filter === 'Month') {
    points = 30;
    timeStep = 24 * 60 * 60 * 1000; 
  }

  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * timeStep);
    let timeLabel = '';
    
    if (filter === 'Day') {
      timeLabel = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      timeLabel = time.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }

    data.push({
      time: timeLabel,
      solar: Number((Math.random() * 5 + 2).toFixed(2)),
      battery: Number((Math.random() * 3).toFixed(2)),
      load: Number((Math.random() * 4 + 1).toFixed(2)),
      gridImport: Number((Math.random() * 2).toFixed(2)),
    });
  }
  return data;
};

const devices = [
  { id: 1, name: 'HVAC System', room: 'Whole House', power: 2.8, status: 'active', icon: <Wind className="w-5 h-5" /> },
  { id: 2, name: 'Refrigerator', room: 'Kitchen', power: 0.8, status: 'active', icon: <Home className="w-5 h-5" /> },
  { id: 3, name: 'Water Heater', room: 'Utility', power: 1.5, status: 'active', icon: <Zap className="w-5 h-5" /> },
  { id: 4, name: 'Lighting', room: 'All Rooms', power: 0.4, status: 'active', icon: <Lightbulb className="w-5 h-5" /> },
  { id: 5, name: 'Entertainment', room: 'Living Room', power: 0.3, status: 'standby', icon: <Tv className="w-5 h-5" /> },
];

export default function Usage() {
  const [filter, setFilter] = useState<'Day' | 'Week' | 'Month'>('Day');
  const isLoading = useLoadingState({ delay: 850 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={3} className="grid-cols-1 md:grid-cols-3" />
        <Card variant="gradient" className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="min-w-0">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-12 rounded-lg" />
              <Skeleton className="h-9 w-12 rounded-lg" />
              <Skeleton className="h-9 w-12 rounded-lg" />
            </div>
          </div>
          <div className="w-full pt-4">
            <Skeleton className="w-full rounded-lg" style={{ height: '300px' }} />
          </div>
        </Card>
        <Card variant="gradient" className="p-4 sm:p-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="space-y-4">
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="gradient" glow className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Consumption Today</div>
          <div className="text-3xl font-bold text-foreground"><AnimatedNumber value={45.2} decimals={1} suffix=" kWh" /></div>
          <div className="text-xs text-success mt-2 flex items-center gap-1">
            ↓ <AnimatedNumber value={12} suffix="%" /> vs yesterday
            <span className="inline-block w-1 h-1 rounded-full bg-success animate-pulse" />
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Average Power</div>
          <div className="text-3xl font-bold text-foreground"><AnimatedNumber value={3.8} decimals={1} suffix=" kW" /></div>
          <div className="text-xs text-muted-foreground mt-2">Real-time average</div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Peak Usage</div>
          <div className="text-3xl font-bold text-foreground"><AnimatedNumber value={7.2} decimals={1} suffix=" kW" /></div>
          <div className="text-xs text-warning mt-2 flex items-center gap-1">
            At 6:45 PM
            <span className="inline-block w-1 h-1 rounded-full bg-warning animate-pulse" />
          </div>
        </Card>
      </div>

      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">Daily Consumption</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Hourly breakdown</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={() => setFilter('Day')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg transition-all duration-300 cursor-pointer ${filter === 'Day' ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-primary-glow' : 'border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md'}`}
            >Day</button>
            <button 
              onClick={() => setFilter('Week')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg transition-all duration-300 cursor-pointer ${filter === 'Week' ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-primary-glow' : 'border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md'}`}
            >Week</button>
            <button 
              onClick={() => setFilter('Month')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg transition-all duration-300 cursor-pointer ${filter === 'Month' ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-primary-glow' : 'border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md'}`}
            >Month</button>
          </div>
        </div>
        <div className="w-full pt-4">
          <PowerUsageChart data={generateUsageData(filter)} height={300} />
        </div>
      </Card>

      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-4 sm:mb-6 text-base">Active Devices</h3>
        <div className="space-y-3 sm:space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-background/30 backdrop-blur-sm hover:bg-accent/30 hover:border-primary/30 hover:shadow-primary-glow transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:shadow-primary-glow transition-all duration-300 flex-shrink-0">
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

      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-6 text-base">Consumption by Category</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Wind className="w-6 h-6 sm:w-8 sm:h-8 text-load flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Climate Control</span>
                <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={41} suffix="%" /></span>
              </div>
              <ProgressBar value={41} max={100} color="load" delay={0} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span><AnimatedNumber value={18.5} decimals={1} suffix=" kWh" /></span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-solar flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Water Heating</span>
                <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={27} suffix="%" /></span>
              </div>
              <ProgressBar value={27} max={100} color="solar" delay={150} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span><AnimatedNumber value={12.3} decimals={1} suffix=" kWh" /></span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Home className="w-6 h-6 sm:w-8 sm:h-8 text-battery flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Appliances</span>
                <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={22} suffix="%" /></span>
              </div>
              <ProgressBar value={22} max={100} color="battery" delay={300} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span><AnimatedNumber value={9.8} decimals={1} suffix=" kWh" /></span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-grid-import flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Lighting & Other</span>
                <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={10} suffix="%" /></span>
              </div>
              <ProgressBar value={10} max={100} color="grid-import" delay={450} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span><AnimatedNumber value={4.6} decimals={1} suffix=" kWh" /></span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
