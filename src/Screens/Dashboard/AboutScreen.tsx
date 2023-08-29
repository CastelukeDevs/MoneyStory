import {View, Text} from 'react-native';
import React from 'react';
import {IDashNavPropTypes, IMainNavPropTypes} from '../../Routes/RouteTypes';

export default function AboutScreen(props: IDashNavPropTypes<'AboutScreen'>) {
  const {navigation, route} = props;

  return (
    <View>
      <Text>AboutScreen</Text>
    </View>
  );
}
