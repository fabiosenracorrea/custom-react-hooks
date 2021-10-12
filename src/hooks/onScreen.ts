/* eslint-disable consistent-return */

import { useEffect, useState, RefObject } from 'react';

const FULL_BOTTOM = 0;

export function useOnScreen(ref: RefObject<Element>, rootMargin = FULL_BOTTOM): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const { current: element } = ref;

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: `${rootMargin}px`,
    });

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, rootMargin]);

  return isVisible;
}
