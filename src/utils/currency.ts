export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-GT', {
    style: 'currency',
    currency: 'GTQ',
  });
};
