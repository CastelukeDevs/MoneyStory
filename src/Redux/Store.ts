import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './Reducers/index';

const createDebugger = require('redux-flipper').default;
const createObserver = require('flipper-redux-observer').default;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = reducer;

export type RootStateType = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const stores = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    })
      .concat(createDebugger())
      .concat(createObserver()),
});

const persistor = persistStore(stores);

export default {stores, persistor};
