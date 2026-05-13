'use client';

import { useState, useEffect } from 'react';
import { useInView } from '../../../hooks/useInView';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 1800,
  decimals = 0,
  suffix = '',
  prefix = '',
  className,
}: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setCurrentValue(value * easeOut);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrentValue(value);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {currentValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}
