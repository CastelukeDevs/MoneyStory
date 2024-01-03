import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ITransactionFragmentProps} from '@Types/FragmentTypes';
import {viewStyle} from '@Utilities/Styles/GlobalStyle';

import Button from '@Components/Common/Button';

const TransactionReceiptFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[viewStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View style={styles.ImageContainer}>
        <Text>aweasd</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="Finish" onPress={props.onNext} />
      </View>
    </View>
  );
};

export default TransactionReceiptFragment;

const styles = StyleSheet.create({
  ImageContainer: {flex: 1},
  ButtonContainer: {},
});
