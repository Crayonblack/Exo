'use client';

import { Card } from './Card';
import { PowerUsageChart, PowerUsageData } from './PowerUsageChart';

interface PowerUsageSectionProps {
  data: PowerUsageData[];
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
}

export function PowerUsageSection({
  data,
  title = 'Power Usage',
  subtitle = 'Last 24h',
  height = 350,
  className
}: PowerUsageSectionProps) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6 px-6 pt-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
      <div className="px-6 pb-6">
        <PowerUsageChart data={data} height={height} showLegend={false} />
      </div>
    </Card>
  );
}
