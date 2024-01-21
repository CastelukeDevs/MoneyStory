import createSliceWithThunks from '@Redux/createSliceWithThunks';
import APICall from '@Utilities/APIs/APICall';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {IAccount} from '@Types/AccountTypes';
import {ICurrencyTypes} from '@Types/CommonTypes';

export type IAccountStateType = {
  accountData: IAccount | null;
  currency: ICurrencyTypes;
} & IDefaultFetchState;

export const accountInitialState: IAccountStateType = {
  error: null,
  accountData: null,
  currency: 'IDR',
  status: 'idle',
};

const AccountReducer = createSliceWithThunks({
  name: 'account',
  initialState: accountInitialState,
  selectors: {
    isAccountReady: state => state.status === 'idle',
    selectAccountStatus: state => state.status,
    selectAccountError: state => state.error,
    selectAccount: state => state.accountData,
  },
  reducers: create => ({
    resetAccountState: create.reducer(() => ({...accountInitialState})),
    getUserAccount: create.asyncThunk<ICancelSignal | undefined, IAccount>(
      async (props?: ICancelSignal) => {
        const call = await APICall('GET_ACCOUNT', {
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
          state.accountData = action.payload;
          state.currency = action.payload.defaultCurrency;
        },
      },
    ),
  }),
});

export const {
  isAccountReady,
  selectAccountStatus,
  selectAccountError,
  selectAccount,
} = AccountReducer.selectors;

export const {resetAccountState, getUserAccount} = AccountReducer.actions;

export default AccountReducer;
