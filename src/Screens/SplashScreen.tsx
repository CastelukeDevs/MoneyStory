import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IMainNavPropTypes} from '../Routes/RouteTypes';
import {textStyle, viewStyle} from '../Utilities/Styles/GlobalStyle';
import GlobalColor from '../Utilities/Styles/GlobalColor';
import getString from '../Utilities/String/LanguageTools';

import Logo from '../Components/Logo';
import Button from '../Components/Core/Button';
import ModalDep from '../Components/Core/ModalDep';
import TextInput from '../Components/Core/TextInput';
import Modal from '../Components/Core/Modal';
import BottomSheet, {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';

const SplashScreen: FC<IMainNavPropTypes<'SplashScreen'>> = props => {
  const {navigation, route} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openModalHandler = () => {
    // navigation.navigate('SignInScreen');
    setModalVisible(true);
    console.log('press');
    handlePresentModalPress();
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  // const snapPoints = useMemo(() => ['50%', '100%'], []);
  // const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

  // const {
  //   animatedHandleHeight,
  //   animatedSnapPoints,
  //   animatedContentHeight,
  //   handleContentLayout,
  // } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
          <Button label="Unlock the possibilities" onPress={openModalHandler} />
        </View>
        {/* <BottomSheetModal
          ref={bottomSheetModalRef}
          // index={1}
          // snapPoints={snapPoints}
          // snapPoints={[200]}
          enableDynamicSizing={true}
          // enablePanDownToClose
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal> */}

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
          <Text>Modal</Text>
          <TextInput label="Email" value={email} onTextChange={setEmail} />
          <Button onPress={() => setModalVisible(false)} label="Close" />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  BodyContainer: {
    padding: 20,
    flex: 2,
  },
  contentContainer: {
    // height: 120,
    flex: 1,
    backgroundColor: 'skyblue',
  },
});

export default SplashScreen;
