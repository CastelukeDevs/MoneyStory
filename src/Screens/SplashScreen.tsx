import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {IMainNavPropTypes} from '../Routes/RouteTypes';

const SplashScreen: FC<IMainNavPropTypes<'SplashScreen'>> = props => {
  const {navigation, route} = props;
  const onClickHandlerTest = () => {
    navigation.navigate('MainDashboard', {screen: 'HomeScreen'});
  };
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
