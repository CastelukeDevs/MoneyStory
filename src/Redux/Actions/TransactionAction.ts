import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

import {ITransactionStateType} from '@Redux/Reducers/TransactionReducer';
import {ITransaction} from '@Types/TransactionTypes';

const getTransactionPrefix: IEndpoint = 'GET_TRANSACTION';

export const getTransaction = createAsyncThunk(
  getTransactionPrefix,
  async (props?: ICancelSignal) => {
    const call = await APICall(getTransactionPrefix, {
      abortController: props?.abortController,
    });
    // console.log('result', call);

    return call;
  },
);

export default (builder: ActionReducerMapBuilder<ITransactionStateType>) => {
  builder
    .addCase(getTransaction.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getTransaction.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getTransaction.fulfilled,
      (state, action: PayloadAction<ITransaction[]>) => {
        state.status = 'success';
        state.error = null;
        state.allTransaction = action.payload;
      },
    );
};
