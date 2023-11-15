import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput as TextInputReact,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon, {IIconProps} from './Icon';
import GlobalColor from '../../Utilities/Styles/GlobalColor';

// type ITextInputMode = 'Outlined' | 'Circled' | 'Underlined';

type ITextInputBorderedType = {
  mode?: 'Outlined' | 'Circled';
};
type ITextInputUnderlinedType = {
  mode?: 'Underlined';
  lineColor?: string;
};

type MergedTextInputType = ITextInputBorderedType | ITextInputUnderlinedType;

type ITextInputProp = {
  // mode?: string;
  label: string;
  value: string;
  onTextChange: (str: string) => void;
  iconLeading?: IIconProps;
  iconTrailing?: IIconProps;
} & MergedTextInputType;

/**
 *
 * @returns
 */
const TextInput = (props: ITextInputProp) => {
  const currentMode = props.mode || 'Circled';

  const inputPlatformStyle =
    Platform.OS === 'ios' ? styles.InputIOS : styles.InputAndroid;

  return (
    <View
      style={[
        styles.CoreContainer,
        getCodeStyle(currentMode),
        props.mode === 'Underlined' && {
          borderColor: props.lineColor || GlobalColor.primary,
        },
      ]}>
      {props.iconLeading && (
        <View style={{marginRight: 10}}>
          <Icon {...props.iconLeading} />
        </View>
      )}
      <TextInputReact style={[inputPlatformStyle]} placeholder={props.label} />

      {props.iconTrailing && (
        <View style={{marginLeft: 10}}>
          <Icon {...props.iconTrailing} />
        </View>
      )}
    </View>
  );
};

export default TextInput;

//Style utilities
const getCodeStyle = (mode: ITextInputProp['mode']): ViewStyle => {
  switch (mode) {
    case 'Underlined':
      return styles.ContainerUnderlinedMode;
    case 'Outlined':
      return styles.ContainerOutlinedMode;
    default:
      return styles.ContainerCircledMode;
  }
};

const baseInputStyle: TextStyle = {
  flex: 1,
  fontSize: 14,
  // backgroundColor: 'red',
};

const baseBorderedContainerStyle: ViewStyle = {
  paddingHorizontal: 16,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  CoreContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GlobalColor.primary,
  },
  InputIOS: {
    ...baseInputStyle,
    paddingVertical: 4,
  },
  InputAndroid: {
    ...baseInputStyle,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  ContainerCircledMode: {
    ...baseBorderedContainerStyle,
    borderRadius: 1000,
  },
  ContainerOutlinedMode: {
    ...baseBorderedContainerStyle,
    borderRadius: 12,
  },
  ContainerUnderlinedMode: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
});
