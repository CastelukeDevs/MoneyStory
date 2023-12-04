import React from 'react';
import {TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import GlobalColor from '../../Utilities/Styles/GlobalColor';

export type IIconProps = {
  name?: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

const Icon = (props: IIconProps) => {
  const iconName = props.name || 'home';
  const iconColor = props.color || GlobalColor.dark;
  const iconSize = props.size || 20;
  const isDisabled = props.disabled || typeof props.onPress !== 'function';

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={{height: iconSize, width: iconSize}}
      onPress={() => props.onPress?.()}>
      <IonIcon
        name={iconName}
        color={iconColor}
        size={iconSize}
        // onPress={() => props.onPress?.()}
      />
    </TouchableOpacity>
  );
};

export default Icon;
