import {combineReducers} from 'redux';
import DefaultReducer from './DefaultReducer';
import UserReducer from './UserReducer';
import AccountReducer from './AccountReducer';
import WalletReducer from './WalletReducer';
import TransactionReducer from './TransactionReducer';
import CommonReducer from './CommonReducer';

export default combineReducers({
  common: CommonReducer,
  default: DefaultReducer,
  user: UserReducer,
  account: AccountReducer,
  wallet: WalletReducer,
  transaction: TransactionReducer,
});
