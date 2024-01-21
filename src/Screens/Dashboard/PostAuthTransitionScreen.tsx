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
import {ThemeText} from '@Utilities/Styles/GlobalStyle';
import {getUserWallets} from '@Redux/Actions/WalletAction';
import {getUserAccount} from '@Redux/Actions/AccountAction';
import useInitializeEntry from '@Utilities/Hooks/useInitializeEntry';

const PostAuthTransitionScreen = (
  props: IMainNavPropTypes<'PostAuthTransitionScreen'>,
) => {
  const dispatch = useDispatch<any>();

  const init = useInitializeEntry();

  const {error, processName} = init;

  useEffect(() => {
    if (init.errorList.includes('user_data')) {
      return props.navigation.replace('ProfileCompletionScreen', {
        mode: 'create',
      });
    }
    if (init.total === init.progress && init.errorList.length < 1) {
      props.navigation.replace('MainDashboard', {screen: 'HomeScreen'});
    }
  }, [init]);

  return (
    <SafeAreaView style={styles.RootScreenContainer}>
      <Logo />
      <Text style={ThemeText.Hero_Bold}>Money Story</Text>
      <Text style={ThemeText.H3_Light}>
        getting {processName.replace('_', ' ')}
      </Text>
      {error && (
        <>
          <Text style={[ThemeText.H3_Light, {color: GlobalColor.error}]}>
            error {error}
          </Text>
          <Text style={[ThemeText.H3_Light, {color: GlobalColor.error}]}>
            Please try again later
          </Text>
        </>
      )}
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
