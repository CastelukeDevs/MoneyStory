import React, {FC} from 'react';

import {View, Text} from 'react-native';
import {IDashNavPropTypes} from '../Routes/RouteTypes';

const Dev: FC<IDashNavPropTypes<'DeveloperScreen2'>> = props => {
  const {navigation, route} = props;

  const test = () => {
    console.log('props', route.params);

    navigation.navigate('HomeScreen');
  };
  return (
    <View>
      <Text>Dev</Text>
    </View>
  );
};

export default Dev;
