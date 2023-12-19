import {ICurrencyTypes} from './CommonTypes';

export type IWalletType = 'wallet' | 'debit' | 'credit';

export type ITransaction = {
  value: number;
  note: string;
};

export type IWallet = {
  name: string;
  ownerUID: string;
  cardNumber: string;
  logo?: string;
  balance: number;
  currency: ICurrencyTypes;
  transaction: String[];
  type: IWalletType;
  createdAt: number;
  updatedAt: number;
};
