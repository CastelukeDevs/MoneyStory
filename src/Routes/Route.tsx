import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {IDashNav, IMainNav} from './RouteTypes';

import SplashScreen from '../Screens/SplashScreen';
import HomeScreen from '../Screens/Dashboard/HomeScreen';
import Dev from '../Screens/Dev';
import AboutScreen from '../Screens/Dashboard/AboutScreen';
import SignInScreen from '../Screens/SignInScreen';

const Stack = createStackNavigator<IMainNav>();
const Drawer = createDrawerNavigator<IDashNav>();

const defaultScreenOptions: StackNavigationOptions = {headerShown: false};

const DashboardRoute = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen name="DeveloperScreen2" component={Dev} />
    </Drawer.Navigator>
  );
};

const Route = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="MainDashboard" component={DashboardRoute} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Route;
