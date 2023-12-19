import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon, {IIconProps} from './Icon';
import GlobalColor from '@Utilities/Styles/GlobalColor';

type IIconButtonMode = 'contained' | 'bordered' | 'icon';
type IIconButtonShape = 'box' | 'circle';

type IIconButtonPropTypes = {
  style?: ViewStyle;
  mode?: IIconButtonMode;
  shape?: IIconButtonShape;
  onPress?: () => void;
} & IIconProps;

//TODO: add button disable function

/**
 *
 * @param props
 * @returns
 */
const IconButton = (props: IIconButtonPropTypes) => {
  const currentMode = props.mode || 'contained';
  const currentShape = props.shape || 'box';
  const currentLogoColor =
    currentMode === 'contained' ? GlobalColor.light : GlobalColor.accent;

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => props.onPress?.()}>
        <View
          style={[
            {
              padding: 12,
              borderRadius: currentShape === 'box' ? 12 : 100,
            },
            selectedContainerStyle(currentMode),
            props.style,
          ]}>
          <Icon {...props} color={props.color || currentLogoColor} />
        </View>
      </TouchableOpacity>
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
