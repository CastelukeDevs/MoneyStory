import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';
import GlobalColor from '../../Utilities/Styles/GlobalColor';

type IButtonProp = {
  label: string;
  onPress: () => void;
};
const Button = (props: IButtonProp) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={{
        backgroundColor: GlobalColor.accent,
        padding: 12,
        borderRadius: 100,
      }}>
      <Text style={[textStyle.ButtonText, {textAlign: 'center'}]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
