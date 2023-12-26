import AccountAction from '@Redux/Actions/AccountAction';
import {createSlice} from '@reduxjs/toolkit';
import {IAccount} from '@Types/AccountTypes';
import {ICurrencyTypes} from '@Types/CommonTypes';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {IUserType} from '@Types/UserType';

export type IAccountStateType = {
  accountData: IAccount | null;
  currency: ICurrencyTypes;
} & IDefaultFetchState;

export const accountInitialState: IAccountStateType = {
  error: null,
  accountData: null,
  currency: 'IDR',
  status: 'idle',
};

const AccountReducer = createSlice({
  name: 'account',
  initialState: accountInitialState,
  reducers: {
    resetAccount: () => {
      return {...accountInitialState};
    },
  },
  extraReducers: AccountAction,
});

export const {resetAccount} = AccountReducer.actions;
export default AccountReducer;
