import { useState, useCallback, Dispatch, SetStateAction } from 'react';

interface UseToggle {
  isOn: boolean;
  toggle: () => void;
  turnOn: () => void;
  turnOff: () => void;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}

export function useToggle(defaultState = false): UseToggle {
  const [isOn, setIsOn] = useState(defaultState);

  const toggle = useCallback(() => setIsOn((pastVisibility) => !pastVisibility), []);

  const turnOn = useCallback(() => setIsOn(true), []);

  const turnOff = useCallback(() => setIsOn(false), []);

  return {
    isOn,
    toggle,
    setIsOn,
    turnOn,
    turnOff,
  };
}
