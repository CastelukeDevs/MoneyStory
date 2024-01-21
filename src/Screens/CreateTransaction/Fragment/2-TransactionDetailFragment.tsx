import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeText, ThemeStyle} from '@Utilities/Styles/GlobalStyle';
import {ITransactionFragmentProps} from '@Types/FragmentTypes';

import Button from '@Components/Common/Button';
import DropdownV2, {IDropdownItem} from '@Components/Common/DropdownV2';
import {useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import TextInput from '@Components/Common/TextInput';

const TransactionDetailFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();
  const walletState = useSelector((state: IRootStateType) => state.wallet);
  const wallet = walletState.wallets;
  const walletDropdownDataset: IDropdownItem[] = wallet.map(w => ({
    label: w.walletName,
    subLabel: FormatCurrency(+w.balance, w.currency).format,
    value: w.id,
    icon: w.logo,
  }));

  const [amount, setAmount] = useState('');
  return (
    <View style={[ThemeStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View style={styles.ContentContainer}>
        <Text>Wallet</Text>
        <DropdownV2 items={walletDropdownDataset} />
        <TextInput
          label="Transaction Amount"
          value={amount}
          onChangeText={setAmount}
          showLabel
          mode="Underlined"
          isMoney="IDR"
          currencyStyle={{...ThemeText.H1_Bold, opacity: 0.5}}
          style={ThemeText.H1_Bold}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="Next" onPress={props.onNext} />
      </View>
    </View>
  );
};

export default TransactionDetailFragment;

const styles = StyleSheet.create({
  ContentContainer: {flex: 1},
  ButtonContainer: {},
});
