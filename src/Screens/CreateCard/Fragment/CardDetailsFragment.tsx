import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput as RNInput,
  View,
  useWindowDimensions,
} from 'react-native';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInput from '@Components/Common/TextInput';

type ICardDetailsFragmentProps = {
  onNextPress: () => void;
};
const CardDetailsFragment = (props: ICardDetailsFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const abbrRef = useRef<RNInput>(null);
  const balanceRef = useRef<RNInput>(null);

  const [cardName, setCardName] = useState('');
  const [cardAbbreviation, setCardAbbreviation] = useState('');
  const [balance, setBalance] = useState('');

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={{alignItems: 'center', flex: 1}}>
        <WalletCard orientation="landscape" />
        {/* <Text
          style={[
            textStyle.H3_Bold,
            {textAlign: 'left', width: '100%', marginTop: 18},
          ]}>
          Card details
        </Text> */}
        <TextInput
          value={cardName}
          onChangeText={setCardName}
          label="Card Name"
          iconLeading={{name: 'card-outline'}}
          containerStyle={{marginTop: 12}}
          mode="Outlined"
          onSubmitEditing={() => abbrRef.current?.focus()}
        />
        <TextInput
          ref={abbrRef}
          value={cardAbbreviation}
          onChangeText={setCardAbbreviation}
          label="Card Abbreviation"
          iconLeading={{name: 'card-outline'}}
          containerStyle={{marginTop: 12}}
          mode="Outlined"
          onSubmitEditing={() => balanceRef.current?.focus()}
        />
        <TextInput
          ref={balanceRef}
          value={balance}
          onChangeText={setBalance}
          label="Initial Balance"
          iconLeading={{name: 'cash-outline'}}
          containerStyle={{marginTop: 12}}
          mode="Outlined"
          inputMode="numeric"
          onSubmitEditing={props.onNextPress}
        />
      </View>
      <Button onPress={props.onNextPress} label="Next" mode="contained" />
    </View>
  );
};

export default CardDetailsFragment;

const styles = StyleSheet.create({});
