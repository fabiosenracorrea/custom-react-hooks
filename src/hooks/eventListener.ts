/* eslint-disable consistent-return */
import { RefObject, useEffect, useRef } from 'react';

function useEventListener<T extends HTMLElement = HTMLDivElement, CustomWindow = WindowEventMap>(
  eventName: keyof (CustomWindow extends WindowEventMap ? CustomWindow : WindowEventMap),
  handler: (event: Event) => void,
  element: RefObject<T | Window> = { current: window },
): void {
  const handlerCB = useRef(handler);

  useEffect(() => {
    handlerCB.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element.current;

    if (!targetElement?.addEventListener) return;

    targetElement.addEventListener(eventName as string, handlerCB.current);

    return () => {
      targetElement.removeEventListener(eventName as string, handlerCB.current);
    };
  }, [eventName, element]);
}

export default useEventListener;
