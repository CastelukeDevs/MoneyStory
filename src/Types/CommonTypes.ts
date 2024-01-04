import CurrencyList from '@Utilities/DefaultData/CurrencyList';

export type ICurrencyTypes = (typeof CurrencyList)[number]['abbreviation'];
export type IPaginateProps = {
  limit?: number;
  page?: number;
};
