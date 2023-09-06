import React, {useEffect, useRef, useState} from 'react';

import analytics from '@react-native-firebase/analytics';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

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

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    const authSub = auth().onAuthStateChanged(onAuthStateChangeHandler);
    return authSub;
  }, []);

  const onAuthStateChangeHandler = (FUser: any) => {
    setUser(FUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  const onReadyHandler = () => {
    if (navigationRef.current === null) {
      return;
    }

    routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
  };

  const onNavigationStateChangeHandler = async () => {
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
        onStateChange={onNavigationStateChangeHandler}>
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="MainDashboard" component={DashboardRoute} />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Route;
