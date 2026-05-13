import { useState, useEffect, useRef } from 'react';

export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []); 

  return { ref, isInView };
}
