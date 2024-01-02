import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IMainNavPropTypes} from '@Routes/RouteTypes';

import Header from '@Components/Header';

const CreateTransactionScreen = ({
  navigation,
}: IMainNavPropTypes<'CreateTransactionScreen'>) => {
  const backHandler = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Header label="Make Transaction" onBackPressed={backHandler} />
      <Text>CreateTransactionScreen</Text>
    </View>
  );
};

export default CreateTransactionScreen;

const styles = StyleSheet.create({});
