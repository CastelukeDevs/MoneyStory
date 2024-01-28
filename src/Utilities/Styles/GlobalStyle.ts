import {Dimensions, StyleSheet} from 'react-native';
import GlobalColor from './ThemeColor';

const width = Dimensions.get('window').width;

export const DefaultStyle = StyleSheet.create({
  Base: {flex: 1},
  LogoArea: {flex: 1, justifyContent: 'center'},
  CenterArea: {flex: 2, justifyContent: 'space-between'},
  StripeLine: {
    height: 2,
    width: 200,
    backgroundColor: GlobalColor.light,
  },
  RootFragmentStyle: {width, flex: 1, paddingHorizontal: 18},
});

export const Dimension = {
  SpaceL: 18,
  Space: 12,
  SpaceM: 8,
  SpaceS: 4,
  TextMargin: 6,
  RadiusFull: 100,
  fontSize: {
    hero: 40,
    h1: 32,
    h2: 24,
    h3: 20,
    title: 16,
    subTitle: 14,
    content: 12,
  },
} as const;

export const ThemeText = StyleSheet.create({
  LogoText: {
    color: GlobalColor.light,
    fontWeight: 'bold',
    fontSize: Dimension.fontSize.h1,
  },
  HeroText: {color: GlobalColor.light, fontWeight: '200', fontSize: 54},
  ButtonText: {
    color: GlobalColor.light,
    fontWeight: 'bold',
    fontSize: Dimension.fontSize.subTitle,
  },
  //Text style
  Hero_Regular: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.hero,
  },
  Hero_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.hero,
    fontWeight: 'bold',
  },
  Hero_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.hero,
    fontWeight: '200',
  },
  H1_Regular: {color: GlobalColor.dark, fontSize: Dimension.fontSize.h1},
  H1_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.h1,
    fontWeight: 'bold',
  },
  H1_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.h1,
    fontWeight: '200',
  },
  H2_Regular: {color: GlobalColor.dark, fontSize: Dimension.fontSize.h1},
  H2_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.h1,
    fontWeight: 'bold',
  },
  H2_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.h1,
    fontWeight: '200',
  },
  H3_Regular: {color: GlobalColor.dark, fontSize: Dimension.fontSize.h3},
  H3_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.h3,
    fontWeight: 'bold',
  },
  H3_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.h3,
    fontWeight: '200',
  },
  Title_Regular: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.title,
  },
  Title_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.title,
    fontWeight: 'bold',
  },
  Title_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.title,
    fontWeight: '200',
  },
  SubTitle_Regular: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.subTitle,
  },
  SubTitle_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.subTitle,
    fontWeight: 'bold',
  },
  SubTitle_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.subTitle,
    fontWeight: '200',
  },
  Content_Regular: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.content,
  },
  Content_Bold: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.content,
    fontWeight: 'bold',
  },
  Content_Light: {
    color: GlobalColor.dark,
    fontSize: Dimension.fontSize.content,
    fontWeight: '200',
  },
  hyperlink: {color: GlobalColor.accent},
});

// export default {viewStyle, textStyle};
