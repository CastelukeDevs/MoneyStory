import createSliceWithThunks from '@Redux/createSliceWithThunks';
import APICall from '@Utilities/APIs/APICall';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {ICreateUserDataProps, IUserType} from '@Types/UserType';

export type IUserStateType = {
  userProfileData: IUserType | null;
} & IDefaultFetchState;

export const userInitialState: IUserStateType = {
  error: null,
  userProfileData: null,
  status: 'idle',
};

const UserReducer = createSliceWithThunks({
  name: 'user',
  initialState: userInitialState,
  selectors: {
    isUserReady: state => state.status === 'idle',
    selectUserStatus: state => state.status,
    selectUserError: state => state.error?.error,
    selectUserData: state => state.userProfileData,
    selectUserDefaultCurrency: state => state.userProfileData?.defaultCurrency,
  },
  reducers: create => ({
    resetUserState: create.reducer(() => ({...userInitialState})),
    getUserData: create.asyncThunk<ICancelSignal | undefined, IUserType>(
      async props => {
        const call = await APICall('GET_USER', {
          abortController: props?.abortController,
        });
        return call;
      },
      {
        pending: state => {
          state.status = 'fetching';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = {message: action.error.message!, error: action.error};
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.error = null;
          state.userProfileData = action.payload;
        },
      },
    ),
    createUserData: create.asyncThunk<ICreateUserDataProps, IUserType>(
      async props => {
        const data = props.data;
        const call = await APICall('CREATE_USER', {
          abortController: props?.abortController,
          data,
        });
        return call;
      },
      {
        pending: state => {
          state.status = 'fetching';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = {message: action.error.message!, error: action.error};
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.error = null;
          state.userProfileData = action.payload;
        },
      },
    ),
    updateUserData: create.asyncThunk<ICreateUserDataProps, IUserType>(
      async props => {
        const data = props.data;
        const call = await APICall('CREATE_USER', {
          abortController: props?.abortController,
          data,
        });
        return call;
      },
      {
        pending: state => {
          state.status = 'fetching';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = {message: action.error.message!, error: action.error};
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.error = null;
          // state.userProfileData = action.payload; //TODO: Update user data update side effects
        },
      },
    ),
  }),
});

export const {
  isUserReady,
  selectUserStatus,
  selectUserError,
  selectUserData,
  selectUserDefaultCurrency,
} = UserReducer.selectors;

export const {resetUserState, getUserData, createUserData, updateUserData} =
  UserReducer.actions;

export default UserReducer.reducer;
