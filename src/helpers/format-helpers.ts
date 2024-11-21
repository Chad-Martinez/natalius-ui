export const valueFormatter = (value: number | null) => `$${value}`;

export const moneyFormatter = (value: number | undefined): string => {
  console.log('formatting', value);
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

export const moneyStrToNumFormatter = (value: string): number =>
  +value.replace(/[$,]/g, '');
