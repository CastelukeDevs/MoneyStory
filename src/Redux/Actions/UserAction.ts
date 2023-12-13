import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import APICall from '@Utilities/APIs/APIRequest';
import {IEndpoint} from '@Utilities/APIs/APIUtils';

import {IUserStateType} from '@Redux/Reducers/UserReducer';

const GetContactPrefix: IEndpoint = 'GET_USER';

export const getUserData = createAsyncThunk(GetContactPrefix, async () => {
  const call = await APICall(GetContactPrefix);
  console.log('result', call);

  return call;
});

export default (builder: ActionReducerMapBuilder<IUserStateType>) => {
  builder
    .addCase(getUserData.pending, state => {
      state.isLoading = true;
      state.isLoading = null;
      state.error = null;
    })
    .addCase(getUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = {message: action.error.message!, error: action.error};
      state.userProfileData = null;
    })
    .addCase(getUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = null;
      state.userProfileData = action.payload;
    });
};
