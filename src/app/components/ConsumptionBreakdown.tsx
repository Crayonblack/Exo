'use client';

import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { cn } from '../utils/cn';
import { ReactNode } from 'react';

interface ConsumptionItem {
  name: string;
  value: number;
  percentage: number;
  color: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import';
  icon?: ReactNode;
}

interface ConsumptionBreakdownProps {
  title: string;
  items: ConsumptionItem[];
  className?: string;
}

const getColorClass = (color: ConsumptionItem['color']) => {
  const colors = {
    solar: 'text-data-solar',
    battery: 'text-data-battery',
    load: 'text-data-load',
    'grid-export': 'text-data-grid-export',
    'grid-import': 'text-data-grid-import',
  };
  return colors[color];
};

export function ConsumptionBreakdown({ title, items, className }: ConsumptionBreakdownProps) {
  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <h3 className="font-semibold mb-4 sm:mb-6 text-base">{title}</h3>
      <div className="space-y-3 sm:space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 sm:gap-4">
            {item.icon && (
              <div className={cn('w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0 [&>svg]:w-full [&>svg]:h-full', getColorClass(item.color))}>
                {item.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground font-medium">{item.percentage}%</span>
              </div>
              <ProgressBar
                value={item.percentage}
                max={100}
                size="default"
                color={item.color}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{item.value} kW</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
