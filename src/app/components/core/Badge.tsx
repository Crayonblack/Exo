import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-300 backdrop-blur-sm',
  {
    variants: {
      variant: {
        success: 'bg-success/15 text-success border border-success/30 dark:shadow-[0_0_10px_rgba(16,185,129,0.2)] shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_0_16px_rgba(16,185,129,0.3)] hover:shadow-[0_0_16px_rgba(16,185,129,0.6)] hover:border-success/50',
        warning: 'bg-warning/15 text-warning border border-warning/30 dark:shadow-[0_0_10px_rgba(245,158,11,0.2)] shadow-[0_0_10px_rgba(230,138,0,0.4)] dark:hover:shadow-[0_0_16px_rgba(245,158,11,0.3)] hover:shadow-[0_0_16px_rgba(230,138,0,0.6)] hover:border-warning/50',
        error: 'bg-error/15 text-error border border-error/30 dark:shadow-[0_0_10px_rgba(239,68,68,0.2)] shadow-[0_0_10px_rgba(239,68,68,0.4)] dark:hover:shadow-[0_0_16px_rgba(239,68,68,0.3)] hover:shadow-[0_0_16px_rgba(239,68,68,0.6)] hover:border-error/50',
        info: 'bg-info/15 text-info border border-info/30 dark:shadow-[0_0_10px_rgba(0,229,255,0.2)] shadow-[0_0_10px_rgba(0,168,201,0.4)] dark:hover:shadow-[0_0_16px_rgba(0,229,255,0.3)] hover:shadow-[0_0_16px_rgba(0,168,201,0.6)] hover:border-info/50',
        neutral: 'bg-muted/50 text-muted-foreground border border-border/50 hover:border-border',
      },
      size: {
        small: 'text-xs px-2 py-0.5',
        default: 'text-sm px-2.5 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, showDot, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {showDot && (
          <span className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_6px_currentColor] animate-pulse" />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
