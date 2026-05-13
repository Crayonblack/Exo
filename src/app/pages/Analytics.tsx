'use client';

import { MetricCard } from '../components/widgets/MetricCard';
import { AnimatedNumber } from '../components/core/AnimatedNumber';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/core/ProgressBar';
import { TrendingUp, TrendingDown, Activity, Zap, Sunrise, Sun, Sunset, Moon, Battery, CloudRain } from 'lucide-react';
import { useState } from 'react';
import { useLoadingState } from '../hooks/useLoadingState';
import { Skeleton, SkeletonStatGrid, SkeletonChart, SkeletonCard } from '../components/core/Skeleton';
import { EnergyFlowChart, EnergyDataPoint } from '../components/charts/EnergyFlowChart';

const generateAnalyticsData = (days: number): EnergyDataPoint[] => {
  const data: EnergyDataPoint[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0); 
  
  for (let i = days; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    
    const solar = 30 + Math.random() * 20;
    const load = 40 + Math.random() * 15;
    
    
    let battery = 0;
    let grid = 0;
    
    const balance = solar - load;
    if (balance > 0) {
      battery = balance * 0.7; 
    } else {
      battery = 0; 
      grid = Math.abs(balance); 
    }

    data.push({
      timestamp: time.getTime(),
      solar: Number(solar.toFixed(2)),
      battery: Number(battery.toFixed(2)),
      load: Number(load.toFixed(2)),
      grid: Number(grid.toFixed(2)),
    });
  }
  return data;
};

export default function Analytics() {
  const [timeframe, setTimeframe] = useState<7 | 30 | 90>(7);
  const isLoading = useLoadingState({ delay: 900 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={4} />
        <Card variant="gradient" className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="min-w-0">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
          <div className="w-full pt-4">
            <Skeleton className="w-full rounded-lg" style={{ height: '400px' }} />
          </div>
        </Card>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <SkeletonCard lines={5} />
          <SkeletonCard lines={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Peak Demand"
          value={<AnimatedNumber value={7.8} decimals={1} />}
          unit="kW"
          color="load"
          icon={<TrendingUp />}
        />
        <MetricCard
          label="Avg. Daily Usage"
          value={<AnimatedNumber value={45} />}
          unit="kWh"
          color="solar"
          icon={<Activity />}
        />
        <MetricCard
          label="Solar Production"
          value={<AnimatedNumber value={52} />}
          unit="kWh"
          color="battery"
          icon={<Zap />}
        />
        <MetricCard
          label="Grid Dependency"
          value={<AnimatedNumber value={18} />}
          unit="%"
          color="grid-import"
          icon={<TrendingDown />}
        />
      </div>

      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Usage Analytics</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Hourly consumption patterns</p>
          </div>
          <select 
            className="px-3 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-xs sm:text-sm transition-all duration-300 hover:border-primary/30 hover:shadow-primary-glow focus:outline-none focus:border-primary/50 focus:shadow-primary-glow flex-shrink-0"
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value) as 7 | 30 | 90)}
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
        <div className="w-full pt-4">
          <EnergyFlowChart data={generateAnalyticsData(timeframe)} type="line" height={400} timeFormat="date" />
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card variant="gradient" className="p-4 sm:p-6">
          <h3 className="font-semibold mb-6 text-base">Time-based Consumption</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sunrise className="w-6 h-6 sm:w-8 sm:h-8 text-solar flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Morning (6am-12pm)</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={35} suffix="%" /></span>
                </div>
                <ProgressBar value={35} max={100} color="solar" delay={0} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span><AnimatedNumber value={12.5} decimals={1} suffix=" kWh" /></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-battery flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Afternoon (12pm-6pm)</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={45} suffix="%" /></span>
                </div>
                <ProgressBar value={45} max={100} color="battery" delay={150} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span><AnimatedNumber value={15.8} decimals={1} suffix=" kWh" /></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Sunset className="w-6 h-6 sm:w-8 sm:h-8 text-load flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Evening (6pm-12am)</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={30} suffix="%" /></span>
                </div>
                <ProgressBar value={30} max={100} color="load" delay={300} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span><AnimatedNumber value={10.2} decimals={1} suffix=" kWh" /></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-grid-import flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Night (12am-6am)</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={20} suffix="%" /></span>
                </div>
                <ProgressBar value={20} max={100} color="grid-import" delay={450} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span><AnimatedNumber value={6.5} decimals={1} suffix=" kWh" /></span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="gradient" className="p-4 sm:p-6">
          <h3 className="font-semibold mb-6 text-base">Efficiency Metrics</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-solar flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Solar Self-Consumption</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={82} suffix="%" /></span>
                </div>
                <ProgressBar value={82} color="solar" delay={0} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="text-success">High efficiency</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-battery flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Battery Efficiency</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={94} suffix="%" /></span>
                </div>
                <ProgressBar value={94} color="battery" delay={150} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="text-success">Excellent</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <CloudRain className="w-6 h-6 sm:w-8 sm:h-8 text-load flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Grid Independence</span>
                  <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={76} suffix="%" /></span>
                </div>
                <ProgressBar value={76} color="load" delay={300} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="text-success">Good</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
