import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from './Common/Button';
import IconButton from './Common/IconButton';
import ProgressBar, {IProgressBarProp} from './Common/ProgressBar';

type IHeaderModeTypes = 'normal' | 'overlay';
type IHeaderPropTypes = {
  mode?: IHeaderModeTypes;
  label?: string;
  onBackPressed?: () => void;
  // showProgressBar?: boolean;
  progressBar?: IProgressBarProp;
  hideBackButton?: boolean;
};

const Header = (prop: IHeaderPropTypes) => {
  const currentMode = prop.mode || 'normal';
  const safeArea = useSafeAreaInsets();
  return (
    <>
      <View style={[{paddingTop: safeArea.top}, styles.RootContainer]}>
        {!prop.hideBackButton && currentMode === 'normal' ? (
          <Button
            label={prop.label || 'Back'}
            onPress={() => prop.onBackPressed?.()}
            icon={{name: 'chevron-back'}}
            mode="text"
          />
        ) : null}
        {/* <IconButton name="chevron-back" onPress={() => {}} mode="icon" /> */}
        {/* <Text>Header</Text> */}
      </View>
      {prop.progressBar && <ProgressBar {...prop.progressBar} />}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
