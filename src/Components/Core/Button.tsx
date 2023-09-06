import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';
import GlobalColor from '../../Utilities/Styles/GlobalColor';

type IButtonProp = {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
};
/**
 *
 * @param label string
 * @param onPress function
 * Simple button
 */
const Button = (props: IButtonProp) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[
        {
          backgroundColor: GlobalColor.accent,
          padding: 12,
          borderRadius: 100,
        },
        props.containerStyle,
      ]}>
      <Text
        style={[textStyle.ButtonText, {textAlign: 'center'}, props.labelStyle]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
