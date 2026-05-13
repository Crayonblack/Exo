'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useId } from 'react';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 80, height }: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const id = useId();

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return <div style={{ width, height: height || (width * 0.367) }} />;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === 'dark';
  const gradientId = `logo-gradient-${id}`;
  const clipId = `logo-clip-${id}`;

  return (
    <svg
      width={width}
      height={height || (width * (23 / 60))}
      viewBox="0 0 60 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('object-contain', className)}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M0.013916 11.0084C0.013916 7.84189 1.02124 5.25344 3.0359 3.23878C5.05056 1.22412 7.63901 0.216797 10.8055 0.216797C13.972 0.216797 16.4882 1.22412 18.3583 3.23878C20.2285 5.25344 21.1635 7.84189 21.1635 11.0084V13.1675H6.27465C6.41916 14.3194 6.9207 15.2162 7.78352 15.8665C8.64633 16.5168 9.65366 16.8398 10.8055 16.8398C12.8202 16.8398 14.618 16.266 16.2034 15.1142L19.6547 18.5655C18.0736 20.7246 15.1238 21.8042 10.8055 21.8042C7.63901 21.8042 5.05056 20.7969 3.0359 18.7822C1.02124 16.7633 0.013916 14.1749 0.013916 11.0084ZM13.8275 6.15026C12.9647 5.50421 11.9573 5.17693 10.8055 5.17693C9.65366 5.17693 8.64633 5.49995 7.78352 6.15026C6.9207 6.80056 6.48717 7.69737 6.48717 8.84921H15.1196C15.1196 7.69737 14.6861 6.80056 13.8232 6.15026H13.8275Z"
          fill={isDark ? '#F8F8F8' : '#333132'}
        />
        <path
          d="M33.8849 11.5269L40.9022 21.7957H34.7094L30.7991 16.0407M26.3703 9.55475L20.05 0.259277H26.179L29.4943 5.11315L26.366 9.559L26.3703 9.55475Z"
          fill={isDark ? '#F8F8F8' : '#333132'}
        />
        <path
          d="M41.1231 18.8545C39.0235 16.7463 37.9736 14.1323 37.9736 11.0084C37.9736 7.88436 39.0235 5.25341 41.1231 3.15374C43.2228 1.05408 45.841 0 48.9777 0C52.1145 0 54.7327 1.04983 56.8323 3.14949C58.932 5.24916 59.9818 7.86736 59.9818 11.0041C59.9818 14.1408 58.932 16.759 56.8323 18.8587C54.7327 20.9584 52.1145 22.0082 48.9777 22.0082C45.841 22.0082 43.2228 20.9541 41.1231 18.846V18.8545ZM48.9565 16.793C50.5971 16.793 51.9275 16.2448 52.9475 15.1439C53.9676 14.0431 54.4819 12.6745 54.4819 11.0339C54.4819 9.39322 53.9719 8.02037 52.9475 6.91103C51.9275 5.8017 50.5886 5.24916 48.931 5.24916C47.2734 5.24916 45.9813 5.8017 44.9612 6.91103C43.9411 8.02037 43.4268 9.39322 43.4268 11.0339C43.4268 12.6745 43.9368 14.0431 44.9612 15.1439C45.9813 16.2448 47.3159 16.793 48.9522 16.793H48.9565Z"
          fill={isDark ? '#F8F8F8' : '#333132'}
        />
        <path
          d="M30.1317 15.0674L25.5541 21.7999H19.3613L27.0459 10.5536L30.1317 6.04397L34.0802 0.259277H40.2092L33.2174 10.5536L30.1317 15.0674Z"
          fill={`url(#${gradientId})`}
        />
      </g>
      <defs>
        <linearGradient id={gradientId} x1="968.356" y1="559.239" x2="1990.94" y2="559.239" gradientUnits="userSpaceOnUse">
          <stop stopColor="#68C4A9" />
          <stop offset="0.49" stopColor="#99D4BC" />
          <stop offset="1" stopColor="#00676B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
