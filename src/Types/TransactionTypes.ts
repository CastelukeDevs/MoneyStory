import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {
  CategoryList,
  TransactionType,
} from '@Utilities/DefaultData/CategoryList';
import {IPaginateProps} from './CommonTypes';
import {IIconName} from '@Components/Common/Icon';

export type ITransactionType = keyof typeof CategoryList;
export type ITransactionCategory = {category: string; icon: IIconName};

export type ICategoryList = {
  [key: string]: ITransactionCategory[];
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
  category: string;
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
