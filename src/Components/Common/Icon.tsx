import React, {forwardRef} from 'react';
import {TextStyle} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

enum IconMode {
  outline,
  filled,
  sharp,
}

enum IconList {
  'arrow-back',
  'at',
  'calendar',
  'card',
  'cash',
  'checkmark',
  'chevron-back',
  'close',
  'desktop',
  'eye',
  'eye-off',
  'home',
  'lock-closed',
  'lock-open',
  'logo-usd',
  'mail',
  'notifications',
  'pencil',
  'person',
  'rocket',
}

enum LogoList {
  'logo-xing',
  'logo-xbox',
  'logo-windows',
  'logo-vk',
  'logo-venmo',
  'logo-usd',
  'logo-twitter',
  'logo-twitch',
  'logo-whatsapp',
  'logo-tumblr',
  'logo-tableau',
  'logo-stencil',
  'logo-steam',
  'logo-soundcloud',
  'logo-snapchat',
  'logo-playstation',
  'logo-pinterest',
  'logo-paypal',
  'logo-octocat',
  'logo-medium',
  'logo-mastodon',
  'logo-linkedin',
  'logo-google-playstore',
  'logo-google',
  'logo-github',
  'logo-firebase',
  'logo-facebook',
  'logo-euro',
  'logo-dropbox',
  'logo-dribbble',
  'logo-discord',
  'logo-deviantart',
  'logo-capacitor',
  'logo-buffer',
  'logo-bitcoin',
  'logo-behance',
  'logo-apple-ar',
  'logo-apple-appstore',
  'logo-apple',
  'logo-android',
  'logo-amazon',
  'logo-alipay',
  'balloon-outline',
  'bonfire-outline',
  'basketball-outline',
  'cash-outline',
  'card-outline',
  'desktop-outline',
  'rocket-outline',
  'school-outline',
  'skull-outline',
  'telescope-outline',
  'wallet-outline',
  'thunderstorm-outline',
}

export type IIconMode = keyof typeof IconMode;
export type IIconName = keyof typeof IconList;
export type ILogoName = keyof typeof LogoList;

export type IIconProps = {
  name?: IIconName;
  size?: number;
  color?: string;
  mode?: IIconMode;
  disabled?: boolean;
  onPress?: () => void;
  style?: TextStyle;
};

const getIconName = (name: IIconName, mode?: IIconMode): string => {
  const selectedMode = mode || 'outline';
  if (name.includes('logo')) return name;
  if (name.includes('outline')) return name;
  return name + (selectedMode === 'filled' ? '' : `-${selectedMode}`);
};

/**
 * Icon components extends RN Vector icons using IonIcons
 *
 * @param name icon name
 * @param size icon size
 * @param color icon color
 * @param mode icon mode
 *
 * @default "home"
 * @default 20
 * @default black
 * @default "outline"
 * @returns
 */
const Icon = forwardRef<IonIcon, IIconProps>((props, ref) => {
  const {name = 'home', size = 20, mode = 'outline'} = props; //default value

  const iconName = getIconName(name, mode);

  return (
    <IonIcon
      ref={ref}
      name={iconName}
      size={size}
      color={props.color}
      disabled={typeof props.onPress === 'undefined' || props.disabled}
      onPress={props.onPress}
      style={props.style}
    />
  );
});

export default Icon;
