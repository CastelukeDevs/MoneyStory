import React from 'react';
import {TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import {IIconName, ILogoName} from '@Types/CommonTypes';

export type IIconProps = {
  name?: IIconName | ILogoName;
  color?: string;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

const Icon = (props: IIconProps) => {
  const iconName = props.name || 'home';
  const iconColor = props.color || GlobalColor.dark;
  const iconSize = props.size || 20;
  const isDisabled = props.disabled || typeof props.onPress === 'undefined';

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
