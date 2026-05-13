'use client';

import { MetricCard } from '../components/MetricCard';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { TrendingUp, TrendingDown, Activity, Zap, Sunrise, Sun, Sunset, Moon, Battery, CloudRain } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { SkeletonStatGrid, SkeletonChart, SkeletonCard } from '../components/Skeleton';

export default function Analytics() {
  const isLoading = useLoadingState({ delay: 900 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={4} />
        <SkeletonChart height={400} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <SkeletonCard lines={5} />
          <SkeletonCard lines={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Peak Demand"
          value="7.8"
          unit="kW"
          color="load"
          icon={<TrendingUp />}
        />
        <MetricCard
          label="Avg. Daily Usage"
          value="45"
          unit="kWh"
          color="solar"
          icon={<Activity />}
        />
        <MetricCard
          label="Solar Production"
          value="52"
          unit="kWh"
          color="battery"
          icon={<Zap />}
        />
        <MetricCard
          label="Grid Dependency"
          value="18"
          unit="%"
          color="grid-import"
          icon={<TrendingDown />}
        />
      </div>

      {/* Large Chart */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Usage Analytics</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Hourly consumption patterns</p>
          </div>
          <select className="px-3 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-xs sm:text-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_16px_rgba(0,229,255,0.1)] focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(0,229,255,0.2)] flex-shrink-0">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
        <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed border-border">
          <div className="text-center space-y-2">
            <div className="text-5xl">📈</div>
            <p className="text-sm text-muted-foreground">Detailed Analytics Chart</p>
            <p className="text-xs text-muted-foreground">Hourly consumption with trends</p>
          </div>
        </div>
      </Card>

      {/* Consumption Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card variant="gradient" className="p-4 sm:p-6">
          <h3 className="font-semibold mb-6 text-base">Time-based Consumption</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sunrise className="w-6 h-6 sm:w-8 sm:h-8 text-data-solar flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Morning (6am-12pm)</span>
                  <span className="text-xs text-muted-foreground font-medium">35%</span>
                </div>
                <ProgressBar value={35} max={100} color="solar" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>12.5 kWh</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-data-battery flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Afternoon (12pm-6pm)</span>
                  <span className="text-xs text-muted-foreground font-medium">45%</span>
                </div>
                <ProgressBar value={45} max={100} color="battery" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>15.8 kWh</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Sunset className="w-6 h-6 sm:w-8 sm:h-8 text-data-load flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Evening (6pm-12am)</span>
                  <span className="text-xs text-muted-foreground font-medium">30%</span>
                </div>
                <ProgressBar value={30} max={100} color="load" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10.2 kWh</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-data-grid-import flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Night (12am-6am)</span>
                  <span className="text-xs text-muted-foreground font-medium">20%</span>
                </div>
                <ProgressBar value={20} max={100} color="grid-import" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>6.5 kWh</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="gradient" className="p-4 sm:p-6">
          <h3 className="font-semibold mb-6 text-base">Efficiency Metrics</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-data-solar flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Solar Self-Consumption</span>
                  <span className="text-xs text-muted-foreground font-medium">82%</span>
                </div>
                <ProgressBar value={82} color="solar" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="text-success">High efficiency</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-data-battery flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Battery Efficiency</span>
                  <span className="text-xs text-muted-foreground font-medium">94%</span>
                </div>
                <ProgressBar value={94} color="battery" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="text-success">Excellent</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <CloudRain className="w-6 h-6 sm:w-8 sm:h-8 text-data-load flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Grid Independence</span>
                  <span className="text-xs text-muted-foreground font-medium">76%</span>
                </div>
                <ProgressBar value={76} color="load" />
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
