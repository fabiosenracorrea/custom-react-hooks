/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';

export interface ValueParserResult {
  canUpdate: boolean;
  valueToUpdate: any;
}

export type CustomInputParsers<Entity> = {
  [key in keyof Partial<Entity>]: (value: string) => ValueParserResult;
};

export type InputValueUpdater = (
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
) => void;

interface UseFormControl<FormValues extends Record<string, any>> {
  inputValues: FormValues;
  updateInputValues: InputValueUpdater;
  setInputValues: Dispatch<SetStateAction<FormValues>>;
  overwriteValues: (partialValues: Partial<FormValues>) => void;
}

interface ControlProps<T> {
  initialValues: T;
  customParsers?: CustomInputParsers<T>;
  watchChanges?: boolean;
}

export const defaultValueParser = (value: string): ValueParserResult => ({
  canUpdate: true,
  valueToUpdate: value,
});

export function useFormControl<T>({
  initialValues,
  customParsers = {} as CustomInputParsers<T>,
  watchChanges = false,
}: ControlProps<T>): UseFormControl<T> {
  const [inputValues, setInputValues] = useState(initialValues);

  useEffect(() => {
    if (!watchChanges) return;

    setInputValues(initialValues);
  }, [watchChanges, initialValues]);

  const updateInputValues: InputValueUpdater = useCallback(
    (event) => {
      const { id, name, value } = event.target;

      const valueKey = (id || name) as keyof CustomInputParsers<T>;

      const customParser = customParsers[valueKey] || defaultValueParser;

      const { canUpdate, valueToUpdate } = customParser(value);

      if (!canUpdate) return;

      setInputValues((oldValues) => ({ ...oldValues, [valueKey]: valueToUpdate }));
    },
    [customParsers],
  );

  const overwriteValues = useCallback((newValues: Partial<T>) => {
    setInputValues((oldValues) => ({
      ...oldValues,
      ...newValues,
    }));
  }, []);

  return {
    inputValues,
    updateInputValues,
    setInputValues,
    overwriteValues,
  };
}
