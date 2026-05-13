'use client';

import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisBulletLegend, VisCrosshair } from '@unovis/react';
import { cn } from '../../utils/cn';

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
    { key: 'solar', name: 'Solar', color: 'var(--color-solar)' },
    { key: 'battery', name: 'Battery', color: 'var(--color-battery)' },
    { key: 'load', name: 'Load', color: 'var(--color-load)' },
    { key: 'gridImport', name: 'Grid Import', color: 'var(--color-grid-import)' },
  ]
}: PowerUsageChartProps) {
  const x = (d: PowerUsageData, i: number) => i;
  const y = dataKeys.map(k => (d: PowerUsageData) => d[k.key] ?? 0);
  const colors = dataKeys.map(k => k.color);

  const legendItems = dataKeys.map(k => ({
    name: k.name,
    color: k.color,
  }));

  return (
    <div className={cn('w-full', className)}>
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
        <VisAxis type="x" label="Time" tickFormat={(i: number) => data[i]?.time || ''} />
        <VisAxis type="y" label="Power (kW)" />
        <VisCrosshair 
          template={(d: PowerUsageData) => `
            <div class="text-sm px-2 py-1">
              <strong class="text-foreground">${d.time}</strong><br/>
              ${dataKeys.map(k => `<span style="color: ${k.color}">${k.name}: ${d[k.key] ?? 0} kW</span>`).join('<br/>')}
            </div>
          `}
        />
        <VisTooltip />
      </VisXYContainer>
    </div>
  );
}
