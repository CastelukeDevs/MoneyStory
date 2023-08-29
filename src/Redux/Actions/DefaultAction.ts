import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import APICall from '../../Utilities/APIs/APIRequest';
import {IEndpoint} from '../../Utilities/APIs/APIUtils';
import {IDefaultState} from '../Reducers/DefaultReducer';

const GetContactPrefix: IEndpoint = 'GET_USER';

export const fetchUser = createAsyncThunk(GetContactPrefix, async () => {
  const result = await APICall('GET_USER');

  return result;
});

export default (builder: ActionReducerMapBuilder<IDefaultState>) => {
  builder
    .addCase(fetchUser.pending, state => {
      state.error = null;
      state.isLoading = true;
    })
    .addCase(fetchUser.rejected, (state, action: any) => {
      state.error = {isError: true, message: action.payload.message};
      state.isLoading = false;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.error = {isError: false, message: null};
      state.isLoading = false;
      state.userData = action.payload;
    });
};
