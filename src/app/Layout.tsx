'use client';

import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { SideNav } from './components/SideNav';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { Logo } from './components/Logo';

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
  const location = useLocation();
  const activeNav = routeToNavItem[location.pathname] || 'Dashboard';
  const pageInfo = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Primary orb - cyan */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl float-animation"
            style={{
              background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)',
              top: '10%',
              right: '10%',
              animationDelay: '0s',
              animationDuration: '8s'
            }}
          />

          {/* Secondary orb - amber */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl float-animation"
            style={{
              background: 'radial-gradient(circle, rgba(255,184,0,0.3) 0%, transparent 70%)',
              bottom: '20%',
              left: '15%',
              animationDelay: '2s',
              animationDuration: '10s'
            }}
          />

          {/* Tertiary orb - purple */}
          <div
            className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-3xl float-animation"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: '4s',
              animationDuration: '12s'
            }}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-screen relative z-10">
          {/* Sidebar */}
          <SideNav activeItem={activeNav} />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8 max-w-[1600px] mx-auto">
              {/* Header */}
              <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />

              {/* Page Content */}
              <Outlet />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen pb-24 relative z-10">
          {/* Clothing Tag Logo */}
          <div className="fixed top-0 right-0 z-50 mr-3">
            <div className="relative">
              {/* Tag body */}
              <div className="glass-effect border border-border/50 rounded-bl-2xl rounded-br-lg rounded-tr-lg px-3 py-2 shadow-lg">
                <Logo width={60} />
              </div>
              {/* Tag notch/hole */}
              <div className="absolute -top-1 right-3 w-2 h-2 rounded-full bg-background border border-border/50" />
            </div>
          </div>

          <div className="px-4 pt-4 pb-8">
            {/* Mobile Header */}
            <Header title={pageInfo.title} subtitle={pageInfo.subtitle} className="mb-4" />

            {/* Page Content */}
            <Outlet />
          </div>

          {/* Bottom Navigation */}
          <BottomNav activeItem={activeNav} />
        </div>
      </div>
    </ThemeProvider>
  );
}
