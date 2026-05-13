'use client';

import { ThemeToggle } from '../layout/ThemeToggle';
import { Logo } from '../core/Logo';
import { cn } from '../../utils/cn';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export function Header({
  title = 'Energy Dashboard',
  subtitle = 'Real-time monitoring and analytics',
  showLogo = false,
  className
}: HeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 relative', className)}>
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold mb-0.5 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text truncate lg:text-2xl">
          {title}
        </h1>
        <p className="text-muted-foreground text-xs flex items-center gap-2 lg:text-sm lg:mb-4">
          <span className="truncate">{subtitle}</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse shadow-primary-glow flex-shrink-0" />
        </p>
      </div>
      <div className="flex-shrink-0 lg:block hidden">
        <ThemeToggle />
      </div>
    </div>
  );
}
