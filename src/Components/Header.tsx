import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon, {IIconName, IIconProps} from './Common/Icon';
import GlobalColor, {Opacity} from '@Utilities/Styles/ThemeColor';
import {Dimension, ThemeText} from '@Utilities/Styles/GlobalStyle';

type IHeaderModeTypes = 'normal' | 'highlights';
type IHeaderPropTypes = {
  mode?: IHeaderModeTypes;
  label?: string;
  onBackPressed?: () => void;
  onRightIconPressed?: () => void;
  rightIcon?: IIconProps;
  hideRightIcon?: boolean;
  // showProgressBar?: boolean;
  hideBackButton?: boolean;
  miniIcon?: IIconName;
  textColor?: string;
};
type IRenderIconParams = {
  hide?: boolean;
  iconName: IIconName;
  onPress?: () => void;
};

const Header = (props: IHeaderPropTypes) => {
  const inset = useSafeAreaInsets();

  const currentMode = props.mode || 'normal';
  const isHighlight = currentMode === 'highlights';
  const iconSize = 24;

  const emptyIcon = () => <View style={{width: iconSize, height: iconSize}} />;

  const renderIcon = (params: IRenderIconParams) => {
    if (params.hide) return emptyIcon();
    return (
      <Icon
        name={params.iconName}
        size={iconSize}
        color={GlobalColor.accent}
        onPress={params.onPress}
      />
    );
  };

  const renderMiniIcon = () => (
    <View style={styles.MiniIconContainer}>
      <Icon name={props.miniIcon} size={iconSize} color={GlobalColor.light} />
    </View>
  );

  return (
    <View style={[{paddingTop: inset.top}, styles.RootComponentContainer]}>
      <View style={[styles.ButtonGroupContainer]}>
        {isHighlight
          ? renderMiniIcon()
          : renderIcon({
              hide: props.hideBackButton,
              iconName: 'chevron-back',
              onPress: props.onBackPressed,
            })}
        <Text
          style={[
            ThemeText.Title_Bold,
            styles.Text,
            isHighlight ? ThemeText.H3_Bold : styles.TextCenter,
            {color: props.textColor || GlobalColor.dark},
          ]}>
          {isHighlight ? props.label?.toUpperCase() : props.label}
        </Text>
        {renderIcon({
          hide: props.hideRightIcon,
          iconName: 'ellipsis-vertical',
          onPress: props.onRightIconPressed,
        })}
        <Text
          style={[
            ThemeText.Hero_Bold,
            styles.TextOverlay,
            {color: props.textColor || GlobalColor.dark},
          ]}>
          {props.label}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootComponentContainer: {overflow: 'hidden'},
  ButtonGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Dimension.Space,
    paddingVertical: Dimension.SpaceM,
    bottom: 0,
    // backgroundColor: 'skyblue',
  },
  Text: {flex: 1},
  TextCenter: {textAlign: 'center'},
  TextOverlay: {
    position: 'absolute',
    left: 0,
    textAlign: 'center',
    fontSize: 84,
    zIndex: -1,
    opacity: 0.1,
    // bottom: -12,
    textAlignVertical: 'bottom',
  },
  MiniIconContainer: {
    padding: Dimension.SpaceM,
    borderRadius: Dimension.SpaceM,
    backgroundColor: GlobalColor.accent,
    marginRight: Dimension.Space,
  },
});
