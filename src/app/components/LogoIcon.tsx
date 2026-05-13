'use client';

import { cn } from '../utils/cn';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 24 }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 95 52"
      width={size}
      height={size * 0.547}
      className={cn('fill-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#68c4a9" />
          <stop offset="49%" stopColor="#99d4bc" />
          <stop offset="100%" stopColor="#00676b" />
        </linearGradient>
      </defs>
      <polygon
        fill="url(#logo-gradient)"
        points="70.86 35.45 60.09 51.29 45.52 51.29 63.6 24.83 70.86 14.22 80.15 .61 94.57 .61 78.12 24.83 70.86 35.45"
      />
    </svg>
  );
}
