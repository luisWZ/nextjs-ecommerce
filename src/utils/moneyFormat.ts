const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const numberFormatNoCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const money = (amount: number) => numberFormat.format(amount);

export const moneyNoCents = (amount: number) => numberFormatNoCents.format(amount);
