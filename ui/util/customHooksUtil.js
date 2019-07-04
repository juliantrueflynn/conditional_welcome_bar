import { useState, useEffect } from 'react';

export const useDelayedLoader = (value) => {
  const [delayedLoader, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return delayedLoader;
};
