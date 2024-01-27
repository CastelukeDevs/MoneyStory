import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {CategoryList} from '@Utilities/DefaultData/CategoryList';
import {IIconName, ILogoName, IPaginateProps} from './CommonTypes';

export type ITransactionType = (typeof CategoryList)[number]['type'];

export type ICategory = {
  category: string;
  icon: ILogoName;
  type?: ITransactionType;
};

export type ITransactionItems = {
  _id: string;
  name: string;
  quantity: number;
  piecePrice: number;
  subTotal: number;
};

export type ITransactionMain = {
  ownerUID: string;
  walletId: string;
  transactionType: ITransactionType;
  category: ICategory | string;
  subCategories?: string[];
  amount: number;
  targetWallet?: string;
  date: Date;
  note?: string;
  tags?: string[];
  items?: ITransactionItems[] | string[];
  imageUrl?: string;
};

export type ITransaction = {
  id: string;
  createdAt: number;
  updatedAt: number;
} & ITransactionMain;

export type ITransactionCreateUpdateRequest = {
  image?: any;
} & ITransactionMain;

export type ITransactionMini = {
  _id?: string;
  transactionType: ITransactionType;
  date: Date;
};

type ITransactionParams = {
  walletId?: string;
  transactionId?: string;
  transactionType?: ITransactionType;
};

export type ITransactionApiResult = {
  transactionList: ITransaction[];
} & Required<IPaginateProps>;

export type ITransactionByWalletId = {
  walletId: string;
} & ICancelSignal &
  IPaginateProps;

// export type ICreateUserDataProps = {
//   data?: ITransactionMain;
//   params?: ITransactionParams;
// } & ICancelSignal;
