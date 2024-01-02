import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProgressBar, {IProgressBarProp} from './Common/ProgressBar';
import Button from './Common/Button';
import Icon, {IIconProps} from './Common/Icon';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import {textStyle} from '@Utilities/Styles/GlobalStyle';

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
  miniIcon?: string;
};
type IRenderIconParams = {
  hide?: boolean;
  iconName: string;
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
            textStyle.Title_Bold,
            styles.Text,
            isHighlight ? textStyle.H3_Bold : styles.TextCenter,
          ]}>
          {isHighlight ? props.label?.toUpperCase() : props.label}
        </Text>
        {renderIcon({
          hide: props.hideRightIcon,
          iconName: 'ellipsis-vertical',
          onPress: props.onRightIconPressed,
        })}
        <Text style={[textStyle.Hero_Bold, styles.TextOverlay]}>
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
    paddingHorizontal: 14,
    paddingVertical: 12,
    bottom: 12,
    // backgroundColor: 'skyblue',
  },
  Text: {flex: 1},
  TextCenter: {textAlign: 'center'},
  TextOverlay: {
    position: 'absolute',
    // alignSelf: 'center',
    left: 0,
    // top: 0,
    // bottom: 0,
    textAlign: 'center',
    color: GlobalColor.overlay10,
    fontSize: 84,
    zIndex: -1,
  },
  MiniIconContainer: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: GlobalColor.accent,
    marginRight: 12,
  },
});
