import React, {useRef} from 'react';

import analytics from '@react-native-firebase/analytics';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
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
  const routeNameRef = useRef<string | null>();
  const navigationRef = createNavigationContainerRef<IMainNav>();

  const onReadyHandler = () => {
    if (navigationRef.current === null) {
      return;
    }

    routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
  };

  const onStateChangeHandler = async () => {
    if (navigationRef.current === null) {
      return;
    }

    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReadyHandler}
        onStateChange={onStateChangeHandler}>
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
