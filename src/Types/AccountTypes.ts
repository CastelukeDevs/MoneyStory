import {ICurrencyTypes} from './CommonTypes';

export type IAccount = {
  _id: string;
  totalBalance: number;
  wallet: string[];
  defaultCurrency: ICurrencyTypes;
  id: string;
};
