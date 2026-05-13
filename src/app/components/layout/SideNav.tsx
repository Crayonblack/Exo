'use client';

import { forwardRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, Activity, AlertCircle, HeartPulse, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Logo } from '../core/Logo';
import { cn } from '../../utils/cn';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SideNavProps {
  className?: string;
  activeItem?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  { icon: <Activity className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Usage', path: '/usage' },
  { icon: <AlertCircle className="w-5 h-5" />, label: 'Alerts', path: '/alerts' },
  { icon: <HeartPulse className="w-5 h-5" />, label: 'System', path: '/system-health' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
];

export const SideNav = forwardRef<HTMLDivElement, SideNavProps>(
  ({ className, isCollapsed, onToggleCollapse }, ref) => {

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1 h-screen relative transition-all duration-300 ease-out',
          'bg-gradient-to-b from-sidebar via-sidebar to-background-elevated',
          'border-r border-sidebar-border/50 backdrop-blur-xl',
          'p-4',
          isCollapsed ? 'w-20' : 'w-64',
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className={cn(
          'py-4 mb-6 relative z-10',
          isCollapsed ? 'flex justify-center' : 'px-3 flex items-center justify-between gap-2'
        )}>
          <div className={cn(
            'transition-all duration-100',
            isCollapsed ? 'opacity-0 w-0 absolute' : 'opacity-100 w-auto'
          )}>
            <Logo width={90} />
          </div>
          <button
            onClick={onToggleCollapse}
            className={cn(
              'group flex items-center justify-center rounded-lg flex-shrink-0 cursor-pointer',
              'transition-all duration-300 ease-out relative overflow-hidden',
              'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-primary/90',
              'dark:hover:shadow-[0_0_16px_rgba(0,229,255,0.2)] hover:shadow-[0_0_16px_rgba(0,168,201,0.4)]',
              'border border-transparent hover:border-primary/30',
              'w-9 h-9'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 relative z-10" />
            ) : (
              <PanelLeftClose className="w-5 h-5 relative z-10" />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-1 relative z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'group flex rounded-lg text-sm font-medium',
                'transition-all duration-300 ease-out relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 via-primary/10 to-transparent text-primary dark:shadow-[0_0_20px_rgba(0,229,255,0.2)] shadow-[0_0_20px_rgba(0,168,201,0.4)] border border-primary/30'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-primary/90 hover:shadow-md border border-transparent',
                isCollapsed ? 'w-9 h-9 items-center justify-center mx-auto' : 'items-center gap-3 px-3 py-2.5'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  {isActive && !isCollapsed && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse" />
                  )}
                  <div className={cn(
                    'transition-all duration-300 flex-shrink-0',
                    isActive && 'drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]',
                    !isActive && 'group-hover:drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]'
                  )}>
                    {item.icon}
                  </div>
                  <span className={cn(
                    'relative z-10 transition-all duration-300 whitespace-nowrap',
                    isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                  )}>
                    {item.label}
                  </span>

                  <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }
);

SideNav.displayName = 'SideNav';
