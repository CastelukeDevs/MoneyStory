import {IWallet} from '@Types/WalletTypes';
import WalletAction from '@Redux/Actions/WalletAction';
import {createSlice} from '@reduxjs/toolkit';
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
  name: 'wallet',
  initialState: walletInitialState,
  reducers: {
    resetWallet: () => {
      return {...walletInitialState};
    },
  },
  extraReducers: WalletAction,
});

export const {resetWallet} = WalletReducer.actions;
export default WalletReducer;
