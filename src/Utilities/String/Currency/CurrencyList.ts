const CurrencyList = [
  {abbreviation: 'IDR', currency: 'Indonesian Rupiah', sign: 'Rp', s: 'p'},
  {abbreviation: 'USD', currency: 'US Dollar', sign: '$', s: 'c'},
  {abbreviation: 'EUR', currency: 'European Euro', sign: '€', s: 'p'},
  {abbreviation: 'JPY', currency: 'Japanese Yen', sign: '¥', s: 'c'},
  {abbreviation: 'SGD', currency: 'Singaporean Dollar', sign: '$', s: 'c'},
  {abbreviation: 'SAR', currency: 'Arabian Riyal', sign: '﷼', s: 'c'},
  {abbreviation: 'CNY', currency: 'Chinese Yuan', sign: '¥', s: 'c'},
] as const;

export default CurrencyList;
