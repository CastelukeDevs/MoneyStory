import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import DefaultAction from '../Actions/DefaultAction';
import {IErrorMessage} from '@Types/FetchTypes';
import {IUserAuth} from '@Types/AuthTypes';

export type IDefaultState = {
  isLoading: boolean;
  error: IErrorMessage | null;
  userData: IUserAuth | null;
};

export const contactInitialState: IDefaultState = {
  isLoading: false,
  error: null,
  userData: null,
};

const DefaultReducer = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    // setUser: (state: IDefaultState, action: PayloadAction<IUser>) => {
    //   const userData = action.payload;
    //   state.userData = userData;
    // },
    // removeUser: (state: IDefaultState) => {
    //   state.userData = null;
    //   state.isLoading = false;
    //   state.error = null;
    // },
  },
  extraReducers: DefaultAction,
});

export const {} = DefaultReducer.actions;
export default DefaultReducer;
