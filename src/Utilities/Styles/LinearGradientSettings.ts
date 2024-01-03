import {StyleSheet} from 'react-native';
import GlobalColor from './GlobalColor';

export const LinearGradientProps = {
  style: StyleSheet.absoluteFillObject,
  colors: [
    GlobalColor.dark,
    GlobalColor.dark,
    GlobalColor.dark,
    GlobalColor.overlay80,
    GlobalColor.overlay80,
    GlobalColor.overlay25,
    // '#00000000',
    // '#00000000',
  ],
  useAngle: true,
  angle: 35,
  angleCenter: {x: 0.5, y: 0.5},
};
