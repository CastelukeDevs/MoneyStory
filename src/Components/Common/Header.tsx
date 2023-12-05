import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from './Button';
import IconButton from './IconButton';

type IHeaderPropTypes = {};

const Header = (prop: IHeaderPropTypes) => {
  const safeArea = useSafeAreaInsets();
  return (
    <>
      <View style={[{paddingTop: safeArea.top}, styles.RootContainer]}>
        <Button
          label="back"
          onPress={() => {}}
          icon={{name: 'chevron-back'}}
          mode="text"
        />
        <IconButton
          name="chevron-back"
          onPress={() => {}}
          mode="icon"
          color="red"
        />
        <Text>Header</Text>
      </View>
      <Button label="test" onPress={() => {}} />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootContainer: {
    flexDirection: 'row',
  },
});
