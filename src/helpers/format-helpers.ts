import { ChangeEvent } from 'react';

export const valueFormatter = (value: number | null) => `$${value}`;

export const digitGroupingFormatter = (
  value: number | string | undefined
): string => {
  if (value === undefined || isNaN(+value)) return '0';
  const str = value.toString();
  const [integerPart] = str.split('.');

  let result = '';
  let count = 0;

  const reversedIntegerPartArray = Array.from(integerPart).reverse();

  reversedIntegerPartArray.forEach((integer: string, index: number) => {
    result = integer + result;
    count++;

    if (count % 3 === 0 && index !== reversedIntegerPartArray.length - 1) {
      result = ',' + result;
    }
  });

  return result;
};

export const formatToAutoDecimal = (input: string | undefined): string => {
  if (!input) return '0';

  const sanitizedInput = input.replace(/[^0-9]/g, '');

  if (!sanitizedInput) return '';

  const numericValue = parseInt(sanitizedInput, 10);

  const dollars = (numericValue / 100).toFixed(2);

  const [integerPart, decimalPart] = dollars.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${formattedInteger}.${decimalPart}`;
};

export const sanitizeStrToNum = (value: string): number =>
  parseInt(value.replace(/[$,]/g, ''), 10) || 0;

export const capitalizeFormatter = (
  userInputEvent: ChangeEvent<HTMLInputElement>
): ChangeEvent<HTMLInputElement> => {
  const formattedInput = userInputEvent.target.value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  userInputEvent.target.value = formattedInput;
  return userInputEvent;
};

export const phoneNumberFormatter = (
  phoneNumberEvent: ChangeEvent<HTMLInputElement>
): ChangeEvent<HTMLInputElement> => {
  let numbers = phoneNumberEvent.target.value.replace(/\D/g, '');

  numbers = numbers.slice(0, 10);

  let formatted = numbers;
  if (numbers.length > 6) {
    formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(
      6
    )}`;
  } else if (numbers.length > 3) {
    formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }

  phoneNumberEvent.target.value = formatted;

  return phoneNumberEvent;
};
