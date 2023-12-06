import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Icon, {IIconProps} from './Icon';
import GlobalColor from '../../Utilities/Styles/GlobalColor';

type IIconButtonModeTypes = 'contained' | 'bordered' | 'icon';

type IIconButtonPropTypes = {
  style?: ViewStyle;
  mode?: IIconButtonModeTypes;
  onPress: () => void;
} & IIconProps;

//TODO: add button disable function

/**
 *
 * @param props
 * @returns
 */
const IconButton = (props: IIconButtonPropTypes) => {
  const currentMode = props.mode || 'contained';
  const currentLogoColor =
    currentMode === 'contained' ? GlobalColor.light : GlobalColor.accent;

  return (
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={() => props.onPress()}>
      <View
        style={[
          {
            padding: 12,
            borderRadius: 12,
          },
          selectedContainerStyle(currentMode),
          props.style,
        ]}>
        <Icon {...props} color={props.color || currentLogoColor} />
      </View>
    </TouchableOpacity>
  );
};

const selectedContainerStyle = (selectedMode: IIconButtonModeTypes) => {
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
