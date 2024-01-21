import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IMainNavPropTypes} from '@Routes/RouteTypes';

import {ThemeText, ThemeStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor, {Opacity} from '@Utilities/Styles/GlobalColor';
import getString from '@Utilities/String/LanguageTools';
import {IUserAuth} from '@Types/AuthTypes';
import SignInUserEmailPassword from '@Utilities/Authentication/SignInUserEmailPassword';

import Button from '@Components/Common/Button';
import Modal from '@Components/Common/Modal';
import Logo from '@Components/Logo';
import SignInModal from './SignInModal';
import StringValidation from '@Utilities/Tools/ValidateString';

const SignInScreen = (props: IMainNavPropTypes<'SignInScreen'>) => {
  const {navigation, route} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [generalError, setGeneralError] = useState(false);

  const openModalHandler = () => {
    setModalVisible(true);
  };

  const signInHandler = async (prop: IUserAuth) => {
    console.log('sign in attempt', prop);
    await SignInUserEmailPassword(prop).catch(() => {
      setGeneralError(true);
      return;
    });
  };

  const signUpHandler = () => {
    navigation.navigate('SignUpScreen');
  };

  const forgotPasswordHandler = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={ThemeStyle.Base}>
      <Image
        // source={require('../Resources/bg-1.jpg')}
        source={require('../../Resources/Gradient/01.RoyalHeath.png')}
        style={[StyleSheet.absoluteFillObject, styles.CenterImage]}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: GlobalColor.dark + Opacity[50]},
        ]}
      />

      <SafeAreaView style={[ThemeStyle.Base, styles.RootContainer]}>
        <View style={ThemeStyle.LogoArea}>
          <Logo />
        </View>
        <View style={[ThemeStyle.CenterArea, styles.BodyContainer]}>
          <Text style={ThemeText.LogoText}>{getString('APP_NAME')}</Text>
          <Text style={ThemeText.HeroText}>{getString('APP_TAGLINE')}</Text>
          <View style={ThemeStyle.StripeLine} />
        </View>
        <View
          style={[ThemeStyle.Base, {justifyContent: 'flex-end', padding: 20}]}>
          <Button label="Unlock the possibilities" onPress={openModalHandler} />
        </View>
      </SafeAreaView>
      <Modal
        addTopPadding
        visible={modalVisible}
        onChange={open => {
          console.log(open ? 'modal is open' : 'modal is closed');
        }}
        onDismiss={() => {
          console.log('dismissed');

          setModalVisible(false);
        }}>
        <SignInModal
          onSignIn={signInHandler}
          onForgotPassword={forgotPasswordHandler}
          onSignUp={signUpHandler}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  RootContainer: {padding: 18},
  BodyContainer: {
    // padding: 20,
    flex: 2,
  },
  contentContainer: {
    // height: 120,
    flex: 1,
    backgroundColor: 'skyblue',
  },
  CenterImage: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});

export default SignInScreen;
