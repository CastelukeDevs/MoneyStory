import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import APICall from '@Utilities/APIs/APICall';

import Button from '@Components/Common/Button';
import {getUserData} from '@Redux/Actions/UserAction';
import {IUserStateType, resetAuth} from '@Redux/Reducers/UserReducer';
import {IRootStateType} from '@Redux/Store';
import {IMainNavPropTypes} from '@Routes/RouteTypes';

const PostAuthTransitionScreen = (
  props: IMainNavPropTypes<'PostAuthTransitionScreen'>,
) => {
  const dispatch = useDispatch<any>();

  const user: IUserStateType = useSelector(
    (state: IRootStateType) => state.user,
  );

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (initializing) {
      dispatch(getUserData());
      setInitializing(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log('load state', user.status);

    if (!initializing && user.status === 'error') {
      return props.navigation.replace('ProfileCompletionScreen');
    } else if (!initializing && user.status === 'success') {
      props.navigation.replace('MainDashboard', {screen: 'HomeScreen'});
    }

    // setTimeout(() => {
    //   if (!user.isLoading && !user.isSuccess && user.userProfileData == null)
    //     return props.navigation.replace('ProfileCompletionScreen');
    //   props.navigation.replace('MainDashboard', {screen: 'HomeScreen'});
    // }, 1000);
  }, [user.status]);

  const testApiHandler = async () => {
    // await APICall('GET_USER');
    dispatch(resetAuth());
  };

  return (
    <SafeAreaView>
      <Text>PostAuthTransitionScreen</Text>
      <Button label="test api" onPress={testApiHandler} />
    </SafeAreaView>
  );
};

export default PostAuthTransitionScreen;

const styles = StyleSheet.create({});
