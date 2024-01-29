import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import Icon, {IIconProps} from '@Components/Common/Icon';
import {Dimension, ThemeText} from '@Utilities/Styles/GlobalStyle';
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
//TODO: add bordered mode

/**
 *
 * @param label string
 * @param onPress function
 * @param mode "contained" / "text"
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
          borderRadius: Dimension.RadiusFull,
        },
        {
          padding: Dimension.Space,
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
            ThemeText.SubTitle_Bold,
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
