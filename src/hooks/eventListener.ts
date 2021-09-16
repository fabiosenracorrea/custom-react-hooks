/* eslint-disable consistent-return */
import { RefObject, useEffect } from 'react';

function useEventListener<T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap,
  handler: (event: Event) => void,
  element: RefObject<T | Window> = { current: window },
): void {
  useEffect(() => {
    const targetElement = element.current;

    if (!targetElement?.addEventListener) return;

    targetElement.addEventListener(eventName, handler);

    return () => {
      targetElement.removeEventListener(eventName, handler);
    };
  }, [eventName, element, handler]);
}

export default useEventListener;
