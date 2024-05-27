import { ChangeEvent, useState } from 'react';

const useInput = (
  validateValue: (value: string) => boolean,
  initialValue?: string
) => {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue || '');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (): void => {
    setIsTouched(true);
  };

  const reset = (): void => {
    setEnteredValue(initialValue || '');
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
