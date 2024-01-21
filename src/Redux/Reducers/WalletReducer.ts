import createSliceWithThunks from '@Redux/createSliceWithThunks';
import APICall from '@Utilities/APIs/APICall';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {ICreateWalletDataProps, IWallet} from '@Types/WalletTypes';

export type IWalletStateType = {
  wallets: IWallet[];
} & IDefaultFetchState;

export const walletInitialState: IWalletStateType = {
  error: null,
  status: 'idle',
  wallets: [],
};

const WalletReducer = createSliceWithThunks({
  name: 'wallet',
  initialState: walletInitialState,
  selectors: {
    isWalletReady: state => state.status === 'idle',
    selectWalletStatus: state => state.status,
    selectWallets: state => state.wallets,
    selectWalletsError: state => state.error,
  },
  reducers: create => ({
    resetWalletState: create.reducer(() => ({...walletInitialState})),
    getUserWallets: create.asyncThunk<ICancelSignal | undefined, IWallet[]>(
      async props => {
        return await APICall('GET_WALLET', {
          abortController: props?.abortController,
        });
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
          state.wallets = action.payload;
        },
      },
    ),
    createNewWallet: create.asyncThunk<ICreateWalletDataProps, IWallet>(
      async props => {
        const data = {...props.data};
        return await APICall('CREATE_WALLET', {
          abortController: props?.abortController,
          data,
        });
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
          state.wallets.push(action.payload);
        },
      },
    ),
  }),
});

export const {
  isWalletReady,
  selectWalletStatus,
  selectWallets,
  selectWalletsError,
} = WalletReducer.selectors;

export const {resetWalletState, getUserWallets, createNewWallet} =
  WalletReducer.actions;

export default WalletReducer.reducer;
