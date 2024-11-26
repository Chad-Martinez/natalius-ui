export const valueFormatter = (value: number | null) => `$${value}`;

export const moneyFormatter = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return '0';
  const str = value.toString();
  const [integerPart, decimalPart] = str.split('.');

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

  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return result;
};

export const formatToDollarsAutoDecimal = (
  input: string | undefined
): string => {
  if (!input) return '0';

  const sanitizedInput = input.replace(/[^0-9]/g, '');

  if (!sanitizedInput) return '';

  const numericValue = parseInt(sanitizedInput, 10);

  const dollars = (numericValue / 100).toFixed(2);

  const [integerPart, decimalPart] = dollars.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${formattedInteger}.${decimalPart}`;
};

export const moneyStrToNumFormatter = (value: string): number =>
  +value.replace(/[$,]/g, '');
