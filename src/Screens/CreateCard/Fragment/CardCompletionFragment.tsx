import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IWalletMain} from '@Types/WalletTypes';

type ICardCompletionFragmentProps = {
  onNextPress: () => void;
  cardData: IWalletMain;
};
const CardCompletionFragment = (props: ICardCompletionFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const [wallet, setWallet] = useState(props.cardData);

  useEffect(() => {
    setWallet(props.cardData);
  }, [props.cardData]);

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={{alignItems: 'center', flex: 1}}>
        <WalletCard orientation="landscape" wallet={wallet} />
      </View>
      <Button onPress={props.onNextPress} label="Finish" mode="contained" />
    </View>
  );
};

export default CardCompletionFragment;

const styles = StyleSheet.create({});
