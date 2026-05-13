'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-md dark:hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:shadow-[0_0_24px_rgba(0,168,201,0.6)] hover:scale-[1.02] active:scale-[0.98]',
        secondary: 'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground border border-border/50 hover:border-border hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        ghost: 'hover:bg-accent/80 hover:text-accent-foreground border border-transparent hover:border-border/30 hover:shadow-sm',
        destructive: 'bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-md dark:hover:shadow-[0_0_24px_rgba(239,68,68,0.3)] hover:shadow-[0_0_24px_rgba(239,68,68,0.6)] hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        small: 'h-8 px-3 text-sm',
        medium: 'h-10 px-4',
        large: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
