'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 80, height }: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ width, height: height || (width * 0.367) }} />;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === 'dark';

  return (
    <svg
      viewBox="0 0 141.1 51.8"
      width={width}
      height={height || (width * 0.367)}
      className={cn('object-contain', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="45.52" y1="25.95" x2="94.57" y2="25.95">
          <stop offset="0" stopColor="#68c4a9" />
          <stop offset=".49" stopColor="#99d4bc" />
          <stop offset="1" stopColor="#00676b" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <path
            fill={isDark ? '#e6e7e8' : '#333132'}
            d="M0,25.9C0,18.45,2.37,12.36,7.11,7.62S17.94,.51,25.39,.51s13.37,2.37,17.77,7.11c4.4,4.74,6.6,10.83,6.6,18.28v5.08H14.73c.34,2.71,1.52,4.82,3.55,6.35s4.4,2.29,7.11,2.29c4.74,0,8.97-1.35,12.7-4.06l8.12,8.12c-3.72,5.08-10.66,7.62-20.82,7.62-7.45,0-13.54-2.37-18.28-7.11C2.37,39.44,0,33.35,0,25.9ZM32.5,14.47c-2.03-1.52-4.4-2.29-7.11-2.29s-5.08,.76-7.11,2.29-3.05,3.64-3.05,6.35h20.31c0-2.71-1.02-4.82-3.05-6.35Z"
          />
          <path
            fill={isDark ? '#e6e7e8' : '#333132'}
            d="M79.69,27.12l16.51,24.16h-14.57l-9.2-13.54m-10.42-15.26L47.14,.61h14.42l7.8,11.42-7.36,10.46Z"
          />
          <path
            fill={isDark ? '#e6e7e8' : '#333132'}
            d="M96.72,44.36c-4.94-4.96-7.41-11.11-7.41-18.46s2.47-13.54,7.41-18.48S107.82,0,115.2,0s13.54,2.47,18.48,7.41c4.94,4.94,7.41,11.1,7.41,18.48s-2.47,13.54-7.41,18.48-11.1,7.41-18.48,7.41-13.54-2.48-18.48-7.44Zm18.43-4.85c3.86,0,6.99-1.29,9.39-3.88,2.4-2.59,3.61-5.81,3.61-9.67s-1.2-7.09-3.61-9.7c-2.4-2.61-5.55-3.91-9.45-3.91s-6.94,1.3-9.34,3.91c-2.4,2.61-3.61,5.84-3.61,9.7s1.2,7.08,3.61,9.67c2.4,2.59,5.54,3.88,9.39,3.88Z"
          />
        </g>
      </g>
      <g>
        <polygon
          fill="url(#logo-gradient)"
          points="70.86 35.45 60.09 51.29 45.52 51.29 63.6 24.83 70.86 14.22 80.15 .61 94.57 .61 78.12 24.83 70.86 35.45"
        />
      </g>
    </svg>
  );
}
