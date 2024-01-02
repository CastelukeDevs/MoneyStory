import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import WalletCard from '@Components/WalletCard';
import {IMainNavPropTypes} from '@Routes/RouteTypes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const WalletListScreen = ({
  navigation,
}: IMainNavPropTypes<'WalletListScreen'>) => {
  const inset = useSafeAreaInsets();

  const userWallet = useSelector(
    (state: IRootStateType) => state.wallet.wallets,
  );

  const itemSeparator = () => <View style={{height: 12}} />;

  const onAddCardHandler = () => {
    navigation.navigate('CreateCardScreen');
  };

  return (
    <View>
      {/* <Text>WalletListScreen</Text> */}
      <FlatList
        data={userWallet}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <WalletCard wallet={item} orientation="landscape" />
        )}
        contentContainerStyle={[
          styles.FlatListContentContainer,
          {paddingBottom: inset.bottom + 12},
        ]}
        ItemSeparatorComponent={itemSeparator}
        ListFooterComponent={WalletCard({
          isEmpty: true,
          orientation: 'landscape',
          onPress: onAddCardHandler,
        })}
        ListFooterComponentStyle={styles.ListFooterComponent}
      />
    </View>
  );
};

export default WalletListScreen;

const styles = StyleSheet.create({
  FlatListContentContainer: {alignItems: 'center', paddingVertical: 12},
  ListFooterComponent: {marginTop: 12},
});
