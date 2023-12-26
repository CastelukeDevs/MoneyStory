import {IAccountStateType} from '@Redux/Reducers/AccountReducer';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

import {IAccount} from '@Types/AccountTypes';

const getAccountPrefix: IEndpoint = 'GET_ACCOUNT';

export const getUserAccount = createAsyncThunk(
  getAccountPrefix,
  async (props?: ICancelSignal) => {
    const call = await APICall(getAccountPrefix, {
      abortController: props?.abortController,
    });
    // console.log('result', call);

    return call;
  },
);

export default (builder: ActionReducerMapBuilder<IAccountStateType>) => {
  builder
    .addCase(getUserAccount.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getUserAccount.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getUserAccount.fulfilled,
      (state, action: PayloadAction<IAccount>) => {
        state.status = 'success';
        state.error = null;
        state.accountData = action.payload;
        state.currency = action.payload.defaultCurrency;
      },
    );
};
