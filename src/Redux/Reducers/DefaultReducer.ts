import {createSlice} from '@reduxjs/toolkit';

export type IDefaultState = {};

export const contactInitialState: IDefaultState = {
  // isLoading: false,
  // error: null,
  // userData: null,
};

const DefaultReducer = createSlice({
  name: 'default',
  initialState: contactInitialState,
  reducers: {},
  // extraReducers: DefaultAction,
});

export const {} = DefaultReducer.actions;
export default DefaultReducer;
