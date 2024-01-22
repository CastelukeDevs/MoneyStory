import {StyleSheet} from 'react-native';
import GlobalColor, {Opacity} from '../Styles/ThemeColor';

export const LinearGradientProps = {
  style: StyleSheet.absoluteFillObject,
  colors: [
    GlobalColor.dark,
    GlobalColor.dark,
    GlobalColor.dark,
    GlobalColor.dark + Opacity[80],
    GlobalColor.dark + Opacity[80],
    GlobalColor.dark + Opacity[25],
  ],
  useAngle: true,
  angle: 35,
  angleCenter: {x: 0.5, y: 0.5},
};
