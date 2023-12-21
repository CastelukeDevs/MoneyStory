import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput as RNInput,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IWalletMain} from '@Types/WalletTypes';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';
import TextInput from '@Components/Common/TextInput';

type ICardDetailsFragmentProps = {
  onNextPress: (cardData: IWalletMain) => void;
  onDataChange: (cardData: IWalletMain) => void;
  cardData: IWalletMain;
};
const CardDetailsFragment = (props: ICardDetailsFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const abbrRef = useRef<RNInput>(null);
  const balanceRef = useRef<RNInput>(null);
  const holderNameRef = useRef<RNInput>(null);
  const holderNumberRef = useRef<RNInput>(null);

  const [wallet, setWallet] = useState(props.cardData);

  useEffect(() => {
    setWallet(props.cardData);
  }, [props.cardData]);

  const onNextPressHandler = () => {
    props.onNextPress(wallet);
  };

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={styles.CardContainer}>
        <WalletCard
          orientation="landscape"
          wallet={props.cardData}
          style={{marginBottom: 18}}
        />
        <ScrollView style={{width: '100%'}} bounces={false}>
          <TextInput
            value={wallet.walletName}
            onChangeText={v => {
              const newWallet: IWalletMain = {...wallet, walletName: v};
              console.log('text change', newWallet);
              props.onDataChange(newWallet);
            }}
            label="Card Name"
            iconLeading={{name: 'card-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            showLabel
            onSubmitEditing={() => abbrRef.current?.focus()}
          />
          <TextInput
            ref={abbrRef}
            value={wallet.walletAbbreviation}
            onChangeText={v => {
              const newWallet: IWalletMain = {...wallet, walletAbbreviation: v};
              props.onDataChange(newWallet);
            }}
            label="Card Abbreviation"
            iconLeading={{name: 'card-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            showLabel
            onSubmitEditing={() => balanceRef.current?.focus()}
          />
          <TextInput
            ref={balanceRef}
            value={wallet.balance!.toString()}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...wallet,
                balance: parseInt(v),
              };
              props.onDataChange(newWallet);
            }}
            label="Initial Balance"
            iconLeading={{name: 'cash-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            inputMode="numeric"
            showLabel
            onSubmitEditing={() => holderNameRef.current?.focus()}
          />
          <TextInput
            ref={holderNameRef}
            value={wallet.holderName}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...wallet,
                holderName: v,
              };
              props.onDataChange(newWallet);
            }}
            label="Holder Name"
            iconLeading={{name: 'card-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            showLabel
            onSubmitEditing={() => holderNumberRef.current?.focus()}
          />
          <TextInput
            ref={holderNumberRef}
            value={wallet.holderNumber}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...wallet,
                holderNumber: v,
              };
              props.onDataChange(newWallet);
            }}
            label="Holder Number"
            iconLeading={{name: 'card-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            inputMode="numeric"
            showLabel
            onSubmitEditing={onNextPressHandler}
          />
        </ScrollView>
      </View>
      <Button onPress={onNextPressHandler} label="Next" mode="contained" />
    </View>
  );
};

export default CardDetailsFragment;

const styles = StyleSheet.create({
  CardContainer: {alignItems: 'center', flex: 1},
});
