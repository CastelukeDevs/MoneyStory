import {combineReducers} from 'redux';
import DefaultReducer from './DefaultReducer';
import UserReducer from './UserReducer';
import AccountReducer from './AccountReducer';
import WalletReducer from './WalletReducer';

export default combineReducers({
  default: DefaultReducer.reducer,
  user: UserReducer.reducer,
  account: AccountReducer.reducer,
  wallet: WalletReducer.reducer,
});
