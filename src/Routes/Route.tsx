import React, {useEffect, useRef, useState} from 'react';

import analytics from '@react-native-firebase/analytics';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  DefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {IDashNav, IMainNav, ITabNav} from './RouteTypes';
import Header from '@Components/Header';
import Button from '@Components/Common/Button';

import SignInScreen from '@Screens/PreAuth/SignInScreen';
import SignUpScreen from '@Screens/PreAuth/SignUpScreen';
import ForgotPasswordScreen from '@Screens/PreAuth/ForgotPasswordScreen';
import ProfileCompletionScreen from '@Screens/Profile/ProfileCompletionScreen';
import ProfileImageScreen from '@Screens/Profile/ProfileImageScreen';
import HomeScreen from '@Screens/Dashboard/HomeScreen';
import AboutScreen from '@Screens/Dashboard/AboutScreen';
import Dev from '@Screens/Dev';
import PostAuthTransitionScreen from '@Screens/Dashboard/PostAuthTransitionScreen';
import {HeaderBackButtonProps} from '@react-navigation/elements';
import CreateCardScreen from '@Screens/CreateCard/CreateCardScreen';
import WalletListScreen from '@Screens/General/WalletListScreen';
import ActivityListScreen from '@Screens/Dashboard/ActivityListScreen';
import BottomTabBar from '@Components/BottomTabBar';
import CreateTransactionScreen from '@Screens/CreateTransaction/CreateTransactionScreen';

const Stack = createStackNavigator<IMainNav>();
const Drawer = createDrawerNavigator<IDashNav>();
const Tab = createBottomTabNavigator<ITabNav>();

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

  const headerBackButton = (props: HeaderBackButtonProps) => {
    const canGoBack = props.canGoBack;
    return (
      <>
        {canGoBack ? (
          <Button
            label={'Back'}
            icon={{name: 'chevron-back'}}
            mode="text"
            onPress={() => props.onPress?.()}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  const screenOptionsWithHeader = {
    headerLeft: (props: any) => headerBackButton(props),
    headerShown: true,
    title: '',
    headerStyle: {
      backgroundColor: DefaultTheme.colors.background,
      elevation: 0,
      shadowOpacity: 0,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReadyHandler}
        onStateChange={onNavigationStateChangeHandler}>
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
          {!user ? (
            <>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Group
                navigationKey="SignUp"
                screenOptions={screenOptionsWithHeader}>
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                />
              </Stack.Group>
            </>
          ) : (
            <>
              <Stack.Screen
                name="PostAuthTransitionScreen"
                component={PostAuthTransitionScreen}
              />
              <Stack.Group
                navigationKey="ProfileCompletion"
                screenOptions={screenOptionsWithHeader}>
                <Stack.Screen
                  name="ProfileCompletionScreen"
                  component={ProfileCompletionScreen}
                />
                <Stack.Screen
                  name="ProfileImageScreen"
                  component={ProfileImageScreen}
                />
              </Stack.Group>
              <Stack.Screen name="MainDashboard" component={DashboardRoute} />
              <Stack.Screen
                name="CreateCardScreen"
                component={CreateCardScreen}
              />
              <Stack.Screen
                name="CreateTransactionScreen"
                component={CreateTransactionScreen}
                // options={screenOptionsWithHeader}
              />
              <Stack.Screen
                name="ActivityListScreen"
                component={ActivityListScreen}
                options={screenOptionsWithHeader}
              />
            </>
          )}
          {/* <Stack.Group screenOptions={{presentation: 'modal'}}></Stack.Group> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const DashboardRoute = () => (
  <Tab.Navigator
    tabBar={BottomTabBar} // Max 4 Screen with current tab Bar
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="HomeScreen" component={HomeScreen} />
    <Tab.Screen name="WalletScreen" component={WalletListScreen} />
    <Tab.Screen name="OverviewScreen" component={AboutScreen} />
    {/* <Tab.Screen name="DeveloperScreen2" component={Dev} /> */}
  </Tab.Navigator>
);

// const DashboardRoute = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Drawer.Screen name="HomeScreen" component={HomeScreen} />
//       <Drawer.Screen name="AboutScreen" component={AboutScreen} />
//       <Drawer.Screen name="DeveloperScreen2" component={Dev} />
//     </Drawer.Navigator>
//   );
// };

export default Route;
