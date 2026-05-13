'use client';

import { MetricCard } from '../components/widgets/MetricCard';
import { AnimatedNumber } from '../components/core/AnimatedNumber';
import { ConsumptionBreakdown } from '../components/widgets/ConsumptionBreakdown';
import { SystemStatus } from '../components/widgets/SystemStatus';
import { ActiveAlerts } from '../components/widgets/ActiveAlerts';
import { Card } from '../components/core/Card';
import { Battery, Sun, Zap, TrendingUp, Wind, Lightbulb, Home, Tv } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { Skeleton, SkeletonStatGrid, SkeletonChart, SkeletonCard } from '../components/core/Skeleton';
import { EnergyFlowChart, EnergyDataPoint } from '../components/charts/EnergyFlowChart';

const generate24HourData = (): EnergyDataPoint[] => {
  const data: EnergyDataPoint[] = [];
  const now = new Date();
  now.setMinutes(0, 0, 0); 
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    
    let solar = 0;
    if (hour > 6 && hour < 19) {
      solar = Math.sin(((hour - 6) / 13) * Math.PI) * 5 + (Math.random() * 0.5);
    }
    
    
    let load = 1.5 + Math.random() * 0.5;
    if ((hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 22)) {
      load += 2 + Math.random();
    }
    
    
    let battery = 0;
    let grid = 0;
    
    const balance = solar - load;
    if (balance > 0) {
      battery = balance * 0.8;
      grid = 0;
    } else {
      battery = 0; 
      grid = Math.abs(balance);
    }

    data.push({
      timestamp: time.getTime(),
      solar: Math.max(0, Number(solar.toFixed(2))),
      battery: Math.max(0, Number(battery.toFixed(2))),
      load: Math.max(0, Number(load.toFixed(2))),
      grid: Math.max(0, Number(grid.toFixed(2))),
    });
  }
  return data;
};

const mock24HourData = generate24HourData();

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
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="w-full pt-4">
            <Skeleton className="w-full rounded-lg" style={{ height: '350px' }} />
          </div>
        </Card>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Load"
          value={<AnimatedNumber value={3.2} decimals={1} />}
          unit="kW"
          color="load"
          icon={<Zap />}
        />
        <MetricCard
          label="Solar"
          value={<AnimatedNumber value={4.8} decimals={1} />}
          unit="kW"
          color="solar"
          icon={<Sun />}
        />
        <MetricCard
          label="Battery SOC"
          value={<AnimatedNumber value={82} />}
          unit="%"
          color="battery"
          icon={<Battery />}
        />
        <MetricCard
          label="Grid"
          value={<AnimatedNumber value={-1.6} decimals={1} />}
          unit="kW"
          color="grid-import"
          icon={<TrendingUp />}
        />
      </div>

      <div>
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold">Power Usage</h3>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Last 24h</span>
          </div>
          <div className="w-full pt-4">
            <EnergyFlowChart data={mock24HourData} type="area" height={350} />
          </div>
        </Card>
      </div>

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
