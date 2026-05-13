'use client';

import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, BarChart3, HeartPulse, AlertCircle, Settings } from 'lucide-react';
import { ThemeToggle } from '../layout/ThemeToggle';
import { cn } from '../../utils/cn';

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
  { icon: <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Dashboard', path: '/' },
  { icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Analytics', path: '/analytics' },
  { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Usage', path: '/usage' },
  { icon: <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'System', path: '/system-health' },
  { icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Alerts', path: '/alerts' },
  { icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Settings', path: '/settings' },
];

export const BottomNav = forwardRef<HTMLDivElement, BottomNavProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'flex',
          'bg-card shadow-[0_-4px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)]',
          'h-[72px] sm:h-[80px]',
          className
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="flex-1 flex items-center justify-around px-2 sm:px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'group flex flex-col items-center justify-center h-full relative px-1 sm:px-2 min-w-[50px] sm:min-w-[64px]',
                'transition-colors duration-300 ease-out',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg scale-75" />
                  )}

                  <div className={cn(
                    'relative mt-1 mb-1 transition-transform duration-300',
                    isActive ? 'scale-110 drop-shadow-primary-glow' : 'group-hover:scale-105'
                  )}>
                    {isActive && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-primary-glow" />
                    )}
                    {item.icon}
                  </div>

                  <span className={cn(
                    'text-[10px] sm:text-xs font-medium relative z-10 transition-colors',
                    isActive ? 'font-semibold' : ''
                  )}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {}
        <div className="w-[60px] sm:w-[80px] h-full bg-foreground/5 dark:bg-foreground/10 border-l border-border/50 flex items-center justify-center flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    );
  }
);

BottomNav.displayName = 'BottomNav';
