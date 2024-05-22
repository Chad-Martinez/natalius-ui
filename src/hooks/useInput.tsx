import { ChangeEvent, useState } from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (): void => {
    setIsTouched(true);
  };

  const reset = (): void => {
    setEnteredValue('');
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
