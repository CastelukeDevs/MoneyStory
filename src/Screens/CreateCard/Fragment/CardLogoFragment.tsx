import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IWalletMain} from '@Types/WalletTypes';
import LogoList from '@Utilities/LogoList';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';
import IconButton from '@Components/Common/IconButton';

type ICardLogoFragmentProps = {
  onNextPress: (cardData: IWalletMain) => void;
  onDataChange: (cardData: IWalletMain) => void;
  cardData: IWalletMain;
};
const CardLogoFragment = (props: ICardLogoFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const iconSizeApproximate = 42;
  const iconColumns = 6;
  const componentWidth = width - 60;
  const iconMargin =
    (componentWidth - iconSizeApproximate * iconColumns) / iconColumns / 2;

  const [wallet, setWallet] = useState<IWalletMain>(props.cardData);

  useEffect(() => {
    setWallet(props.cardData);
  }, [props.cardData]);

  const onNextPressHandler = () => {
    props.onNextPress(wallet);
    // props.onIconPress(wallet);
  };

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={{alignItems: 'center', flex: 1}}>
        <WalletCard orientation="landscape" wallet={props.cardData} />
        <FlatList
          style={{marginVertical: 12}}
          data={LogoList}
          keyExtractor={item => item.name}
          numColumns={6}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={{margin: iconMargin}}>
                <IconButton
                  name={item.name}
                  onPress={() => {
                    const newWallet: IWalletMain = {...wallet, logo: item.name};
                    props.onDataChange(newWallet);
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <Button onPress={onNextPressHandler} label="Next" mode="contained" />
    </View>
  );
};

export default CardLogoFragment;

const styles = StyleSheet.create({});
