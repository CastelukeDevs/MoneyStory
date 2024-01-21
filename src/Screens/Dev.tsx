import React, {FC} from 'react';

import {View, Text} from 'react-native';
import {IDashNavProp} from '../Routes/RouteTypes';

const Dev: FC<IDashNavProp<'DeveloperScreen2'>> = props => {
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
