import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import {IRootStateType} from '@Redux/Store';

import {IDashNavPropTypes} from '@Routes/RouteTypes';

import Button from '@Components/Common/Button';

const HomeScreen: FC<IDashNavPropTypes<'HomeScreen'>> = props => {
  const userData = useSelector((state: IRootStateType) => state.user);

  const updateProfileHandler = () => {
    props.navigation.navigate('ProfileCompletionScreen', {
      mode: 'edit',
      data: userData.userProfileData!,
    });
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button label="UpdateProfile" onPress={updateProfileHandler} />
    </View>
  );
};

export default HomeScreen;
