import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';

import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

import {IUserStateType} from '@Redux/Reducers/UserReducer';

const GetContactPrefix: IEndpoint = 'GET_USER';

export const getUserData = createAsyncThunk(
  GetContactPrefix,
  async (props?: ICancelSignal) => {
    const call = await APICall(GetContactPrefix, {
      abortController: props?.abortController,
    });
    console.log('result', call);

    return call;
  },
);

export default (builder: ActionReducerMapBuilder<IUserStateType>) => {
  builder
    .addCase(getUserData.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getUserData.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
      state.userProfileData = null;
    })
    .addCase(getUserData.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = null;
      state.userProfileData = action.payload;
    });
};
