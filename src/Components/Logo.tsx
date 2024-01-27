import React, {FC} from 'react';
import Mons from '@Resources/MONS.svg';
import {StyleSheet, View} from 'react-native';
import GlobalColor from '@Utilities/Styles/ThemeColor';
import {Dimension} from '@Utilities/Styles/GlobalStyle';

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
    padding: Dimension.Space,
    backgroundColor: GlobalColor.light,
    // alignSelf: 'baseline',
    borderRadius: Dimension.Space,
  },
});

export default Logo;
