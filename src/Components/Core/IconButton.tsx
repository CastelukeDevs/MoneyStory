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

type IIconButtonProp = {
  style?: ViewStyle;
  mode?: 'contained' | 'bordered';
  onPress: () => void;
} & IIconProps;

//TODO: add button disable function

/**
 *
 * @param props
 * @returns
 */
const IconButton = (props: IIconButtonProp) => {
  const currentMode = props.mode || 'contained';
  const currentLogoColor =
    props.mode === 'contained' ? GlobalColor.accent : GlobalColor.light;

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
          currentMode === 'contained'
            ? styles.ModeContainedContainer
            : styles.ModeBorderedContainer,
          props.style,
        ]}>
        <Icon {...props} color={currentLogoColor} />
      </View>
    </TouchableOpacity>
  );
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
