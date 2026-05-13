'use client';

import { Logo } from './Logo';
import { Spinner } from './Spinner';

export function InitialLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)',
            top: '20%',
            right: '20%',
            animationDuration: '3s'
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255,184,0,0.3) 0%, transparent 70%)',
            bottom: '20%',
            left: '20%',
            animationDelay: '1s',
            animationDuration: '3s'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with subtle pulse */}
        <div className="animate-pulse" style={{ animationDuration: '2s' }}>
          <Logo width={120} />
        </div>

        {/* Spinner */}
        <Spinner size="large" />

        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
          Initializing energy dashboard...
        </p>
      </div>
    </div>
  );
}
