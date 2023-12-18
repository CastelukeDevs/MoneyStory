import UserAction from '@Redux/Actions/UserAction';
import {createSlice} from '@reduxjs/toolkit';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {IUserType} from '@Types/UserType';

export type IUserStateType = {
  userProfileData: IUserType | null;
} & IDefaultFetchState;

export const userInitialState: IUserStateType = {
  error: null,
  userProfileData: null,
  status: 'idle',
};

const UserReducer = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetAuth: () => {
      return {...userInitialState};
    },
  },
  extraReducers: UserAction,
});

export const {resetAuth} = UserReducer.actions;
export default UserReducer;
