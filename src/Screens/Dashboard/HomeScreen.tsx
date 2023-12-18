import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IDashNavPropTypes} from '@Routes/RouteTypes';

import Button from '@Components/Common/Button';
import AvatarPills from '@Components/AvatarPills';
import IconButton from '@Components/Common/IconButton';
import Icon from '@Components/Common/Icon';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import {textStyle} from '@Utilities/Styles/GlobalStyle';

const HomeScreen = ({navigation}: IDashNavPropTypes<'HomeScreen'>) => {
  const inset = useSafeAreaInsets();

  const userState = useSelector((state: IRootStateType) => state.user);

  const userData = userState.userProfileData;

  const updateProfileHandler = () => {
    navigation.navigate('ProfileCompletionScreen', {
      mode: 'edit',
      data: userState.userProfileData!,
    });
  };

  const updateImageHandler = () => {
    navigation.navigate('ProfileImageScreen', {
      mode: 'edit',
      data: userState.userProfileData!,
    });
  };

  const onNotificationPressHandler = () => {};

  return (
    <View style={[{paddingTop: inset.top}, styles.RootScreenContainer]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AvatarPills user={userData!} />
        <View>
          <Icon
            // onPress={onNotificationPressHandler}
            // shape="circle"
            name="notifications-outline"
            color={GlobalColor.accent}
          />
        </View>
      </View>
      {/**
       * //Todo: Populate properly later
       */}
      <View style={styles.SectionContainer}>
        <Text style={textStyle.Title_Bold}>Your Wealth</Text>
        <Text style={textStyle.Hero_Bold}>
          <Text style={styles.HeroTextGey}>Rp.</Text>
          <Text>{userData?.points}</Text>
          <Text style={styles.HeroTextGey}>,00</Text>
        </Text>
        <Text style={[textStyle.Content_Light]}>+0,0 (0,00%)</Text>
      </View>
      <View style={styles.SectionContainer}>
        <Text style={textStyle.Title_Bold}>Your Wallet</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  SectionContainer: {
    marginTop: 18,
  },
  HeroTextGey: {
    color: GlobalColor.overlay,
  },
});
