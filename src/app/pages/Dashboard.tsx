'use client';

import { MetricCard } from '../components/MetricCard';
import { ConsumptionBreakdown } from '../components/ConsumptionBreakdown';
import { SystemStatus } from '../components/SystemStatus';
import { ActiveAlerts } from '../components/ActiveAlerts';
import { Card } from '../components/Card';
import { Battery, Sun, Zap, TrendingUp, Wind, Lightbulb, Home, Tv } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { SkeletonStatGrid, SkeletonChart, SkeletonCard } from '../components/Skeleton';

const consumptionData = [
  { name: 'HVAC System', value: 2.8, percentage: 35, color: 'load' as const, icon: <Wind className="w-8 h-8" /> },
  { name: 'Lighting', value: 1.2, percentage: 15, color: 'solar' as const, icon: <Lightbulb className="w-8 h-8" /> },
  { name: 'Appliances', value: 2.4, percentage: 30, color: 'battery' as const, icon: <Home className="w-8 h-8" /> },
  { name: 'Electronics', value: 1.6, percentage: 20, color: 'grid-import' as const, icon: <Tv className="w-8 h-8" /> },
];

export default function Dashboard() {
  const isLoading = useLoadingState({ delay: 800 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={4} />
        <SkeletonChart height={350} />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <SkeletonCard lines={4} />
          <SkeletonCard lines={4} />
          <SkeletonCard lines={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Load"
          value="3.2"
          unit="kW"
          color="load"
          icon={<Zap />}
        />
        <MetricCard
          label="Solar"
          value="4.8"
          unit="kW"
          color="solar"
          icon={<Sun />}
        />
        <MetricCard
          label="Battery SOC"
          value="82"
          unit="%"
          color="battery"
          icon={<Battery />}
        />
        <MetricCard
          label="Grid"
          value="-1.6"
          unit="kW"
          color="grid-import"
          icon={<TrendingUp />}
        />
      </div>

      {/* Power Usage Section */}
      <div>
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold">Power Usage</h3>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Last 24h</span>
          </div>
          <div className="h-[350px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed border-border">
            <div className="text-center space-y-2">
              <div className="text-4xl">📊</div>
              <p className="text-sm text-muted-foreground">24-Hour Power Usage Chart</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ConsumptionBreakdown
          title="Top Consumers"
          items={consumptionData}
        />
        <SystemStatus />
        <ActiveAlerts />
      </div>
    </div>
  );
}
