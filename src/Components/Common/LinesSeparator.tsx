import React from 'react';
import {View} from 'react-native';
import {DefaultStyle, Dimension} from '@Utilities/Styles/GlobalStyle';
import DashedLine from 'react-native-dashed-line';
import ThemeColor, {Opacity} from '@Utilities/Styles/ThemeColor';

const LinesSeparator = (props: {dashed?: boolean}) => (
  <>
    {props.dashed ? (
      <DashedLine
        dashThickness={1}
        dashLength={4}
        dashColor={ThemeColor.dark}
        style={{
          marginVertical: Dimension.SpaceM,
          opacity: 0.2,
        }}
      />
    ) : (
      <View
        style={[DefaultStyle.InvisLine, {marginVertical: Dimension.SpaceM}]}
      />
    )}
  </>
);

export default LinesSeparator;
