import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {firebase} from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@Redux/Store';
import {
  getTransaction,
  selectTransactionList,
} from '@Redux/Reducers/TransactionReducer';

import useUserBalance from '@Utilities/Hooks/useUserBalance';

import {IDashNavProp} from '@Routes/RouteTypes';
import {IWallet} from '@Types/WalletTypes';

import GlobalColor from '@Utilities/Styles/ThemeColor';
import {DefaultText} from '@Utilities/Styles/GlobalStyle';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';

import Button from '@Components/Common/Button';
import Icon from '@Components/Common/Icon';
import AvatarPills from '@Components/AvatarPills';
import WalletCard from '@Components/WalletCard';
import SearchBar from '@Components/SearchBar';
import ActivityListCard from '@Components/ActivityListCard';
import NewWalletCard from '@Components/NewWalletCard';
import {selectUserData} from '@Redux/Reducers/UserReducer';
import {selectWallets} from '@Redux/Reducers/WalletReducer';

const HomeScreen = ({navigation}: IDashNavProp<'HomeScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const totalBalance = useUserBalance();

  const userData = useSelector(selectUserData);
  const userWallets = useSelector(selectWallets);
  const transactionList = useSelector(selectTransactionList);

  useEffect(() => {
    dispatch(getTransaction());
  }, []);

  const balance = useMemo(
    () => FormatCurrency(totalBalance, userData?.defaultCurrency || 'IDR'),
    [totalBalance],
  );

  // const updateProfileHandler = () => {
  //   navigation.navigate('ProfileCompletionScreen', {
  //     mode: 'edit',
  //     data: userData!,
  //   });
  // };

  // const updateImageHandler = () => {
  //   navigation.navigate('ProfileImageScreen', {
  //     mode: 'edit',
  //     data: userData!,
  //   });
  // };

  const onNotificationPressHandler = () => {};

  const onNewWalletPressHandler = () => {
    navigation.navigate('CreateCardScreen');
  };

  const onCardPressHandler = (wallet: IWallet) => {
    navigation.navigate('WalletDetailScreen', {wallet});
  };

  const onLogoutHandler = () => {
    firebase.auth().signOut();
  };

  const onSeeAllWalletHandler = () => {
    navigation.navigate('MainDashboard', {screen: 'WalletScreen'});
  };

  const onSeeAllActivitiesHandler = () => {
    navigation.navigate('ActivityListScreen');
  };

  return (
    <View style={[{paddingTop: inset.top}, styles.RootScreenContainer]}>
      <View style={styles.HeaderContainer}>
        <AvatarPills user={userData!} />
        <View>
          <Icon
            onPress={onNotificationPressHandler}
            name="notifications-outline"
            color={GlobalColor.accent}
          />
        </View>
      </View>
      <ScrollView bounces={false}>
        <View style={styles.SectionContainer}>
          <Text style={DefaultText.Title_Bold}>Your Wealth</Text>
          <Text style={DefaultText.Hero_Bold}>
            <Text style={styles.BalanceTextGrey}>{balance.symbol}</Text>
            <Text>{' ' + balance.whole}</Text>
            <Text style={styles.BalanceTextGrey}>{balance.decimal}</Text>
          </Text>
          <Text style={[DefaultText.Content_Light]}>+0,0 (0,00%)</Text>
        </View>

        <View style={[styles.SectionContainer, {paddingHorizontal: 0}]}>
          <View style={[styles.SectionHeader, {paddingHorizontal: 14}]}>
            <Text style={DefaultText.Title_Bold}>Your Wallet</Text>
            <Text
              style={DefaultText.Content_Regular}
              onPress={onSeeAllWalletHandler}>
              See All
            </Text>
          </View>
          <FlatList
            data={userWallets}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={{paddingHorizontal: 14}}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={({item}) => (
              <WalletCard
                orientation="portrait"
                wallet={item}
                style={styles.CardStyle}
                onPress={() => onCardPressHandler(item)}
              />
            )}
            ListFooterComponent={NewWalletCard({
              onPress: onNewWalletPressHandler,
            })}
            ListFooterComponentStyle={{height: '100%'}}
          />
        </View>

        <View style={styles.SectionContainer}>
          <View style={styles.SectionHeader}>
            <Text style={DefaultText.Title_Bold}>Your Activities</Text>
            <Text
              style={DefaultText.Content_Regular}
              onPress={onSeeAllActivitiesHandler}>
              See All
            </Text>
          </View>
          <SearchBar />
          <View>
            {/**Using map since this is scaled vertically inside scroll view */}
            {transactionList.map(item => (
              <ActivityListCard
                key={item.id}
                containerStyle={styles.ActivityList}
                transaction={item}
              />
            ))}
          </View>
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
    paddingVertical: 8,
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
  BalanceTextGrey: {
    color: GlobalColor.dark,
    opacity: 0.6,
  },
  CardStyle: {
    marginRight: 12,
  },
  ActivityList: {
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
});
