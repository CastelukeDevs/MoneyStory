import React, {forwardRef, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
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
  isError?: boolean;
  showLabel?: boolean;
  labelStyle?: TextStyle;
  isMoney?: boolean;
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

  const [value, decimalValue] = props.value.toString().split('.');

  /**
   * Note - State:
   * - 0 = blur
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

  const animateTo = (state: number) => {
    inputState.value = withTiming(state, {duration});
  };

  useEffect(() => {
    console.log(`${props.label} is ${props.isError ? 'error' : 'ok'}`);
    if (props.isError) {
      animateTo(2);
    }
  }, [props.isError]);

  return (
    <>
      {props.showLabel && (
        <Text
          style={[
            textStyle.SubTitle_Regular,
            styles.LabelText,
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      )}
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
          value={value}
          onChangeText={v => {
            props.isMoney
              ? props.onChangeText(
                  parseFloat(v || '0.0').toString() +
                    '.' +
                    (decimalValue || ''),
                )
              : props.onChangeText(v);
          }}
          style={[inputPlatformStyle, textStyle.SubTitle_Regular]}
          placeholder={props.placeholder || props.label}
          ref={ref}
          onFocus={() => {
            animateTo(1);
          }}
          onBlur={() => {
            if (props.isError) return animateTo(2);
            animateTo(0);
          }}
        />
        {props.isMoney && (
          <>
            <Text>.</Text>
            <TextInputReact
              value={decimalValue || ''}
              onChangeText={v => {
                props.onChangeText(value + '.' + v);
              }}
              style={[
                inputPlatformStyle,
                {flex: 1},
                textStyle.SubTitle_Regular,
              ]}
              placeholder="00"
              maxLength={2}
              // ref={ref}
              onFocus={() => {
                animateTo(1);
              }}
              onBlur={() => {
                if (props.isError) return animateTo(2);
                animateTo(0);
              }}
            />
          </>
        )}

        {props.iconTrailing && (
          <View style={{marginLeft: 10}}>
            <Icon {...props.iconTrailing} />
          </View>
        )}
      </Animated.View>
    </>
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
  flex: 4,
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
  LabelText: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 4,
  },
});
