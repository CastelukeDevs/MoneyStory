import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {viewStyle} from '@Utilities/Styles/GlobalStyle';
import {ITransactionFragmentProps} from '@Types/FragmentTypes';

import Button from '@Components/Common/Button';

const TransactionImageFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[viewStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View style={styles.ImageContainer}>
        <Text>aweasd</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="Next" onPress={props.onNext} />
      </View>
    </View>
  );
};

export default TransactionImageFragment;

const styles = StyleSheet.create({
  ImageContainer: {flex: 1},
  ButtonContainer: {},
});
