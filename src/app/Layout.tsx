import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { SideNav } from './components/layout/SideNav';
import { BottomNav } from './components/layout/BottomNav';
import { Header } from './components/layout/Header';
import { Logo } from './components/core/Logo';
import { cn } from './utils/cn';

const routeToNavItem: Record<string, string> = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/usage': 'Usage',
  '/alerts': 'Alerts',
  '/settings': 'Settings',
  '/system-health': 'System',
};

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Energy Dashboard', subtitle: 'Real-time monitoring and analytics' },
  '/analytics': { title: 'Analytics', subtitle: 'Deep insights and trends' },
  '/usage': { title: 'Usage', subtitle: 'Consumption breakdown and devices' },
  '/alerts': { title: 'Alerts', subtitle: 'System notifications and warnings' },
  '/settings': { title: 'Settings', subtitle: 'Account and system configuration' },
  '/system-health': { title: 'System Health', subtitle: 'Hardware monitoring and diagnostics' },
};

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const activeNav = routeToNavItem[location.pathname] || 'Dashboard';
  const pageInfo = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl float-animation"
            style={{
              background: 'radial-gradient(circle, var(--data-solar-glow) 0%, transparent 70%)',
              top: '10%',
              right: '10%',
              animationDelay: '0s',
              animationDuration: '8s'
            }}
          />

          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl float-animation"
            style={{
              background: 'radial-gradient(circle, var(--data-battery-glow) 0%, transparent 70%)',
              bottom: '20%',
              left: '15%',
              animationDelay: '2s',
              animationDuration: '10s'
            }}
          />

          <div
            className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-3xl float-animation"
            style={{
              background: 'radial-gradient(circle, var(--data-load-glow) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: '4s',
              animationDuration: '12s'
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        <div className="hidden lg:flex h-screen relative z-10">
          <SideNav 
            activeItem={activeNav} 
            isCollapsed={isSidebarCollapsed} 
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          />

          <div className="flex-1 overflow-auto transition-all duration-300 ease-out">
            <div className={cn(
              "p-4 sm:p-6 lg:p-8 mx-auto transition-all duration-300 ease-out",
              isSidebarCollapsed ? "max-w-[1800px]" : "max-w-[1400px]"
            )}>
              <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />
              <Outlet />
            </div>
          </div>
        </div>

        <div className="lg:hidden min-h-screen pb-24 relative z-10">
          <div className="fixed top-0 right-0 z-50 mr-3">
            <div className="relative">
              <div className="glass-effect border border-border/50 rounded-bl-2xl rounded-br-lg rounded-tr-lg px-3 py-2 shadow-lg">
                <Logo width={60} />
              </div>
              <div className="absolute -top-1 right-3 w-2 h-2 rounded-full bg-background border border-border/50" />
            </div>
          </div>
          <div className="px-4 pt-4 pb-8">
            <Header title={pageInfo.title} subtitle={pageInfo.subtitle} className="mb-4" />
            <Outlet />
          </div>
          <BottomNav activeItem={activeNav} />
        </div>
      </div>
    </ThemeProvider>
  );
}
