/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';

interface UseVisibilityListControl {
  toggleListVisibility: (index: number) => void;
  shownControl: Record<string, boolean>;
}

export function reduceToSingleObject<T>(objects: T[]): { [key in keyof T]: T[key] } {
  return objects.reduce((acc, next) => ({ ...acc, ...next }), {} as { [key in keyof T]: T[key] });
}

export function objectifyItemsAndAggregate<Item, value>(
  items: Item[],
  mapFn: (item: Item, index: number, array?: Item[]) => Record<string, value>,
): Record<string, value> {
  const mappedItems = items.map(mapFn);
  const aggregated = reduceToSingleObject(mappedItems);

  return aggregated;
}

export function useVisibilityListControl(entities: any[]): UseVisibilityListControl {
  const [shownControl, setShownControl] = useState(() => {
    const indexControl = objectifyItemsAndAggregate(entities, (_, index) => ({
      [index]: false,
    }));

    return indexControl;
  });

  useEffect(() => {
    setShownControl((oldControl) => {
      const indexControl = objectifyItemsAndAggregate(entities, (_, index) => ({
        [index]: oldControl[index] || false,
      }));

      return indexControl;
    });
  }, [entities]);

  const toggleListVisibility = useCallback((index) => {
    setShownControl((oldControl) => ({
      ...oldControl,
      [index]: !oldControl[index],
    }));
  }, []);

  return {
    toggleListVisibility,
    shownControl,
  };
}
