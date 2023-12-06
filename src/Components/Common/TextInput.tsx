import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInputProps,
  TextInput as TextInputReact,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon, {IIconProps} from './Icon';
import GlobalColor from '../../Utilities/Styles/GlobalColor';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';

// type ITextInputMode = 'Outlined' | 'Circled' | 'Underlined';

type ITextInputBordered = {
  mode?: 'Outlined' | 'Circled';
};
type ITextInputUnderlined = {
  mode?: 'Underlined';
  lineColor?: string;
};

type IMergedTextInput = ITextInputBordered | ITextInputUnderlined;

type ITextInputProps = {
  // mode?: string;
  label: string;
  value: string;
  onChange: (str: string) => void;
  iconLeading?: IIconProps;
  iconTrailing?: IIconProps;
  style?: ViewStyle;
  options?: TextInputProps;
} & IMergedTextInput;

/**
 *
 * @returns
 */
const TextInput = (props: ITextInputProps) => {
  const currentMode = props.mode || 'Circled';

  const inputPlatformStyle =
    Platform.OS === 'ios' ? styles.InputIOS : styles.InputAndroid;

  return (
    <View
      style={[
        styles.CoreContainer,
        getModeStyle(currentMode),
        props.mode === 'Underlined' && {
          borderColor: props.lineColor || GlobalColor.dark,
        },
        props.style,
      ]}>
      {props.iconLeading && (
        <View style={{marginRight: 10}}>
          <Icon {...props.iconLeading} />
        </View>
      )}
      <TextInputReact
        {...props.options}
        style={[inputPlatformStyle, textStyle.SubTitle_Regular]}
        placeholder={props.label}
      />

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
const getModeStyle = (mode: ITextInputProps['mode']): ViewStyle => {
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
    borderColor: GlobalColor.dark,
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
