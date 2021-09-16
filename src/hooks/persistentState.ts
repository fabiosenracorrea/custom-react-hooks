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
  const [state, setState] = useState<Type>(() => {
    const oldState = window[storageType].getItem(key);

    if (!oldState) return initialState;

    const savedState = JSON.parse(oldState);

    return savedState;
  });

  const saveState = (newStateAction: SetStateAction<Type>): void => {
    const stateFunction =
      typeof newStateAction === 'function' && (newStateAction as (t: Type) => Type);

    const newState = stateFunction ? stateFunction(state) : (newStateAction as Type);

    setState(newState);

    window[storageType].setItem(key, JSON.stringify(newState));
  };

  return [state, saveState];
}
