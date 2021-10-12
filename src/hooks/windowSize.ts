import { useState } from 'react';
import useEventListener from './eventListener';

interface UseWindowSize {
  height: number;
  width: number;
}

export function useWindowSize(): UseWindowSize {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener('resize', () =>
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    }),
  );

  return windowSize;
}
