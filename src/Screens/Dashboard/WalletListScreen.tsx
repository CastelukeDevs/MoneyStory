import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import WalletCard from '@Components/WalletCard';
import {IMainNavPropTypes, ITabNavPropTypes} from '@Routes/RouteTypes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '@Components/Header';
import {IWallet} from '@Types/WalletTypes';
import NewWalletCard from '@Components/NewWalletCard';
import Icon from '@Components/Common/Icon';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/GlobalColor';

const WalletListScreen = ({navigation}: ITabNavPropTypes<'WalletScreen'>) => {
  const inset = useSafeAreaInsets();

  const userWallet = useSelector(
    (state: IRootStateType) => state.wallet.wallets,
  );

  const itemSeparator = () => <View style={{height: 12}} />;

  const onEmptyCardPressHandler = () => {
    navigation.navigate('CreateCardScreen');
  };

  const onCardPressHandler = (wallet: IWallet) => {
    navigation.navigate('WalletDetailScreen', {wallet});
  };

  return (
    <View style={{flex: 1}}>
      {/* <Text>WalletListScreen</Text> */}
      <Header label="My Wallet" mode="highlights" miniIcon="card-outline" />
      <FlatList
        style={{flex: 1}}
        data={userWallet}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <WalletCard
            wallet={item}
            orientation="landscape"
            onPress={() => onCardPressHandler(item)}
          />
        )}
        contentContainerStyle={[
          styles.FlatListContentContainer,
          // {paddingBottom: inset.bottom + 12},
        ]}
        ItemSeparatorComponent={itemSeparator}
        ListFooterComponent={NewWalletCard({
          onPress: onEmptyCardPressHandler,
        })}
        ListFooterComponentStyle={{width: '100%', marginTop: 12}}
      />
    </View>
  );
};

export default WalletListScreen;

const styles = StyleSheet.create({
  FlatListContentContainer: {alignItems: 'center', padding: 12},
});
