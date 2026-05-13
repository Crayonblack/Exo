'use client';

import { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface IconBackgroundProps {
  children: ReactNode;
  variant?: 'solar' | 'battery' | 'load' | 'grid' | 'default';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function IconBackground({
  children,
  variant = 'default',
  size = 'medium',
  className
}: IconBackgroundProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  const variantClasses = {
    solar: 'bg-data-solar/10 text-data-solar',
    battery: 'bg-data-battery/10 text-data-battery',
    load: 'bg-data-load/10 text-data-load',
    grid: 'bg-data-grid-import/10 text-data-grid-import',
    default: 'bg-muted text-muted-foreground',
  };

  return (
    <div
      className={cn(
        'rounded-lg flex items-center justify-center',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
