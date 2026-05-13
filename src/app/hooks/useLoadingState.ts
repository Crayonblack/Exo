import { useState, useEffect } from 'react';

interface UseLoadingStateOptions {
  delay?: number;
  minDuration?: number;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { delay = 1000, minDuration = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, minDuration]);

  return isLoading;
}
