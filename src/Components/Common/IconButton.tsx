import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon, {IIconProps} from './Icon';
import GlobalColor from '@Utilities/Styles/ThemeColor';

type IIconButtonMode = 'contained' | 'bordered' | 'icon';
type IIconButtonShape = 'box' | 'circle';

type IIconButtonPropTypes = {
  style?: ViewStyle;
  buttonMode?: IIconButtonMode;
  shape?: IIconButtonShape;
  onPress?: () => void;
} & IIconProps;

//TODO: add button disable function

/**
 * Icon button
 * @param props
 * @returns
 */
const IconButton = (props: IIconButtonPropTypes) => {
  const currentMode = props.buttonMode || 'contained';
  const currentShape = props.shape || 'box';
  const currentLogoColor =
    currentMode === 'contained' ? GlobalColor.light : GlobalColor.accent;

  return (
    <View
      style={[
        {
          padding: 12,
          borderRadius: currentShape === 'box' ? 12 : 100,
        },
        selectedContainerStyle(currentMode),
        props.style,
      ]}>
      <Icon
        {...props}
        style={undefined}
        mode="outline"
        color={props.color || currentLogoColor}
      />
    </View>
  );
};

const selectedContainerStyle = (selectedMode: IIconButtonMode) => {
  switch (selectedMode) {
    case 'bordered':
      return styles.ModeBorderedContainer;

    case 'contained':
      return styles.ModeContainedContainer;

    default:
      return null;
  }
};

export default IconButton;

const styles = StyleSheet.create({
  ModeContainedContainer: {
    borderWidth: 0,
    backgroundColor: GlobalColor.accent,
  },
  ModeBorderedContainer: {
    borderWidth: 1,
    borderColor: GlobalColor.accent,
  },
});
