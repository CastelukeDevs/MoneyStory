import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {IMainNavPropTypes} from '../../Routes/RouteTypes';

const SignInScreen: FC<IMainNavPropTypes<'SignInScreen'>> = props => {
  const {navigation, route} = props;
  const goToSub = () => {
    navigation.navigate('MainDashboard', {screen: 'HomeScreen'});
  };
  return (
    <View>
      <Text>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;
