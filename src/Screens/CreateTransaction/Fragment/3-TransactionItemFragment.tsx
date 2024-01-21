import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeStyle} from '@Utilities/Styles/GlobalStyle';
import {ITransactionFragmentProps} from '@Types/FragmentTypes';

import Button from '@Components/Common/Button';

const TransactionItemFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[ThemeStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View style={styles.ImageContainer}>
        <Text>aweasd</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="Next" onPress={props.onNext} />
      </View>
    </View>
  );
};

export default TransactionItemFragment;

const styles = StyleSheet.create({
  ImageContainer: {flex: 1},
  ButtonContainer: {},
});
