'use client';

import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rectangular';
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-muted/50',
          variant === 'circular' && 'rounded-full',
          variant === 'rectangular' && 'rounded-lg',
          variant === 'default' && 'rounded-md',
          className
        )}
        aria-hidden="true"
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Preset skeleton components for common patterns
export function SkeletonMetricCard({ className }: { className?: string }) {
  return (
    <div className={cn('glass-effect rounded-xl border border-border p-6', className)}>
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard({ className, lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={cn('glass-effect rounded-xl border border-border p-6', className)}>
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - i * 10}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart({ className, height = 300 }: { className?: string; height?: number }) {
  return (
    <div className={cn('glass-effect rounded-xl border border-border p-6', className)}>
      <Skeleton className="h-6 w-48 mb-6" />
      <Skeleton className="w-full rounded-lg" style={{ height: `${height}px` }} />
    </div>
  );
}

export function SkeletonListItem({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 p-4 rounded-lg border border-border', className)}>
      <Skeleton variant="circular" className="w-10 h-10 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-9 w-20" />
    </div>
  );
}

export function SkeletonProgressItem({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Skeleton variant="circular" className="w-8 h-8 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function SkeletonStatGrid({ className, count = 4 }: { className?: string; count?: number }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonMetricCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTable({ className, rows = 5 }: { className?: string; rows?: number }) {
  return (
    <div className={cn('glass-effect rounded-xl border border-border p-6', className)}>
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    </div>
  );
}
