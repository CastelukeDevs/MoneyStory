import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from './src/Routes/Routes';
import ReduxWrapper from '@Redux/ReduxWrapper';

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
      <ReduxWrapper>
        <StatusBar translucent backgroundColor="transparent" />
        <Routes />
      </ReduxWrapper>
    </GestureHandlerRootView>
  );
}
