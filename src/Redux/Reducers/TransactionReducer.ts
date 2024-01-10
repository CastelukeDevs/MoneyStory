import AccountAction from '@Redux/Actions/AccountAction';
import TransactionAction from '@Redux/Actions/TransactionAction';
import {createSlice} from '@reduxjs/toolkit';
import {IAccount} from '@Types/AccountTypes';
import {ICurrencyTypes} from '@Types/CommonTypes';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ITransaction} from '@Types/TransactionTypes';

type ITestWalletTransaction = {
  [key: string]: ITransaction[];
};

type IWalletTransaction = {
  [key: string]: {page: number; transaction: ITransaction[]};
};
export type ITransactionStateType = {
  allTransaction: ITransaction[];
  walletTransaction: IWalletTransaction;
} & IDefaultFetchState;

export const transactionInitialState: ITransactionStateType = {
  error: null,
  status: 'idle',
  allTransaction: [],
  walletTransaction: {},
};

const TransactionReducer = createSlice({
  name: 'transaction',
  initialState: transactionInitialState,
  reducers: {
    resetTransaction: () => {
      return {...transactionInitialState};
    },
  },
  extraReducers: TransactionAction,
});

export const {resetTransaction} = TransactionReducer.actions;
export default TransactionReducer;
