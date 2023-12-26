import {CategoryList} from '@Utilities/CategoryList';

export type ITransactionType = (typeof CategoryList)[number]['type'];

export type ICategory = {
  category: string;
  icon: string;
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