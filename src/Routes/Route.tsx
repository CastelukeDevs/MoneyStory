import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Route = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer></NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Route;
