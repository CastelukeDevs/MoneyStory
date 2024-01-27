import {firebase} from '@react-native-firebase/auth';

import createSliceWithThunks from '@Redux/createSliceWithThunks';
import {AppDispatch, IRootStateType} from '@Redux/Store';

import {resetUserState} from './UserReducer';
import {resetAccountState} from './AccountReducer';
import {resetWalletState} from './WalletReducer';
import {resetTransactionState} from './TransactionReducer';

const CommonReducer = createSliceWithThunks({
  name: 'common',
  initialState: null,
  reducers: create => ({
    userSignOut: create.asyncThunk(
      (_, thunkAPI) => {
        const state = thunkAPI.getState() as IRootStateType;
        const dispatch = thunkAPI.dispatch as AppDispatch;

        firebase.auth().signOut();

        dispatch(resetUserState());
        dispatch(resetAccountState());
        dispatch(resetWalletState());
        dispatch(resetTransactionState());

        return true;
      },
      {
        pending: () => {
          console.log('[>] => Logging out user: Attempted');
        },
        rejected: () => {
          console.log('[X] => Logging out user: Error');
        },
        fulfilled: () => {
          console.log('[O] => Logging out user: Success');
        },
      },
    ),
  }),
});

export const {userSignOut} = CommonReducer.actions;
export default CommonReducer.reducer;
