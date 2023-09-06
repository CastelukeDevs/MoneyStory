import {StyleSheet} from 'react-native';
import GlobalColor from './GlobalColor';

export const viewStyle = StyleSheet.create({
  Base: {flex: 1},
  LogoArea: {flex: 1, justifyContent: 'center'},
  CenterArea: {flex: 2, justifyContent: 'space-between'},
  StripeLine: {
    height: 2,
    width: 200,
    backgroundColor: GlobalColor.light,
  },
});

export const textStyle = StyleSheet.create({
  LogoText: {color: GlobalColor.light, fontWeight: 'bold', fontSize: 24},
  HeroText: {color: GlobalColor.light, fontWeight: '200', fontSize: 54},
  ButtonText: {color: GlobalColor.light, fontWeight: 'bold', fontSize: 14},
});

// export default {viewStyle, textStyle};
