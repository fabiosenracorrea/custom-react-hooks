import { MutableRefObject, useCallback } from 'react';
import useEventListener from './eventListener';

export function useClickOutside<RefElement extends HTMLElement = HTMLDivElement>(
  ref: MutableRefObject<RefElement>,
  callback: (event: Event | null) => void,
): void {
  const listenerCallback = useCallback(
    (event: Event) => {
      const { current } = ref;

      if (!current || current.contains(event.target as Node)) return;

      callback(event);
    },
    [callback, ref],
  );

  useEventListener('click', listenerCallback, document);
}
