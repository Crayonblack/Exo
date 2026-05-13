import { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { useInView } from '../../../hooks/useInView';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'small' | 'default' | 'large';
  color?: 'solar' | 'battery' | 'load' | 'grid-export' | 'grid-import' | 'primary' | 'success' | 'info' | 'warning' | 'error';
  delay?: number;
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
    delay = 0,
    className
  }, forwardedRef) => {
    const targetPercentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const [percentage, setPercentage] = useState(0);
    const { ref: inViewRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

    useEffect(() => {
      if (!isInView) return;
      const timer = setTimeout(() => {
        setPercentage(targetPercentage);
      }, delay);
      return () => clearTimeout(timer);
    }, [targetPercentage, delay, isInView]);

    const sizeClasses = {
      small: 'h-1',
      default: 'h-2',
      large: 'h-3',
    };

    const colorClasses = {
      solar: 'bg-gradient-to-r from-solar via-solar to-solar/80 shadow-solar-glow',
      battery: 'bg-gradient-to-r from-battery via-battery to-battery/80 shadow-battery-glow',
      load: 'bg-gradient-to-r from-load via-load to-load/80 shadow-load-glow',
      'grid-export': 'bg-gradient-to-r from-grid-export via-grid-export to-grid-export/80 shadow-grid-export-glow',
      'grid-import': 'bg-gradient-to-r from-grid-import via-grid-import to-grid-import/80 shadow-grid-import-glow',
      primary: 'bg-gradient-to-r from-primary via-primary to-primary/80 shadow-primary-glow',
      success: 'bg-gradient-to-r from-success via-success to-success/80 shadow-primary-glow',
      info: 'bg-gradient-to-r from-info via-info to-info/80 shadow-grid-import-glow',
      warning: 'bg-gradient-to-r from-warning via-warning to-warning/80 shadow-battery-glow',
      error: 'bg-gradient-to-r from-error via-error to-error/80 shadow-primary-glow',
    };

    return (
      <div 
        ref={(node) => {
          inViewRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }} 
        className={cn('w-full', className)}
      >
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
              'h-full transition-all duration-[1500ms] ease-out rounded-full relative overflow-hidden',
              colorClasses[color]
            )}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
