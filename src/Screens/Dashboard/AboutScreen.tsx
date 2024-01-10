import {View, Text} from 'react-native';
import React from 'react';
import {ITabNavPropTypes} from '../../Routes/RouteTypes';

export default function AboutScreen(props: ITabNavPropTypes<'OverviewScreen'>) {
  const {navigation, route} = props;

  return (
    <View>
      <Text>AboutScreen</Text>
    </View>
  );
}
