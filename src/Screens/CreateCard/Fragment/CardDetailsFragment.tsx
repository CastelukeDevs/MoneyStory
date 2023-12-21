import React, {useRef} from 'react';
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

  const onNextPressHandler = () => {
    props.onNextPress(props.cardData);
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
            value={props.cardData.walletName}
            onChangeText={v => {
              const newWallet: IWalletMain = {...props.cardData, walletName: v};
              props.onDataChange(newWallet);
            }}
            label="Card Name"
            iconLeading={{name: 'wallet-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            showLabel
            onSubmitEditing={() => abbrRef.current?.focus()}
          />
          <TextInput
            ref={abbrRef}
            value={props.cardData.walletAbbreviation}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...props.cardData,
                walletAbbreviation: v,
              };
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
            value={props.cardData.balance as string}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...props.cardData,
                balance: v,
              };
              props.onDataChange(newWallet);
            }}
            label="Initial Balance"
            iconLeading={{name: 'cash-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            inputMode="decimal"
            showLabel
            onSubmitEditing={() => holderNameRef.current?.focus()}
            isMoney
          />
          <TextInput
            ref={holderNameRef}
            value={props.cardData.holderName}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...props.cardData,
                holderName: v,
              };
              props.onDataChange(newWallet);
            }}
            label="Holder Name"
            iconLeading={{name: 'person-outline'}}
            containerStyle={{marginBottom: 12}}
            mode="Outlined"
            showLabel
            onSubmitEditing={() => holderNumberRef.current?.focus()}
          />
          <TextInput
            ref={holderNumberRef}
            value={props.cardData.holderNumber}
            onChangeText={v => {
              const newWallet: IWalletMain = {
                ...props.cardData,
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
