import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';

import {ITransactionStateType} from '@Redux/Reducers/TransactionReducer';
import {
  ITransaction,
  ITransactionApiResult,
  ITransactionByWalletId,
} from '@Types/TransactionTypes';

const getTransactionPrefix: IEndpoint = 'GET_TRANSACTION';

export const getTransaction = createAsyncThunk(
  getTransactionPrefix,
  async (props?: ICancelSignal) => {
    const call = await APICall(getTransactionPrefix, {
      abortController: props?.abortController,
    });
    // console.log('result', call);

    return call;
  },
);

export const getTransactionByWalletId = createAsyncThunk(
  getTransactionPrefix + '/byWalletId',
  async (props: ITransactionByWalletId) => {
    const call = await APICall(getTransactionPrefix, {
      abortController: props?.abortController,
      params: props,
    });
    // console.log('result', call);

    return {walletId: props.walletId, result: call};
  },
);

export default (builder: ActionReducerMapBuilder<ITransactionStateType>) => {
  builder
    .addCase(getTransaction.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getTransaction.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getTransaction.fulfilled,
      (state, action: PayloadAction<ITransactionApiResult>) => {
        state.status = 'success';
        state.error = null;
        state.allTransaction = action.payload.transactionList;
      },
    )
    .addCase(getTransactionByWalletId.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getTransactionByWalletId.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getTransactionByWalletId.fulfilled,
      (
        state,
        action: PayloadAction<{
          walletId: string;
          result: ITransactionApiResult;
        }>,
      ) => {
        const result = action.payload.result;
        const walletId = action.payload.walletId;
        const targetWallet = state.walletTransaction[walletId];
        state.status = 'success';
        state.error = null;

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
    );
};
