'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow = false, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'glass':
          return 'glass-effect dark:border-white/10 border-border/30';
        case 'elevated':
          return 'bg-card dark:shadow-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)]';
        case 'gradient':
          return 'bg-gradient-to-br from-card to-background backdrop-blur-sm';
        default:
          return 'bg-card';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-border overflow-hidden',
          'text-card-foreground transition-all duration-300',
          'dark:hover:border-border/60 hover:border-border/80 hover:shadow-md',
          getVariantClasses(),
          glow && 'dark:hover:shadow-primary/20 hover:shadow-primary/30',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
