import AccountAction from '@Redux/Actions/AccountAction';
import TransactionAction from '@Redux/Actions/TransactionAction';
import {createSlice} from '@reduxjs/toolkit';
import {IAccount} from '@Types/AccountTypes';
import {ICurrencyTypes} from '@Types/CommonTypes';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ITransaction} from '@Types/TransactionTypes';

export type ITransactionStateType = {
  allTransaction: ITransaction[];
} & IDefaultFetchState;

export const transactionInitialState: ITransactionStateType = {
  error: null,
  status: 'idle',
  allTransaction: [],
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

export const {resetTransaction: resetAccount} = TransactionReducer.actions;
export default TransactionReducer;
