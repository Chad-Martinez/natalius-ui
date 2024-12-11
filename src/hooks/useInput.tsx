import { ChangeEvent, useState } from 'react';

type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface UseInputReturn<T> {
  value: T;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: ChangeEvent<InputElement>) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}

const useInput = <T extends string | boolean | null>(
  validateValue: (value: T) => boolean,
  initialValue: T
): UseInputReturn<T> => {
  const [enteredValue, setEnteredValue] = useState<T>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (event: ChangeEvent<InputElement>): void => {
    if (typeof initialValue === 'boolean' && 'checked' in event.target)
      setEnteredValue(event.target.checked as T);
    else setEnteredValue(event.target.value as T);
  };

  const inputBlurHandler = (): void => setIsTouched(true);

  const reset = (): void => {
    setEnteredValue(initialValue);
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
