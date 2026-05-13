'use client';

import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisBulletLegend } from '@unovis/react';
import { Card } from './Card';
import { cn } from '../utils/cn';

export interface PowerUsageData {
  time: string;
  load?: number;
  solar?: number;
  battery?: number;
  gridImport?: number;
  gridExport?: number;
}

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

export function PowerUsageChart({
  data,
  className,
  height = 300,
  showLegend = true,
  dataKeys = [
    { key: 'solar', name: 'Solar', color: '#00D9FF' },
    { key: 'battery', name: 'Battery', color: '#FF6B9D' },
    { key: 'load', name: 'Load', color: '#A855F7' },
    { key: 'gridImport', name: 'Grid Import', color: '#F59E0B' },
  ]
}: PowerUsageChartProps) {
  const x = (d: PowerUsageData) => d.time;
  const y = dataKeys.map(k => (d: PowerUsageData) => d[k.key] ?? 0);
  const colors = dataKeys.map(k => k.color);

  const legendItems = dataKeys.map(k => ({
    name: k.name,
    color: k.color,
  }));

  return (
    <Card className={cn('p-6', className)}>
      {showLegend && (
        <div className="mb-4">
          <VisBulletLegend items={legendItems} />
        </div>
      )}
      <VisXYContainer data={data} height={height}>
        <VisStackedBar
          x={x}
          y={y}
          color={colors}
          roundedCorners={4}
        />
        <VisAxis type="x" label="Time" />
        <VisAxis type="y" label="Power (kW)" />
        <VisTooltip />
      </VisXYContainer>
    </Card>
  );
}
