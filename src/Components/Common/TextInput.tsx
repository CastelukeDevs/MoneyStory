import React, {forwardRef, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  TextInputProps,
  TextInput as TextInputReact,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Icon, {IIconProps} from './Icon';

import GlobalColor from '@Utilities/Styles/GlobalColor';
import {textStyle} from '@Utilities/Styles/GlobalStyle';

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
  onChangeText: (str: string) => void;
  iconLeading?: IIconProps;
  iconTrailing?: IIconProps;
  containerStyle?: ViewStyle;
  options?: TextInputProps;
  isError?: boolean | string;
} & IMergedTextInput &
  TextInputProps;

/**
 *
 * @returns
 */
const TextInput = forwardRef<TextInputReact, ITextInputProps>((props, ref) => {
  const currentMode = props.mode || 'Circled';
  const duration = 500;

  const inputPlatformStyle =
    Platform.OS === 'ios' ? styles.InputIOS : styles.InputAndroid;

  /**
   * State:
   * - 0 = normal
   * - 1 = focused
   * - 2 = error
   */
  const inputState = useSharedValue(0);

  const inputAnimationStyle = useAnimatedStyle(() => {
    const colorInterpolation = interpolateColor(
      inputState.value,
      [0, 1, 2],
      [GlobalColor.dark, GlobalColor.accent, GlobalColor.error],
    );
    return {
      borderColor: colorInterpolation,
    };
  });

  useEffect(() => {
    if (props.isError) {
      inputState.value = withTiming(2, {duration});
    }
  }, [props.isError]);

  // const iconAnimationColor = useAnimatedProps(() => {
  //   const colorInterpolation = interpolateColor(
  //     inputState.value,
  //     [0, 1, 2],
  //     [GlobalColor.dark, GlobalColor.accent, GlobalColor.overlay],
  //   );
  //   return colorInterpolation;
  // });

  return (
    <Animated.View
      style={[
        styles.CoreContainer,
        getModeStyle(currentMode),
        inputAnimationStyle,
        props.containerStyle,
      ]}>
      {props.iconLeading && (
        <View style={{marginRight: 10}}>
          <Icon {...props.iconLeading} />
        </View>
      )}
      <TextInputReact
        {...props}
        style={[inputPlatformStyle, textStyle.SubTitle_Regular]}
        placeholder={props.placeholder || props.label}
        ref={ref}
        onFocus={() => {
          inputState.value = withTiming(1, {duration});
        }}
        onBlur={() => {
          if (props.isError) inputState.value = withTiming(2, {duration});
          inputState.value = withTiming(0, {duration});
        }}
      />

      {props.iconTrailing && (
        <View style={{marginLeft: 10}}>
          <Icon {...props.iconTrailing} />
        </View>
      )}
    </Animated.View>
  );
});

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
