import {ICurrencyTypes} from '@Types/CommonTypes';
import CurrencyList from './CurrencyList';

const getCurrencyByAbbr = (abbr: ICurrencyTypes) => {
  return CurrencyList.find(currency => currency.abbreviation === abbr);
};
const formatter = (amount: number, code: ICurrencyTypes) => {
  const [wholeNum, decimalNum] = amount.toString().split('.');
  const selectedCurrency = getCurrencyByAbbr(code);

  const symbol = selectedCurrency?.sign || code;

  const fixDecimal = decimalNum || '00';
  const decimal = (selectedCurrency?.s === 'c' ? '.' : ',') + fixDecimal;

  const whole = wholeNum
    .toString()
    .replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      selectedCurrency?.s === 'c' ? '$1,' : '$1.',
    );

  const format = `${symbol} ${whole}${decimal}`;

  return {symbol, whole, decimal, format};
};

export default formatter;
