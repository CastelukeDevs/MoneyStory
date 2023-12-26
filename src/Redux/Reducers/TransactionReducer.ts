import AccountAction from '@Redux/Actions/AccountAction';
import {createSlice} from '@reduxjs/toolkit';
import {IAccount} from '@Types/AccountTypes';
import {ICurrencyTypes} from '@Types/CommonTypes';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ITransaction} from '@Types/TransactionTypes';
import {IUserType} from '@Types/UserType';

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
  // extraReducers: AccountAction,
});

export const {resetTransaction: resetAccount} = TransactionReducer.actions;
export default TransactionReducer;
