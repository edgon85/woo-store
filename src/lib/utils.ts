export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-GT', {
    style: 'currency',
    currency: 'GTQ',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-GT'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
