import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import Icon, {IIconProps} from '@Components/Common/Icon';
import {DefaultText} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/ThemeColor';

type IButtonPropTypes = {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  mode?: 'contained' | 'text';
  icon?: IIconProps;
};

//TODO: add disable button function

/**
 *
 * @param label string
 * @param onPress function
 * Simple button
 */
const Button = (props: IButtonPropTypes) => {
  const currentMode = props.mode || 'contained';

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[
        currentMode === 'contained' && {
          backgroundColor: GlobalColor.accent,
          borderRadius: 100,
        },
        {
          padding: 12,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.containerStyle,
      ]}>
      {props.icon && (
        <Icon
          {...props.icon}
          color={
            currentMode === 'contained' ? GlobalColor.light : GlobalColor.accent
          }
        />
      )}
      {props.label && (
        <Text
          style={[
            DefaultText.SubTitle_Bold,
            {textAlign: 'center', marginHorizontal: 12},
            {
              color:
                currentMode === 'contained'
                  ? GlobalColor.light
                  : GlobalColor.accent,
            },
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
