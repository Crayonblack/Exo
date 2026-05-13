import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'small' | 'default' | 'large';
  color?: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import' | 'primary';
  className?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    value,
    max = 100,
    label,
    showValue = false,
    size = 'default',
    color = 'primary',
    className
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      small: 'h-1',
      default: 'h-2',
      large: 'h-3',
    };

    const colorClasses = {
      solar: 'bg-gradient-to-r from-data-solar via-data-solar to-data-solar/80 dark:shadow-[0_0_12px_rgba(0,229,255,0.4)] shadow-[0_0_12px_rgba(0,168,201,0.6)]',
      battery: 'bg-gradient-to-r from-data-battery via-data-battery to-data-battery/80 dark:shadow-[0_0_12px_rgba(255,184,0,0.4)] shadow-[0_0_12px_rgba(230,138,0,0.6)]',
      load: 'bg-gradient-to-r from-data-load via-data-load to-data-load/80 dark:shadow-[0_0_12px_rgba(139,92,246,0.4)] shadow-[0_0_12px_rgba(91,101,112,0.6)]',
      'grid-export': 'bg-gradient-to-r from-data-grid-export via-data-grid-export to-data-grid-export/80 dark:shadow-[0_0_12px_rgba(16,185,129,0.4)] shadow-[0_0_12px_rgba(14,159,110,0.6)]',
      'grid-import': 'bg-gradient-to-r from-data-grid-import via-data-grid-import to-data-grid-import/80 dark:shadow-[0_0_12px_rgba(59,130,246,0.4)] shadow-[0_0_12px_rgba(48,115,214,0.6)]',
      primary: 'bg-gradient-to-r from-primary via-primary to-primary/80 dark:shadow-[0_0_12px_rgba(0,229,255,0.4)] shadow-[0_0_12px_rgba(0,168,201,0.6)]',
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-2 text-sm">
            {label && <span className="text-foreground">{label}</span>}
            {showValue && (
              <span className="text-muted-foreground font-medium">
                {value} / {max}
              </span>
            )}
          </div>
        )}
        <div className={cn(
          'w-full bg-secondary/30 rounded-full overflow-hidden backdrop-blur-sm border border-border/30',
          sizeClasses[size]
        )}>
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden',
              colorClasses[color]
            )}
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
