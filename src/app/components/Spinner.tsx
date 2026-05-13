'use client';

import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeClasses = {
  small: 'w-4 h-4 border-2',
  medium: 'w-8 h-8 border-2',
  large: 'w-12 h-12 border-3',
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'medium', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-block rounded-full border-primary/30 border-t-primary animate-spin',
          'dark:shadow-[0_0_20px_rgba(0,229,255,0.4)] shadow-[0_0_20px_rgba(0,168,201,0.6)]',
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
