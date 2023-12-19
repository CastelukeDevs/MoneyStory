import {combineReducers} from 'redux';
import DefaultReducer from './DefaultReducer';
import UserReducer from './UserReducer';
import AccountReducer from './AccountReducer';

export default combineReducers({
  default: DefaultReducer.reducer,
  user: UserReducer.reducer,
  account: AccountReducer.reducer,
});
