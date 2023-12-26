import {ICurrencyTypes} from './CommonTypes';
import {ITransactionMini} from './TransactionTypes';

export type IAccount = {
  _id: string;
  totalBalance: number;
  defaultCurrency: ICurrencyTypes;
  id: string;
};
