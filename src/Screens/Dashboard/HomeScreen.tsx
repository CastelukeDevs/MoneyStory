import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IDashNavPropTypes} from '@Routes/RouteTypes';

import Button from '@Components/Common/Button';

const HomeScreen = ({navigation}: IDashNavPropTypes<'HomeScreen'>) => {
  const inset = useSafeAreaInsets();

  const userData = useSelector((state: IRootStateType) => state.user);

  const updateProfileHandler = () => {
    navigation.navigate('ProfileCompletionScreen', {
      mode: 'edit',
      data: userData.userProfileData!,
    });
  };

  const updateImageHandler = () => {
    navigation.navigate('ProfileImageScreen', {
      mode: 'edit',
      data: userData.userProfileData!,
    });
  };

  return (
    <View style={[{paddingTop: inset.top}, styles.RootScreenContainer]}>
      <Text>HomeScreen</Text>
      <Button label="UpdateProfile" onPress={updateProfileHandler} />
      <Button label="UpdateAvatar" onPress={updateImageHandler} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
  },
});
