import { useState, useEffect } from 'react';

export function useDelayedLoader<T>(value: T): T {
  const [delayedLoader, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return (): void => {
      clearTimeout(timer);
    };
  }, [value]);

  return delayedLoader;
}
