/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react';

function useEventListener<T extends HTMLElement = HTMLDivElement, CustomWindow = WindowEventMap>(
  eventName: keyof (CustomWindow extends WindowEventMap ? CustomWindow : WindowEventMap),
  handler: (event: Event) => void,
  element: T | Window | Document = window,
): void {
  const handlerCB = useRef(handler);

  useEffect(() => {
    handlerCB.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element?.addEventListener) return;

    element.addEventListener(eventName as string, handlerCB.current);

    return () => {
      element.removeEventListener(eventName as string, handlerCB.current);
    };
  }, [eventName, element]);
}

export default useEventListener;
