export const formatCurrency = (value) => {
  return `$${(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatNumber = (value) => (value || 0).toLocaleString('en-US');