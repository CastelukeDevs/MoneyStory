import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {IUserMain, IUserType} from '@Types/UserType';
import {IWallet} from '@Types/WalletTypes';

type IProfileParams = {
  mode: 'create' | 'edit';
  data?: IUserType | IUserMain;
};

export type IMainNav = {
  SplashScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;

  ProfileCompletionScreen: IProfileParams;
  ProfileImageScreen: IProfileParams;

  ForgotPasswordScreen: undefined;

  PostAuthTransitionScreen: undefined;
  MainDashboard: NavigatorScreenParams<ITabNav>;

  PasswordScreen: undefined;
  CreateCardScreen: undefined;
  // WalletListScreen: undefined;
  ActivityListScreen: undefined;
  CreateTransactionScreen: undefined;
  WalletDetailScreen: {wallet: IWallet};
};

export type IDashNav = {
  HomeScreen: undefined;
  AboutScreen: undefined;
  DeveloperScreen2: {def: boolean; testProp?: string};
};

export type ITabNav = {
  HomeScreen: undefined;
  OverviewScreen: undefined;
  WalletScreen: undefined;
  ProfileScreen: undefined;
};
// export type IDashNavPropTypes<T extends keyof IDashNav> = DrawerScreenProps<
//   IDashNav,
//   T
// >;

export type IMainNavPropTypes<T extends keyof IMainNav> = StackScreenProps<
  IMainNav,
  T
>;

export type IDashNavPropTypes<T extends keyof IDashNav> = CompositeScreenProps<
  DrawerScreenProps<IDashNav, T>,
  IMainNavPropTypes<keyof IMainNav>
>;

export type ITabNavPropTypes<T extends keyof ITabNav> = CompositeScreenProps<
  BottomTabScreenProps<ITabNav, T>,
  IMainNavPropTypes<keyof IMainNav>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IMainNav {}
  }
}
