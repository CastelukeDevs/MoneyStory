import React from 'react';
import {StyleSheet, TextInput as TextInputReact, View} from 'react-native';
import Icon from './Icon';

type ITextInputProp = {
  value: string;
  onTextChange: (str: string) => void;
  label: string;
};
/**
 *
 * @returns
 */
const TextInput = (props: ITextInputProp) => {
  return (
    <View style={styles.CoreContainer}>
      <Icon />
      <TextInputReact style={styles.InputStyle} />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  CoreContainer: {
    borderWidth: 2,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
  InputStyle: {
    paddingVertical: 0,
    backgroundColor: 'red',
    flex: 1,
  },
});
