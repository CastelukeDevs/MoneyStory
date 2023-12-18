import React, {FC} from 'react';
import Mons from '../Resources/MONS.svg';
import {StyleSheet, View} from 'react-native';
import GlobalColor from '@Utilities/Styles/GlobalColor';

type LogoPropTypes = {
  isSmall?: boolean;
};

const Logo: FC<LogoPropTypes> = props => {
  const size = props.isSmall ? 30 : 50;
  return (
    <View style={style.Base}>
      <Mons width={size} height={size} fill={GlobalColor.accent} />
    </View>
  );
};

const style = StyleSheet.create({
  Base: {
    padding: 12,
    backgroundColor: GlobalColor.light,
    alignSelf: 'baseline',
    borderRadius: 12,
  },
});

export default Logo;
