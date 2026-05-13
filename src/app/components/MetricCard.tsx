'use client';

import { forwardRef, ReactNode } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '../utils/cn';

export interface MetricCardProps {
  label: string;
  value: string | number;
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
        solar: 'from-[rgba(0,229,255,0.25)] via-[rgba(0,229,255,0.15)] to-[rgba(0,229,255,0.05)]',
        battery: 'from-[rgba(255,184,0,0.25)] via-[rgba(255,184,0,0.15)] to-[rgba(255,184,0,0.05)]',
        load: 'from-[rgba(139,92,246,0.25)] via-[rgba(139,92,246,0.15)] to-[rgba(139,92,246,0.05)]',
        'grid-export': 'from-[rgba(16,185,129,0.25)] via-[rgba(16,185,129,0.15)] to-[rgba(16,185,129,0.05)]',
        'grid-import': 'from-[rgba(59,130,246,0.25)] via-[rgba(59,130,246,0.15)] to-[rgba(59,130,246,0.05)]',
      };
      return color ? gradients[color] : 'from-card to-card';
    };

    const getIconColorClass = () => {
      const colors = {
        solar: 'text-data-solar',
        battery: 'text-data-battery',
        load: 'text-data-load',
        'grid-export': 'text-data-grid-export',
        'grid-import': 'text-data-grid-import',
      };
      return color ? colors[color] : 'text-muted-foreground';
    };

    const getGlowClass = () => {
      const glows = {
        solar: 'dark:hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,168,201,0.6)]',
        battery: 'dark:hover:shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_30px_rgba(230,138,0,0.6)]',
        load: 'dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(91,101,112,0.6)]',
        'grid-export': 'dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(14,159,110,0.6)]',
        'grid-import': 'dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(48,115,214,0.6)]',
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
          'bg-gradient-to-br backdrop-blur-sm',
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
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        </div>

        {/* Large Background Icon with glow */}
        {icon && (
          <div
            className={cn(
              'absolute -right-6 -bottom-6 opacity-[0.15] group-hover:opacity-25',
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

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {label}
            </span>
            {/* Small indicator dot */}
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
