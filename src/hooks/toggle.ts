import { useState, useCallback, Dispatch, SetStateAction } from 'react';

interface UseToggle {
  isOn: boolean;
  toggle: () => void;
  turnOn: () => void;
  turnOf: () => void;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}

export function useToggle(defaultState = false): UseToggle {
  const [isOn, setIsOn] = useState(defaultState);

  const toggle = useCallback(() => setIsOn((pastVisibility) => !pastVisibility), []);

  const turnOn = useCallback(() => setIsOn(true), []);

  const turnOf = useCallback(() => setIsOn(false), []);

  return {
    isOn,
    toggle,
    setIsOn,
    turnOn,
    turnOf,
  };
}
