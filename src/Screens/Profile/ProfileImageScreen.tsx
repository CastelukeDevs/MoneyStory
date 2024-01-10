import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {createUserData, updateUserData} from '@Redux/Actions/UserAction';
import {launchImageLibrary, Asset} from 'react-native-image-picker';

import {IMainNavPropTypes} from '@Routes/RouteTypes';

import {textStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/GlobalColor';

import Button from '@Components/Common/Button';
import {PickerOption} from '@Utilities/Settings/ImagePicker';

const SignUpImageScreen = (props: IMainNavPropTypes<'ProfileImageScreen'>) => {
  const payload = props.route.params;

  const inset = useSafeAreaInsets();

  const isCreate = payload.mode === 'create';

  console.log('screen payload', payload);

  const width = useWindowDimensions().width;
  const dispatch = useDispatch<any>();

  const [image, setImage] = useState<Asset>();

  const imageUri = image?.uri || payload.data?.avatarUrl;

  console.log('image uri', imageUri);

  const imageSize = (width / 4) * 3;

  const onImagePress = async () => {
    await launchImageLibrary(PickerOption).then(res => {
      console.log('image result', res);
      setImage(res.assets?.[0]);
    });
  };

  const onSubmitHandler = () => {
    const img = {
      uri: image?.uri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    };
    if (isCreate) {
      dispatch(createUserData({data: {...payload.data!, avatar: img}})).then(
        () => {
          props.navigation.replace('PostAuthTransitionScreen');
        },
      );
    } else {
      dispatch(updateUserData({data: {avatar: img}})).then(() => {
        props.navigation.replace('PostAuthTransitionScreen');
      });
    }
  };

  const onCancelHandler = () => {
    props.navigation.navigate('MainDashboard', {screen: 'HomeScreen'});
  };

  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios'
          ? {paddingBottom: inset.bottom}
          : {paddingBottom: 16},
      ]}>
      <Text style={textStyle.Hero_Bold}>
        {isCreate ? 'Add your profile picture' : 'Change your profile picture'}
      </Text>
      <View style={{flex: 1, alignItems: 'center', marginTop: 48}}>
        <TouchableOpacity
          onPress={onImagePress}
          style={{
            width: imageSize,
            height: imageSize,
            backgroundColor: GlobalColor.accent,
          }}>
          <Image
            source={{uri: imageUri}}
            style={StyleSheet.absoluteFillObject}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonContainer}>
        {isCreate ? (
          <Button label="Submit" onPress={onSubmitHandler} />
        ) : (
          <>
            <Button label="Submit" onPress={onSubmitHandler} />
            <Button label="Cancel" mode="text" onPress={onSubmitHandler} />
          </>
        )}
      </View>
    </View>
  );
};

export default SignUpImageScreen;

const styles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  ButtonContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    zIndex: 0,
  },
});
