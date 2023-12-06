import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalColor from '../../Utilities/Styles/GlobalColor';

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
    paddingHorizontal: 4,
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
    backgroundColor: GlobalColor.overlay,
  },
});
