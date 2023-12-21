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

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={styles.CardContainer}>
        <WalletCard orientation="landscape" wallet={props.cardData} />
      </View>
      <View style={styles.TextContainer}>
        <Text>Your wallet card is ready</Text>
        <Text>Press submit below to confirm your wallet creation</Text>
      </View>
      <Button onPress={props.onNextPress} label="Finish" mode="contained" />
    </View>
  );
};

export default CardCompletionFragment;

const styles = StyleSheet.create({
  CardContainer: {alignItems: 'center', flex: 1},
  TextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 12,
  },
});
