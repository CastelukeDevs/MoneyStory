import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {getTransactionByWalletId} from '@Redux/Actions/TransactionAction';

import {IMainNavPropTypes} from '@Routes/RouteTypes';

import GlobalColor, {Opacity} from '@Utilities/Styles/GlobalColor';
import {LinearGradientProps} from '@Utilities/Settings/LinearGradient';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import FormatCurrency from '@Utilities/String/Currency/FormatCurrency';

import IconButton from '@Components/Common/IconButton';
import Header from '@Components/Header';
import SearchBar from '@Components/SearchBar';
import ActivityListCard from '@Components/ActivityListCard';

const WalletDetailsScreen = ({
  navigation,
  route,
}: IMainNavPropTypes<'WalletDetailScreen'>) => {
  const dispatch = useDispatch<any>();

  const wallet = route.params.wallet;
  const img = wallet.imageUrl;
  const walletBalance = FormatCurrency(+wallet.balance, wallet.currency);

  const transaction = useSelector(
    (state: IRootStateType) => state.transaction.walletTransaction[wallet.id],
  );
  console.log('transaction states', transaction);

  useEffect(() => {
    // if (isFocused)
    dispatch(getTransactionByWalletId({walletId: wallet.id}));
  }, []);

  const onBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.RootContainer}>
      <ScrollView
        style={styles.RootContainer}
        bounces={false}
        //
      >
        <View style={styles.ContentHeader}>
          {wallet.imageUrl && (
            <Image source={{uri: img}} style={StyleSheet.absoluteFill} />
          )}
          <LinearGradient {...LinearGradientProps} />
          <IconButton name={wallet.logo} />
          <View style={styles.ContentHeaderTextContainer}>
            <Text style={[textStyle.H3_Bold, styles.ContentHeaderText]}>
              {wallet.walletName}
            </Text>
            <Text style={[textStyle.H1_Bold, styles.ContentHeaderText]}>
              {walletBalance.format}
            </Text>
            <Text style={[textStyle.Content_Regular, styles.ContentHeaderText]}>
              +{wallet.monthDiff} ({wallet.percentDiff}%)
            </Text>
          </View>
        </View>

        <View style={{padding: 12}}>
          <Text style={[textStyle.H3_Bold, {marginBottom: 12}]}>
            Your Wallet History
          </Text>
          <SearchBar />
          {transaction &&
            transaction.transaction.map(item => (
              <ActivityListCard key={item.id} transaction={item} />
            ))}
        </View>
      </ScrollView>
      <View style={styles.HeaderContainer}>
        <Header
          label={wallet.walletName}
          onBackPressed={onBackHandler}
          textColor={GlobalColor.light}
        />
      </View>
    </View>
  );
};

export default WalletDetailsScreen;

const styles = StyleSheet.create({
  RootContainer: {flex: 1},
  HeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  ContentHeader: {
    height: 330,
    padding: 18,
    justifyContent: 'flex-end',
  },
  ContentHeaderTextContainer: {
    padding: 12,
    backgroundColor: GlobalColor.light + Opacity[12],
    borderRadius: 12,
    marginTop: 12,
  },
  ContentHeaderText: {
    color: GlobalColor.light,
  },
});
