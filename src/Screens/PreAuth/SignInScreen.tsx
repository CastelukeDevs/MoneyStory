import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IMainNavPropTypes} from '@Routes/RouteTypes';

import {textStyle, viewStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import getString from '@Utilities/String/LanguageTools';
import {IUserAuth} from '@Types/Types';
import SignInUserEmailPassword from '@Utilities/Authentication/SignInUserEmailPassword';
import {
  IValidationResult,
  validateEmail,
  validatePassword,
} from '@Utilities/String/EmailPasswordValidation';

import Button from '@Components/Common/Button';
import Modal from '@Components/Common/Modal';
import Logo from '@Components/Logo';
import SignInModal from './SignInModal';

const SignInScreen = (props: IMainNavPropTypes<'SignInScreen'>) => {
  const {navigation, route} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<IValidationResult[]>([]);

  const openModalHandler = () => {
    setModalVisible(true);
  };

  const signInHandler = async (prop: IUserAuth) => {
    const isPasswordValid = validatePassword(prop.password);
    const isEmailValid = validateEmail(prop.email);
    if (isPasswordValid.length > 0) return setError(isPasswordValid);
    if (isEmailValid.length > 0) return setError(isEmailValid);

    console.log('sign in attempt', prop);

    await SignInUserEmailPassword(prop).catch(() => {
      return setError([
        {description: 'Email or Password is invalid', name: 'error'},
      ]);
    });
  };

  const signUpHandler = () => {
    navigation.navigate('SignUpScreen');
  };

  const forgotPasswordHandler = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={viewStyle.Base}>
      <Image
        // source={require('../Resources/bg-1.jpg')}
        source={require('../../Resources/Gradient/01.RoyalHeath.png')}
        style={[StyleSheet.absoluteFillObject, styles.CenterImage]}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: GlobalColor.overlay},
        ]}
      />

      <SafeAreaView style={[viewStyle.Base, styles.RootContainer]}>
        <View style={viewStyle.LogoArea}>
          <Logo />
        </View>
        <View style={[viewStyle.CenterArea, styles.BodyContainer]}>
          <Text style={textStyle.LogoText}>{getString('APP_NAME')}</Text>
          <Text style={textStyle.HeroText}>{getString('APP_TAGLINE')}</Text>
          <View style={viewStyle.StripeLine} />
        </View>
        <View
          style={[viewStyle.Base, {justifyContent: 'flex-end', padding: 20}]}>
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
          error={error}
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
