import React, {FC, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {getUserAccount} from '@Redux/Actions/AccountAction';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IDashNavPropTypes} from '@Routes/RouteTypes';

import GlobalColor from '@Utilities/Styles/GlobalColor';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import FormatCurrency from '@Utilities/String/Currency/FormatCurrency';

import Button from '@Components/Common/Button';
import IconButton from '@Components/Common/IconButton';
import Icon from '@Components/Common/Icon';
import AvatarPills from '@Components/AvatarPills';
import WalletCard from '@Components/WalletCard';
import SearchBar from '@Components/SearchBar';
import ActivityListCard from '@Components/ActivityListCard';

const HomeScreen = ({navigation}: IDashNavPropTypes<'HomeScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const userState = useSelector((state: IRootStateType) => state.user);
  const {accountData, currency} = useSelector(
    (state: IRootStateType) => state.account,
  );

  const userData = userState.userProfileData;

  useEffect(() => {
    dispatch(getUserAccount());
    return () => {};
  }, []);

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

  const onCardEmptyPressHandler = () => {
    navigation.navigate('CreateCardScreen');
  };

  const balance = useMemo(
    () => FormatCurrency(accountData?.totalBalance!, currency),
    [accountData?.totalBalance],
  );

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
          <Text style={styles.HeroTextGey}>{balance.symbol}</Text>
          <Text>{' ' + balance.whole}</Text>
          <Text style={styles.HeroTextGey}>{balance.decimal}</Text>
        </Text>
        <Text style={[textStyle.Content_Light]}>+0,0 (0,00%)</Text>
      </View>
      <View style={styles.SectionContainer}>
        <View style={styles.SectionHeader}>
          <Text style={textStyle.Title_Bold}>Your Wallet</Text>
          <Text style={textStyle.Content_Regular}>See All</Text>
        </View>
        <ScrollView horizontal>
          <WalletCard
            isEmpty
            onPress={onCardEmptyPressHandler}
            orientation="portrait"
          />
          <WalletCard />
        </ScrollView>
      </View>
      <View style={styles.SectionContainer}>
        <View style={styles.SectionHeader}>
          <Text style={textStyle.Title_Bold}>Your Activities</Text>
          <Text style={textStyle.Content_Regular}>See All</Text>
        </View>
        <SearchBar />
        <ActivityListCard />
        <ActivityListCard />
        <ActivityListCard />
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
  SectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeroTextGey: {
    color: GlobalColor.overlay,
  },
});
