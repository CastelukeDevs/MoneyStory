import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '@Components/Common/Button';
import {getUserData} from '@Redux/Actions/UserAction';
import {IUserStateType, resetAuth} from '@Redux/Reducers/UserReducer';
import {IRootStateType} from '@Redux/Store';
import {IMainNavPropTypes} from '@Routes/RouteTypes';

import auth from '@react-native-firebase/auth';
import Logo from '@Components/Logo';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import {textStyle} from '@Utilities/Styles/GlobalStyle';

const PostAuthTransitionScreen = (
  props: IMainNavPropTypes<'PostAuthTransitionScreen'>,
) => {
  const dispatch = useDispatch<any>();

  const user: IUserStateType = useSelector(
    (state: IRootStateType) => state.user,
  );

  // auth().confirmPasswordReset()

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (initializing) {
      dispatch(getUserData());
      setInitializing(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log('fetch user status', user.status);
    setTimeout(() => {
      if (!initializing && user.status === 'error') {
        console.log('fetch user error', user.error);
        return props.navigation.replace('ProfileCompletionScreen', {
          mode: 'create',
        });
      } else if (!initializing && user.status === 'success') {
        props.navigation.replace('MainDashboard', {screen: 'HomeScreen'});
      }
    }, 1000);
  }, [user.status]);

  const testApiHandler = async () => {
    dispatch(resetAuth());
  };

  return (
    <SafeAreaView style={styles.RootScreenContainer}>
      <Logo />
      <Text style={textStyle.Hero_Bold}>Money Story</Text>
      {/* <Button label="test api" onPress={testApiHandler} /> */}
    </SafeAreaView>
  );
};

export default PostAuthTransitionScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    backgroundColor: GlobalColor.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
