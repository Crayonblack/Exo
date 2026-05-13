'use client';

import { VisXYContainer, VisLine, VisArea, VisAxis, VisTooltip, VisCrosshair } from '@unovis/react';
import { Card } from './Card';
import { cn } from '../utils/cn';

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
}

export function EnergyFlowChart({
  data,
  className,
  height = 300,
  type = 'area'
}: EnergyFlowChartProps) {
  const ChartComponent = type === 'area' ? VisArea : VisLine;

  return (
    <Card className={cn('p-6', className)}>
      <VisXYContainer data={data} height={height}>
        <ChartComponent
          x={(d: EnergyDataPoint) => d.timestamp}
          y={[
            (d: EnergyDataPoint) => d.solar,
            (d: EnergyDataPoint) => d.battery,
            (d: EnergyDataPoint) => d.load,
            (d: EnergyDataPoint) => d.grid,
          ]}
          color={['#00D9FF', '#FF6B9D', '#A855F7', '#F59E0B']}
        />
        <VisAxis type="x" label="Time" />
        <VisAxis type="y" label="Power (kW)" />
        <VisCrosshair />
        <VisTooltip />
      </VisXYContainer>
    </Card>
  );
}
