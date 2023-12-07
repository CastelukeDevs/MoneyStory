import React, {useEffect, useRef, useState} from 'react';

import analytics from '@react-native-firebase/analytics';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  StackHeaderProps,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {IDashNav, IMainNav} from './RouteTypes';

import SplashScreen from '../Screens/PreAuth/SplashScreen';
import HomeScreen from '../Screens/Dashboard/HomeScreen';
import Dev from '../Screens/Dev';
import AboutScreen from '../Screens/Dashboard/AboutScreen';
import SignInScreen from '../Screens/PreAuth/SignInScreen';
import SignUpScreen from '../Screens/PreAuth/SignUpScreen';
import Header from '../Components/Header';
import SignUpProfileScreen from '../Screens/PreAuth/SignUpProfileScreen';
import SignUpImageScreen from '../Screens/PreAuth/SignUpImageScreen';
import ForgotPasswordScreen from '../Screens/PreAuth/ForgotPasswordScreen';

const Stack = createStackNavigator<IMainNav>();
const Drawer = createDrawerNavigator<IDashNav>();

const defaultScreenOptions: StackNavigationOptions = {headerShown: false};

const Route = () => {
  const routeNameRef = useRef<string | null>();
  const navigationRef = createNavigationContainerRef<IMainNav>();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    const authSub = auth().onAuthStateChanged(setUser);
    return authSub;
  }, []);

  useEffect(() => {
    console.log('CurrentUser', user);

    return () => {};
  }, [user]);

  // Enable below when needed initialization phase
  // const onAuthStateChangeHandler = (currentUser: any) => {
  //   setUser(currentUser);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // };

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

  //All Main Header below
  const preLoginHeader = (options: StackHeaderProps) => {
    return <Header onBackPressed={options.navigation.goBack} />;
  };

  const profileCompletionHeader = (options: StackHeaderProps) => {
    console.log('current active', routeNameRef.current);

    //trigger change to
    const getProgress = () => {
      switch (routeNameRef.current) {
        case 'SignUpProfileScreen':
          return 1;
        case 'SignUpImageScreen':
          return 2;
        default:
          return 0;
      }
    };

    return (
      <Header
        onBackPressed={options.navigation.goBack}
        progressBar={{indicatorCount: 2, indicatorActive: getProgress()}}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReadyHandler}
        onStateChange={onNavigationStateChangeHandler}>
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Group
            navigationKey="SignUp"
            screenOptions={{
              header: props => preLoginHeader(props),
              headerShown: true,
            }}>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </Stack.Group>
          <Stack.Group
            navigationKey="ProfileCompletion"
            screenOptions={{
              header: props => profileCompletionHeader(props),
              headerShown: true,
            }}>
            <Stack.Screen
              name="SignUpProfileScreen"
              component={SignUpProfileScreen}
            />
            <Stack.Screen
              name="SignUpImageScreen"
              component={SignUpImageScreen}
            />
          </Stack.Group>
          <Stack.Screen name="MainDashboard" component={DashboardRoute} />
          {/* <Stack.Group screenOptions={{presentation: 'modal'}}></Stack.Group> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const DashboardRoute = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen name="DeveloperScreen2" component={Dev} />
    </Drawer.Navigator>
  );
};

export default Route;
