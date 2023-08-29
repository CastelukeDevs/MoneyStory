import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IErrorMessage, IUser} from '../../Types/Types';

export type IDefaultState = {
  isLoading: boolean;
  error: IErrorMessage | null;
  userData: IUser | null;
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
    setUser: (state: IDefaultState, action: PayloadAction<IUser>) => {
      const userData = action.payload;
      state.userData = userData;
    },
    removeUser: (state: IDefaultState) => {
      state.userData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  //   extraReducers: ContactActionReducerBuilder,
});

export const {setUser, removeUser} = DefaultReducer.actions;
export default DefaultReducer;
