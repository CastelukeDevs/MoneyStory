import {View, Text} from 'react-native';
import React from 'react';
import {ITabNavProp} from '../../Routes/RouteTypes';

export default function AboutScreen(props: ITabNavProp<'OverviewScreen'>) {
  const {navigation, route} = props;

  return (
    <View>
      <Text>AboutScreen</Text>
    </View>
  );
}
