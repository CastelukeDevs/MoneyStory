import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {selectWallets} from '@Redux/Reducers/WalletReducer';

import {
  ThemeText,
  DefaultStyle,
  Dimension,
} from '@Utilities/Styles/GlobalStyle';
import {ITransactionFragmentProps} from '@Types/FragmentTypes';

import FormatCurrency from '@Utilities/Tools/FormatCurrency';

import Button from '@Components/Common/Button';
import DropdownV2, {IDropdownItem} from '@Components/Common/DropdownV2';
import TextInput from '@Components/Common/TextInput';

const TransactionDetailFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();

  const wallet = useSelector(selectWallets);

  const walletDropdownDataset: IDropdownItem[] = wallet.map(w => ({
    label: w.walletName,
    subLabel: FormatCurrency(+w.balance, w.currency).format,
    value: w.id,
    icon: w.logo,
  }));

  const [amount, setAmount] = useState('');
  return (
    <View
      style={[DefaultStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View style={styles.ContentContainer}>
        <Text style={styles.LabelText}>Wallet</Text>
        <DropdownV2 items={walletDropdownDataset} />
        <Text>Transaction Amount</Text>
        <TextInput
          label="Transaction Amount"
          value={amount}
          onChangeText={setAmount}
          // showLabel
          mode="Underlined"
          isMoney="IDR"
          currencyStyle={{...ThemeText.H1_Bold, opacity: 0.5}}
          style={ThemeText.H1_Bold}
        />
      </View>
      <View style={{flex: 1}}>
        <Text>Transaction Type</Text>
        <DropdownV2
          items={[
            {label: 'Transfer', value: 'transfer'},
            {label: 'Income', value: 'income'},
            {label: 'Expense', value: 'expense'},
          ]}
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
  ContentContainer: {},
  ButtonContainer: {},
  LabelText: {
    ...ThemeText.SubTitle_Regular,
    marginBottom: Dimension.TextMargin,
  },
});
