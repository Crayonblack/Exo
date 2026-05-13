'use client';

import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../utils/cn';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface BottomNavProps {
  className?: string;
  activeItem?: string;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  { icon: <Activity className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Usage', path: '/usage' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
];

export const BottomNav = forwardRef<HTMLDivElement, BottomNavProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'flex items-center justify-center gap-2',
          'glass-effect border-t border-border/50',
          'px-3 py-2.5 safe-area-inset-bottom',
          'shadow-[0_-4px_24px_rgba(0,0,0,0.4)]',
          className
        )}
      >
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Navigation Items */}
        <div className="flex items-center justify-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'group flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl min-w-[52px] relative',
                'transition-all duration-300 ease-out',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary/80'
              )}
            >
              {({ isActive }) => (
                <>
                  {/* Active background glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl blur-md animate-pulse" />
                  )}

                  <div className={cn(
                    'relative transition-all duration-300',
                    isActive && 'drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] scale-110',
                    !isActive && 'group-hover:drop-shadow-[0_0_6px_rgba(0,229,255,0.4)] group-hover:scale-105'
                  )}>
                    {item.icon}
                  </div>

                  <span className={cn(
                    'text-[10px] font-medium relative z-10 transition-all duration-300',
                    isActive && 'font-semibold'
                  )}>
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)] animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="absolute right-3">
          <ThemeToggle />
        </div>
      </div>
    );
  }
);

BottomNav.displayName = 'BottomNav';
