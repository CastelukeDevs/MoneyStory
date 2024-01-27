import createSliceWithThunks from '@Redux/createSliceWithThunks';
import APICall from '@Utilities/APIs/APICall';

import {IDefaultFetchState} from '@Types/FetchTypes';
import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {
  ITransaction,
  ITransactionApiResult,
  ITransactionByWalletId,
} from '@Types/TransactionTypes';

type IWalletTransaction = {
  [key: string]: {page: number; transaction: ITransaction[]};
};

type ITransactionPayload = {transactionList: ITransaction[]};

type ITransactionByIDPayload = {
  walletId: string;
  result: ITransactionApiResult;
};

export type ITransactionStateType = {
  allTransaction: ITransaction[];
  walletTransaction: IWalletTransaction;
} & IDefaultFetchState;

export const transactionInitialState: ITransactionStateType = {
  error: null,
  status: 'idle',
  allTransaction: [],
  walletTransaction: {},
};

const TransactionReducer = createSliceWithThunks({
  name: 'transaction',
  initialState: transactionInitialState,
  selectors: {
    isTransactionReady: state => state.status === 'idle',
    selectTransactionStatus: state => state.status,
    selectTransactionError: state => state.error,
    selectTransactionList: state => state.allTransaction,
    selectTransactionWallet: state => state.walletTransaction,
  },
  reducers: create => ({
    resetTransactionState: create.reducer(() => ({...transactionInitialState})),
    getTransaction: create.asyncThunk<
      ICancelSignal | undefined,
      ITransactionPayload
    >(
      async props => {
        const call = await APICall('GET_TRANSACTION', {
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
          state.allTransaction = action.payload.transactionList;
        },
      },
    ),
    //TODO: Move getTransactionByWalletId to RTK-Query later
    getTransactionByWalletId: create.asyncThunk<
      ITransactionByWalletId,
      ITransactionByIDPayload
    >(
      async props => {
        const call = await APICall('GET_TRANSACTION', {
          abortController: props?.abortController,
          params: props,
        });
        return {walletId: props.walletId, result: call};
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

          const result = action.payload.result;
          const walletId = action.payload.walletId;
          const targetWallet = state.walletTransaction[walletId];

          console.log('get transaction by id result in redux', action.payload);

          if (targetWallet) {
            if (result.page > state.walletTransaction[walletId].page) {
              state.walletTransaction[walletId] = {
                page: result.page,
                transaction: targetWallet.transaction.concat(
                  result.transactionList,
                ),
              };
            }
          } else {
            const newTransactionWallet = {
              page: result.page,
              transaction: result.transactionList,
            };
            state.walletTransaction[walletId] = newTransactionWallet;
          }
        },
      },
    ),
  }),
});

export const {
  isTransactionReady,
  selectTransactionStatus,
  selectTransactionError,
  selectTransactionList,
  selectTransactionWallet,
} = TransactionReducer.selectors;

export const {resetTransactionState, getTransaction, getTransactionByWalletId} =
  TransactionReducer.actions;

export default TransactionReducer.reducer;
