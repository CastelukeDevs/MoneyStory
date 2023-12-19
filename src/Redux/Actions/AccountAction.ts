import {IAccountStateType} from '@Redux/Reducers/AccountReducer';
import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';

import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

const GetContactPrefix: IEndpoint = 'GET_USER';

export const getUserAccount = createAsyncThunk(
  GetContactPrefix,
  async (props?: ICancelSignal) => {
    const call = await APICall(GetContactPrefix, {
      abortController: props?.abortController,
    });
    console.log('result', call);

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
    .addCase(getUserAccount.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = null;
    });
};
