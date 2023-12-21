import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {ICurrencyTypes} from './CommonTypes';

export type IWalletType = 'wallet' | 'debit' | 'credit';

export type ITransaction = {
  value: number;
  note: string;
};

export type IWalletMain = {
  logo: string;
  walletName: string;
  walletAbbreviation: string;
  holderName: string;
  holderNumber: string;
  balance: number | string;
  currency: ICurrencyTypes;
  imageUrl?: string;
  monthDiff?: number;
  percentDiff?: number;
  type?: IWalletType;
};

export type IWallet = {
  id: string;
  ownerUID: string;
  createdAt: string;
  updatedAt: string;
} & IWalletMain;

export type IWalletCreateUpdateData = {
  image: any;
} & IWalletMain;

export type ICreateWalletDataProps = {
  data: IWalletCreateUpdateData;
} & ICancelSignal;
