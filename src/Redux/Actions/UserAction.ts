import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

import {IUserStateType} from '@Redux/Reducers/UserReducer';
import {ICreateUserDataProps} from '@Types/UserType';

const GetContactPrefix: IEndpoint = 'GET_USER';
const CreateContactPrefix: IEndpoint = 'CREATE_USER';
const UpdateContactPrefix: IEndpoint = 'UPDATE_USER';

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

export const createUserData = createAsyncThunk(
  CreateContactPrefix,
  async (props: ICreateUserDataProps) => {
    const call = await APICall(CreateContactPrefix, {
      abortController: props.abortController,
      data: props.data,
    });
    console.log('result', call);

    return call;
  },
);
export const updateUserData = createAsyncThunk(
  UpdateContactPrefix,
  async (props: ICreateUserDataProps) => {
    const call = await APICall(UpdateContactPrefix, {
      abortController: props.abortController,
      data: props.data,
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
    })
    .addCase(createUserData.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(createUserData.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
      state.userProfileData = null;
    })
    .addCase(createUserData.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = null;
      state.userProfileData = action.payload;
    })
    .addCase(updateUserData.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(updateUserData.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
      state.userProfileData = null;
    })
    .addCase(updateUserData.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = null;
      state.userProfileData = action.payload;
    });
};
