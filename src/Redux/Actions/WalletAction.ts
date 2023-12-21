import {IWalletStateType} from '@Redux/Reducers/WalletReducer';
import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {ICreateWalletDataProps, IWallet} from '@Types/WalletTypes';

const getWalletPrefix: IEndpoint = 'GET_WALLET';
const createWalletPrefix: IEndpoint = 'CREATE_WALLET';

export const getUserWallets = createAsyncThunk(
  getWalletPrefix,
  async (props?: {id?: string} & ICancelSignal) => {
    const call = await APICall(getWalletPrefix, {
      abortController: props?.abortController,
      params: props?.id,
    });
    console.log('result', call);

    return call;
  },
);

export const createUserWallets = createAsyncThunk(
  createWalletPrefix,
  async (props: ICreateWalletDataProps) => {
    const call = await APICall(createWalletPrefix, {
      abortController: props?.abortController,
      data: props.data,
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
