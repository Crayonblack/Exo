'use client';

import { VisXYContainer, VisLine, VisArea, VisAxis, VisTooltip, VisCrosshair, VisBulletLegend } from '@unovis/react';
import { cn } from '../../utils/cn';

export interface EnergyDataPoint {
  timestamp: number;
  solar: number;
  battery: number;
  load: number;
  grid: number;
}

interface EnergyFlowChartProps {
  data: EnergyDataPoint[];
  className?: string;
  height?: number;
  type?: 'line' | 'area';
  timeFormat?: 'time' | 'date';
}

export function EnergyFlowChart({
  data,
  className,
  height = 300,
  type = 'area',
  timeFormat = 'time'
}: EnergyFlowChartProps) {
  const ChartComponent = type === 'area' ? VisArea : VisLine;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return timeFormat === 'time' 
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const legendItems = [
    { name: 'Solar', color: 'var(--color-solar)' },
    { name: 'Battery', color: 'var(--color-battery)' },
    { name: 'Load', color: 'var(--color-load)' },
    { name: 'Grid', color: 'var(--color-grid-import)' },
  ];

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-4">
        <VisBulletLegend items={legendItems} />
      </div>
      <VisXYContainer data={data} height={height}>
        <ChartComponent
          x={(d: EnergyDataPoint) => d.timestamp}
          y={[
            (d: EnergyDataPoint) => d.solar,
            (d: EnergyDataPoint) => d.battery,
            (d: EnergyDataPoint) => d.load,
            (d: EnergyDataPoint) => d.grid,
          ]}
          color={['var(--color-solar)', 'var(--color-battery)', 'var(--color-load)', 'var(--color-grid-import)']}
        />
        <VisAxis type="x" label={timeFormat === 'time' ? 'Time' : 'Date'} tickFormat={formatTime} />
        <VisAxis type="y" label="Power (kW)" />
        <VisCrosshair 
          template={(d: EnergyDataPoint) => `
            <div class="text-sm px-2 py-1">
              <strong class="text-foreground">${formatTime(d.timestamp)}</strong><br/>
              <span style="color: var(--color-solar)">Solar: ${d.solar} kW</span><br/>
              <span style="color: var(--color-battery)">Battery: ${d.battery} kW</span><br/>
              <span style="color: var(--color-load)">Load: ${d.load} kW</span><br/>
              <span style="color: var(--color-grid-import)">Grid: ${d.grid} kW</span>
            </div>
          `} 
        />
        <VisTooltip />
      </VisXYContainer>
    </div>
  );
}
