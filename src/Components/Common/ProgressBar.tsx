import React, {useMemo} from 'react';
import GlobalColor from '@Utilities/Styles/ThemeColor';
import {StyleSheet, View} from 'react-native';

export type IProgressBarProp = {
  indicatorCount?: number;
  indicatorActive?: number;
};
const ProgressBar = (props: IProgressBarProp) => {
  const currentCount = props.indicatorCount || 2;
  const currentActive = props.indicatorActive || 1;

  const indicator = useMemo(() => new Array(currentCount).fill(''), []);

  return (
    <View style={styles.RootContainer}>
      {indicator.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.IndicatorBase,
              i < currentActive
                ? styles.IndicatorActive
                : styles.IndicatorInactive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  RootContainer: {
    flexDirection: 'row',
    // paddingHorizontal: -2,
  },
  IndicatorBase: {
    height: 3,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 100,
  },
  IndicatorActive: {
    backgroundColor: GlobalColor.accent,
  },
  IndicatorInactive: {
    backgroundColor: GlobalColor.dark,
    opacity: 0.1,
  },
});
