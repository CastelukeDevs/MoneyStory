import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {ICurrencyTypes, IFile, IIconName} from './CommonTypes';

export type IWalletType = 'wallet' | 'debit' | 'credit';

export type IWalletMain = {
  logo: IIconName;
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
  image: IFile;
} & IWalletMain;

export type ICreateWalletDataProps = {
  data: IWalletCreateUpdateData;
} & ICancelSignal;
