import React, {FC, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
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
import useUserBalance from '@Utilities/Hooks/useUserBalance';
import APICall from '@Utilities/APIs/APICall';
import transformObject from '@Utilities/transformObject';
import {firebase} from '@react-native-firebase/auth';

const HomeScreen = ({navigation}: IDashNavPropTypes<'HomeScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const totalBalance = useUserBalance();

  const userState = useSelector(
    (state: IRootStateType) => state.user,
  ).userProfileData;
  const {currency} = useSelector((state: IRootStateType) => state.account);
  const userWallets = useSelector(
    (state: IRootStateType) => state.wallet,
  ).wallets;

  const balance = useMemo(
    () => FormatCurrency(totalBalance, currency),
    [totalBalance],
  );

  const userData = userState;

  const updateProfileHandler = () => {
    navigation.navigate('ProfileCompletionScreen', {
      mode: 'edit',
      data: userState!,
    });
  };

  const updateImageHandler = () => {
    navigation.navigate('ProfileImageScreen', {
      mode: 'edit',
      data: userState!,
    });
  };

  const onNotificationPressHandler = () => {};

  const onCardEmptyPressHandler = () => {
    navigation.navigate('CreateCardScreen');
  };

  const test = async () => {};

  const onLogoutHandler = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={[{paddingTop: inset.top}, styles.RootScreenContainer]}>
      {/* <Button label="api test" onPress={test} /> */}
      <View style={styles.HeaderContainer}>
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
      <ScrollView bounces={false}>
        <View style={styles.SectionContainer}>
          <Text style={textStyle.Title_Bold}>Your Wealth</Text>
          <Text style={textStyle.Hero_Bold}>
            <Text style={styles.HeroTextGey}>{balance.symbol}</Text>
            <Text>{' ' + balance.whole}</Text>
            <Text style={styles.HeroTextGey}>{balance.decimal}</Text>
          </Text>
          <Text style={[textStyle.Content_Light]}>+0,0 (0,00%)</Text>
        </View>

        <View style={[styles.SectionContainer, {paddingHorizontal: 0}]}>
          <View style={[styles.SectionHeader, {paddingHorizontal: 14}]}>
            <Text style={textStyle.Title_Bold}>Your Wallet</Text>
            <Text style={textStyle.Content_Regular}>See All</Text>
          </View>
          <FlatList
            data={userWallets}
            keyExtractor={item => item.id}
            horizontal
            // style={{backgroundColor: 'tomato'}}
            contentContainerStyle={{paddingHorizontal: 14}}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={({item, index}) => (
              <WalletCard
                orientation="portrait"
                wallet={item}
                style={styles.CardStyle}
              />
            )}
            ListFooterComponent={WalletCard({
              orientation: 'portrait',
              isEmpty: true,
              onPress: onCardEmptyPressHandler,
            })}
          />
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
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
          <ActivityListCard />
        </View>
        <Button label="Sign Out" onPress={onLogoutHandler} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  SectionContainer: {
    marginTop: 24,
    paddingHorizontal: 14,
  },
  SectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  HeroTextGey: {
    color: GlobalColor.overlay,
  },
  CardStyle: {
    marginRight: 12,
  },
});
