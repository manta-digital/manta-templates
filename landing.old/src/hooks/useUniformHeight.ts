import { useState, useEffect } from 'react';

/**
 * Hook to enforce uniform height among children of a container using ResizeObserver.
 * @param containerRef - ref to the parent element containing slides
 * @param deps - dependencies to re-run the effect (e.g., children array, visibleCount)
 * @returns the maximum height of the observed children, or undefined
 */
export function useUniformHeight<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  deps: unknown[] = []
): number | undefined {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    const items = Array.from(containerRef.current.children) as HTMLElement[];
    if (items.length === 0) return;

    const updateHeight = () => {
      const max = Math.max(...items.map(item => item.offsetHeight));
      setHeight(max);
    };

    updateHeight();
    const observers = items.map(item => {
      const obs = new ResizeObserver(updateHeight);
      obs.observe(item);
      return obs;
    });
    return () => observers.forEach(obs => obs.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);

  return height;
}
