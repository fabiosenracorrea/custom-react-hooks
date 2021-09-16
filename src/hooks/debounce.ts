import { useEffect, useState } from 'react';

const HALF_SECOND_IN_MIL_SECONDS = 500;

function useDebounce<T>(value: T, delay: number = HALF_SECOND_IN_MIL_SECONDS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
