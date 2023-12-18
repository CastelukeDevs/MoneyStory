import {StyleSheet, TextStyle} from 'react-native';
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
  //Text style
  Hero_Regular: {color: GlobalColor.dark, fontSize: 40},
  Hero_Bold: {color: GlobalColor.dark, fontSize: 40, fontWeight: 'bold'},
  Hero_Light: {color: GlobalColor.dark, fontSize: 40, fontWeight: '200'},
  H1_Regular: {color: GlobalColor.dark, fontSize: 32},
  H1_Bold: {color: GlobalColor.dark, fontSize: 32, fontWeight: 'bold'},
  H1_Light: {color: GlobalColor.dark, fontSize: 32, fontWeight: '200'},
  H2_Regular: {color: GlobalColor.dark, fontSize: 24},
  H2_Bold: {color: GlobalColor.dark, fontSize: 24, fontWeight: 'bold'},
  H2_Light: {color: GlobalColor.dark, fontSize: 24, fontWeight: '200'},
  H3_Regular: {color: GlobalColor.dark, fontSize: 20},
  H3_Bold: {color: GlobalColor.dark, fontSize: 20, fontWeight: 'bold'},
  H3_Light: {color: GlobalColor.dark, fontSize: 20, fontWeight: '200'},
  Title_Regular: {color: GlobalColor.dark, fontSize: 16},
  Title_Bold: {color: GlobalColor.dark, fontSize: 16, fontWeight: 'bold'},
  Title_Light: {color: GlobalColor.dark, fontSize: 16, fontWeight: '200'},
  SubTitle_Regular: {color: GlobalColor.dark, fontSize: 14},
  SubTitle_Bold: {color: GlobalColor.dark, fontSize: 14, fontWeight: 'bold'},
  SubTitle_Light: {color: GlobalColor.dark, fontSize: 14, fontWeight: '200'},
  Content_Regular: {color: GlobalColor.dark, fontSize: 12},
  Content_Bold: {color: GlobalColor.dark, fontSize: 12, fontWeight: 'bold'},
  Content_Light: {color: GlobalColor.dark, fontSize: 12, fontWeight: '200'},
  hyperlink: {color: GlobalColor.accent},
});

// export default {viewStyle, textStyle};
