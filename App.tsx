import React from 'react';
import Route from './src/Routes/Route';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StatusBar} from 'react-native';

/**
 * This is Root level App file. No function or Screen should be appear here
 * @returns App
 */

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Provider store={Store.stores}>
          <PersistGate persistor={Store.persistor}>
            <StatusBar translucent backgroundColor="transparent" />
            <Route />
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
