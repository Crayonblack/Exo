'use client';

import { forwardRef, ReactNode } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MetricCardProps {
  label: string;
  value: ReactNode;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import';
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, unit, change, trend, icon, className, size = 'medium', color }, ref) => {
    const getTrendColor = () => {
      if (trend === 'up') return 'text-success';
      if (trend === 'down') return 'text-error';
      return 'text-muted-foreground';
    };

    const getTrendIcon = () => {
      if (trend === 'up') return <ArrowUp className="w-3 h-3" />;
      if (trend === 'down') return <ArrowDown className="w-3 h-3" />;
      return <Minus className="w-3 h-3" />;
    };

    const getGradientClass = () => {
      const gradients = {
        solar: 'from-solar/40 via-solar/5 to-transparent',
        battery: 'from-battery/40 via-battery/5 to-transparent',
        load: 'from-load/40 via-load/5 to-transparent',
        'grid-export': 'from-grid-export/40 via-grid-export/5 to-transparent',
        'grid-import': 'from-grid-import/40 via-grid-import/5 to-transparent',
      };
      return color ? gradients[color] : 'from-card/50 to-transparent';
    };

    const getIconColorClass = () => {
      const colors = {
        solar: 'text-solar',
        battery: 'text-battery',
        load: 'text-load',
        'grid-export': 'text-grid-export',
        'grid-import': 'text-grid-import',
      };
      return color ? colors[color] : 'text-muted-foreground';
    };

    const getGlowClass = () => {
      const glows = {
        solar: 'hover:shadow-solar-glow',
        battery: 'hover:shadow-battery-glow',
        load: 'hover:shadow-load-glow',
        'grid-export': 'hover:shadow-grid-export-glow',
        'grid-import': 'hover:shadow-grid-import-glow',
      };
      return color ? glows[color] : '';
    };

    const sizeClasses = {
      small: 'p-4 min-h-[140px]',
      medium: 'p-6 min-h-[180px]',
      large: 'p-8 min-h-[220px]',
    };

    const valueSizeClasses = {
      small: 'text-2xl sm:text-3xl',
      medium: 'text-3xl sm:text-4xl',
      large: 'text-4xl sm:text-6xl',
    };

    const backgroundIconSizeClasses = {
      small: 'w-24 h-24',
      medium: 'w-32 h-32',
      large: 'w-40 h-40',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'group rounded-xl border border-border/50 overflow-hidden relative',
          'bg-card bg-gradient-to-br backdrop-blur-md',
          'shadow-md',
          getGradientClass(),
          sizeClasses[size],
          'transition-all duration-500 ease-out',
          'hover:border-border hover:scale-[1.02] hover:-translate-y-1',
          'hover:shadow-xl',
          getGlowClass(),
          className
        )}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        </div>

        {icon && (
          <div
            className={cn(
              'absolute -right-6 -bottom-6 opacity-[0.25] group-hover:opacity-40',
              'transition-all duration-500 group-hover:scale-110',
              getIconColorClass(),
              backgroundIconSizeClasses[size],
              'filter drop-shadow-[0_0_20px_currentColor]'
            )}
            style={{ transform: 'rotate(-15deg)' }}
          >
            <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full pulse-glow">
              {icon}
            </div>
          </div>
        )}

        <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {label}
            </span>
            {color && (
              <div className={cn(
                'w-2 h-2 rounded-full',
                getIconColorClass(),
                'shadow-[0_0_8px_currentColor] animate-pulse'
              )} />
            )}
          </div>

          <div className="flex items-baseline gap-1 sm:gap-2 mt-auto mb-2">
            <span className={cn(
              'font-bold text-foreground leading-none',
              'bg-gradient-to-br from-white to-white/80 bg-clip-text',
              valueSizeClasses[size]
            )}>
              {value}
            </span>
            {unit && (
              <span className="text-base sm:text-lg text-muted-foreground/80 font-medium">{unit}</span>
            )}
          </div>

          {change !== undefined && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium mt-2',
              'px-2 py-1 rounded-md bg-black/20 backdrop-blur-sm w-fit',
              getTrendColor()
            )}>
              {getTrendIcon()}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';
