import {IAccountStateType} from '@Redux/Reducers/AccountReducer';
import {IWalletStateType} from '@Redux/Reducers/WalletReducer';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {IAccount} from '@Types/AccountTypes';
import {IWallet} from '@Types/WalletTypes';

import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

const getWalletPrefix: IEndpoint = 'GET_WALLET';

export const getUserWallets = createAsyncThunk(
  getWalletPrefix,
  async (props?: ICancelSignal) => {
    const call = await APICall(getWalletPrefix, {
      abortController: props?.abortController,
    });
    console.log('result', call);

    return call;
  },
);

export default (builder: ActionReducerMapBuilder<IWalletStateType>) => {
  builder
    .addCase(getUserWallets.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getUserWallets.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getUserWallets.fulfilled,
      (state, action: PayloadAction<IWallet[]>) => {
        state.status = 'success';
        state.error = null;
        state.wallets = action.payload;
      },
    );
};
