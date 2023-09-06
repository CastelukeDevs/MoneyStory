import React, {FC, useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IMainNavPropTypes} from '../Routes/RouteTypes';
import {textStyle, viewStyle} from '../Utilities/Styles/GlobalStyle';
import GlobalColor from '../Utilities/Styles/GlobalColor';
import getString from '../Utilities/String/LanguageTools';

import Logo from '../Components/Logo';
import Button from '../Components/Core/Button';
import Modal from '../Components/Core/Modal';

const SplashScreen: FC<IMainNavPropTypes<'SplashScreen'>> = props => {
  const {navigation, route} = props;

  const [modalVisible, setModalVisible] = useState(false);

  const onButtonPressHandler = () => {
    // navigation.navigate('SignInScreen');
    setModalVisible(true);
    console.log('press');
  };
  return (
    <View style={viewStyle.Base}>
      <Image
        source={require('../Resources/bg-1.jpg')}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: GlobalColor.overlay},
        ]}
      />

      <SafeAreaView style={viewStyle.Base}>
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
          <Button
            label="Unlock the possibilities"
            onPress={onButtonPressHandler}
          />
        </View>
      </SafeAreaView>
      <Modal
        visible={modalVisible}
        onDismiss={() => {
          console.log('dismissed');

          setModalVisible(false);
        }}>
        <Text>Modal</Text>
        <TextInput />
        <Button onPress={() => setModalVisible(false)} label="Close" />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  BodyContainer: {
    padding: 20,
    flex: 2,
  },
});

export default SplashScreen;
