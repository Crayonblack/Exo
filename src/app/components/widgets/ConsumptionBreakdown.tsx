'use client';

import { Card } from '../core/Card';
import { ProgressBar } from '../core/ProgressBar';
import { AnimatedNumber } from '../core/AnimatedNumber';
import { cn } from '../../utils/cn';
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
    solar: 'text-solar',
    battery: 'text-battery',
    load: 'text-load',
    'grid-export': 'text-grid-export',
    'grid-import': 'text-grid-import',
  };
  return colors[color];
};

export function ConsumptionBreakdown({ title, items, className }: ConsumptionBreakdownProps) {
  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <h3 className="font-semibold mb-4 sm:mb-6 text-base">{title}</h3>
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, index) => (
          <div key={item.name} className="flex items-center gap-3 sm:gap-4">
            {item.icon && (
              <div className={cn('w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0 [&>svg]:w-full [&>svg]:h-full', getColorClass(item.color))}>
                {item.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground font-medium"><AnimatedNumber value={item.percentage} suffix="%" /></span>
              </div>
              <ProgressBar
                value={item.percentage}
                max={100}
                size="default"
                color={item.color}
                delay={index * 150}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span><AnimatedNumber value={item.value} decimals={1} suffix=" kW" /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
