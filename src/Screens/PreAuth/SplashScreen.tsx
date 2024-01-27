import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IMainNavProp} from '../../Routes/RouteTypes';

import {ThemeText, DefaultStyle} from '../../Utilities/Styles/GlobalStyle';
import GlobalColor from '../../Utilities/Styles/ThemeColor';
import getString from '../../Utilities/String/LanguageTools';

import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';
import Modal from '../../Components/Common/Modal';
import IconButton from '../../Components/Common/IconButton';
import Logo from '../../Components/Logo';

const SplashScreen = (props: IMainNavProp<'SplashScreen'>) => {
  const {navigation, route} = props;

  const [modalVisible, setModalVisible] = useState(false);

  const openModalHandler = () => {
    setModalVisible(true);
  };

  const signInHandler = () => {};

  const signUpHandler = () => {
    navigation.navigate('SignUpScreen');
  };

  const forgotPasswordHandler = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={DefaultStyle.Base}>
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

      <SafeAreaView style={[DefaultStyle.Base, styles.RootContainer]}>
        <View style={DefaultStyle.LogoArea}>
          <Logo />
        </View>
        <View style={[DefaultStyle.CenterArea, styles.BodyContainer]}>
          <Text style={ThemeText.LogoText}>{getString('APP_NAME')}</Text>
          <Text style={ThemeText.HeroText}>{getString('APP_TAGLINE')}</Text>
          <View style={DefaultStyle.StripeLine} />
        </View>
        <View
          style={[
            DefaultStyle.Base,
            {justifyContent: 'flex-end', padding: 20},
          ]}>
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
        {ModalLayout({
          onSignIn: signInHandler,
          onForgotPassword: forgotPasswordHandler,
          onSignUp: signUpHandler,
        })}
      </Modal>
    </View>
  );
};

//Move this layout elsewhere later
type IModalLayoutPropType = {
  onSignIn?: () => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
};

const ModalLayout = (prop: IModalLayoutPropType) => {
  return (
    <View style={{padding: 18}}>
      <Text style={ThemeText.Hero_Bold}>Login to your Account</Text>
      <TextInput
        label="Email"
        onChangeText={() => {}}
        value={''}
        iconLeading={{name: 'mail-outline'}}
        containerStyle={{marginTop: 12}}
      />
      <TextInput
        label="Password"
        onChangeText={() => {}}
        value={''}
        iconLeading={{name: 'lock-closed-outline'}}
        iconTrailing={{name: 'eye-outline'}}
        containerStyle={{marginTop: 12}}
      />
      <Button
        label="Login"
        containerStyle={{marginTop: 12}}
        onPress={() => {}}
      />
      <Button
        label="Forgot your Password?"
        containerStyle={{marginTop: 12}}
        mode="text"
        onPress={() => prop.onForgotPassword?.()}
      />
      <View style={{height: 50}} />
      <Text style={[ThemeText.Content_Regular, {textAlign: 'center'}]}>
        or continue with
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 12,
        }}>
        <IconButton
          name="logo-google"
          onPress={() => {
            console.log('pressed');
          }}
        />
        <IconButton
          name="logo-facebook"
          onPress={() => {
            console.log('pressed');
          }}
        />
        <IconButton
          name="logo-apple"
          onPress={() => {
            console.log('pressed');
          }}
        />
      </View>
      <View style={{height: 50}} />
      <Text style={{textAlign: 'center', marginBottom: 12}}>
        <Text style={ThemeText.SubTitle_Regular}>Don't have an account? </Text>
        <Text
          style={[ThemeText.SubTitle_Bold, ThemeText.hyperlink]}
          onPress={prop.onSignUp}>
          Sign up
        </Text>
      </Text>
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

export default SplashScreen;
