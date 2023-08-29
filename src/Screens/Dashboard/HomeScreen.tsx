import React, {FC} from 'react';

import {View, Text} from 'react-native';
import {IDashNavPropTypes} from '../../Routes/RouteTypes';

const HomeScreen: FC<IDashNavPropTypes<'HomeScreen'>> = props => {
  const {navigation, route} = props;
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
