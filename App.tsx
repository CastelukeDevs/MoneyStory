import React from 'react';
import Route from './src/Routes/Route';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

/**
 * This is Root level App file. No function or Screen should be appear here
 * @returns App
 */
if (__DEV__) {
  //disable when not using FB Emulator
  // import {firebase} from '@react-native-firebase/auth';
  // const {firebase} = require('@react-native-firebase/auth');
  // firebase.auth().useEmulator('http://127.0.0.1:9099');
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store.stores}>
        <PersistGate persistor={Store.persistor}>
          <StatusBar translucent backgroundColor="transparent" />
          <Route />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
