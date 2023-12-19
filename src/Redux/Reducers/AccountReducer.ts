import UserAction from '@Redux/Actions/UserAction';
import {createSlice} from '@reduxjs/toolkit';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {IUserType} from '@Types/UserType';

export type IAccountStateType = {
  accountData: null;
} & IDefaultFetchState;

export const accountInitialState: IAccountStateType = {
  error: null,
  accountData: null,
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
  // extraReducers: UserAction,
});

export const {resetAccount} = AccountReducer.actions;
export default AccountReducer;
