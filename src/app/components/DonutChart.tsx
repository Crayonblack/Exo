'use client';

import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/react';
import { Card } from './Card';
import { cn } from '../utils/cn';

export interface DonutDataItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutDataItem[];
  className?: string;
  size?: number;
  title?: string;
  showValue?: boolean;
}

export function DonutChart({
  data,
  className,
  size = 200,
  title,
  showValue = true
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="font-semibold mb-6 text-base">{title}</h3>}
      <div className="flex flex-col items-center">
        <VisSingleContainer data={data} height={size}>
          <VisDonut
            value={(d: DonutDataItem) => d.value}
            color={(d: DonutDataItem) => d.color}
            arcWidth={40}
            showBackground
            backgroundArcWidth={40}
          />
          <VisTooltip />
        </VisSingleContainer>
        {showValue && (
          <div className="mt-6 w-full space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-muted-foreground">
                  {item.value.toFixed(1)} kW
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
