import { useState, Dispatch, SetStateAction } from 'react';

interface HookProps<DataType> {
  key: string;
  initialState: DataType;
  storageType?: 'localStorage' | 'sessionStorage';
}

type StorageState<Type> = [Type, Dispatch<SetStateAction<Type>>];

export function usePersistentState<Type>({
  initialState,
  key,
  storageType = 'localStorage',
}: HookProps<Type>): StorageState<Type> {
  const actualWindow = window || {};

  const [state, setState] = useState<Type>(() => {
    let oldState;

    try {
      oldState = actualWindow[storageType]?.getItem(key);
    } catch {} // eslint-disable-line

    if (!oldState) return initialState;

    const savedState = JSON.parse(oldState);

    return savedState;
  });

  const saveState = (newStateAction: SetStateAction<Type>): void => {
    const stateFunction =
      typeof newStateAction === 'function' && (newStateAction as (t: Type) => Type);

    const newState = stateFunction ? stateFunction(state) : (newStateAction as Type);

    setState(newState);

    try {
      actualWindow[storageType]?.setItem(key, JSON.stringify(newState));
    } catch {} // eslint-disable-line
  };

  return [state, saveState];
}
