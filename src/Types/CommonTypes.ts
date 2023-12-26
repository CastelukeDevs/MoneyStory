import CurrencyList from '@Utilities/String/Currency/CurrencyList';

export type ICurrencyTypes = (typeof CurrencyList)[number]['abbreviation'];
