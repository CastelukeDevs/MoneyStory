import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import APICall from '@Utilities/APIs/APIRequest';

import Button from '@Components/Common/Button';
import {getUserData} from '@Redux/Actions/UserAction';
import {resetAuth} from '@Redux/Reducers/UserReducer';
import {RootStateType} from '@Redux/Store';
import {IMainNavPropTypes} from '@Routes/RouteTypes';

const PostAuthTransitionScreen = (
  props: IMainNavPropTypes<'PostAuthTransitionScreen'>,
) => {
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootStateType) => state.user);

  useEffect(() => {
    dispatch(getUserData());
    return () => {};
  }, []);

  useEffect(() => {
    if (!user.isLoading && !user.isSuccess && user.userProfileData == null)
      return props.navigation.replace('ProfileCompletionScreen');
    props.navigation.replace('MainDashboard', {screen: 'HomeScreen'});
  }, []);

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
