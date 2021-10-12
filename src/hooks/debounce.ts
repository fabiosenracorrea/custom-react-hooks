import { useEffect, useRef, useState } from 'react';

const HALF_SECOND_IN_MIL_SECONDS = 500;

function useDebounce<T>(value: T, delay: number = HALF_SECOND_IN_MIL_SECONDS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);

      timerRef.current = null;
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
