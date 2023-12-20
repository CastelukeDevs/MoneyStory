import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProgressBar, {IProgressBarProp} from './Common/ProgressBar';
import Button from './Common/Button';
import Icon, {IIconProps} from './Common/Icon';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import {textStyle} from '@Utilities/Styles/GlobalStyle';

type IHeaderModeTypes = 'normal' | 'overlay';
type IHeaderPropTypes = {
  mode?: IHeaderModeTypes;
  label?: string;
  onBackPressed?: () => void;
  onRightIconPressed?: () => void;
  rightIcon?: IIconProps;
  hideRightIcon?: boolean;
  // showProgressBar?: boolean;
  hideBackButton?: boolean;
};

const Header = (props: IHeaderPropTypes) => {
  const currentMode = props.mode || 'normal';

  const safeArea = useSafeAreaInsets();
  return (
    <View style={[{paddingTop: safeArea.top}, styles.RootComponentContainer]}>
      <View style={[styles.ButtonGroupContainer]}>
        <Icon
          name="chevron-back"
          size={24}
          color={GlobalColor.accent}
          onPress={() => props.onBackPressed?.()}
        />
        <Text style={[textStyle.Title_Bold, styles.TextCenter]}>
          {props.label}
        </Text>
        {props.hideRightIcon ? (
          <View style={{width: 24}} />
        ) : (
          <Icon
            name="ellipsis-vertical"
            size={24}
            color={GlobalColor.accent}
            onPress={props.onRightIconPressed}
            {...props.rightIcon}
          />
        )}
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
  TextCenter: {
    textAlign: 'center',
    flex: 1,
  },
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
});
