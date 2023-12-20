import {IWallet} from '@Types/WalletTypes';
import AccountAction from '@Redux/Actions/AccountAction';
import WalletAction from '@Redux/Actions/WalletAction';
import {createSlice} from '@reduxjs/toolkit';
import {IAccount} from '@Types/AccountTypes';
import {ICurrencyTypes} from '@Types/CommonTypes';

import {IDefaultFetchState} from '@Types/FetchTypes';

export type IWalletStateType = {
  wallets: IWallet[];
} & IDefaultFetchState;

export const walletInitialState: IWalletStateType = {
  error: null,
  status: 'idle',
  wallets: [],
};

const WalletReducer = createSlice({
  name: 'account',
  initialState: walletInitialState,
  reducers: {
    resetWallet: () => {
      return {...walletInitialState};
    },
  },
  extraReducers: WalletAction,
});

export const {resetWallet: resetAccount} = WalletReducer.actions;
export default WalletReducer;
