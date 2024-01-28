import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
import {
  CategoryList,
  TransactionType,
} from '@Utilities/DefaultData/CategoryList';
import {ITransaction, ITransactionType} from '@Types/TransactionTypes';

const TransactionDetailFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();

  const wallet = useSelector(selectWallets);

  const [amount, setAmount] = useState('');
  const [selectedTransactionType, setSelectedTransactionType] = useState(0);
  const [topDropdownActive, setTopDropdownActive] = useState(false);
  const [transactionDate, setTransactionDate] = useState('');

  const walletDropdownDataset: IDropdownItem[] = wallet.map(w => ({
    label: w.walletName,
    subLabel: FormatCurrency(+w.balance, w.currency).format,
    value: w.id,
    icon: w.logo,
  }));

  const transactionTypeDataset: IDropdownItem[] = TransactionType.map(t => ({
    label: t,
    value: t,
  }));

  const transactionCategoriesDataset: IDropdownItem[] = useMemo(
    () =>
      CategoryList[
        TransactionType[selectedTransactionType] as ITransactionType
      ].map(c => ({
        label: c.category,
        value: c.category,
        icon: c.icon,
        subLabel: c.description,
      })),
    [selectedTransactionType],
  );

  const topDropdownOpenHandler = (v: boolean) => {
    setTopDropdownActive(v);
  };

  //TODO: Arrange index for dropdown

  return (
    <View
      style={[
        DefaultStyle.RootFragmentStyle,
        {paddingBottom: inset.bottom, paddingHorizontal: 0},
      ]}>
      <View
        style={[
          styles.ContentContainer,
          {
            zIndex: topDropdownActive ? 2 : 0,
            paddingHorizontal: Dimension.SpaceL,
          },
        ]}>
        <Text style={[styles.LabelText, {marginTop: 0}]}>Wallet</Text>
        <DropdownV2
          items={walletDropdownDataset}
          onOpen={topDropdownOpenHandler}
        />

        <Text style={styles.LabelText}>Transaction Amount</Text>
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
      <ScrollView
        style={{
          flex: 1,
          zIndex: 1,
          marginTop: Dimension.SpaceL,
          paddingHorizontal: Dimension.SpaceL,
        }}
        bounces={false}
        automaticallyAdjustKeyboardInsets>
        <Text style={styles.LabelText}>Transaction Type</Text>
        <DropdownV2
          items={transactionTypeDataset}
          onSelected={(v, i) => setSelectedTransactionType(i)}
          alwaysDropDown
          layoutIndex={1}
        />

        <Text style={styles.LabelText}>Categories</Text>
        <DropdownV2
          items={transactionCategoriesDataset}
          alwaysDropDown
          layoutIndex={0}
        />

        <Text style={styles.LabelText}>Date</Text>
        <TextInput
          label="Transaction Date"
          value={transactionDate}
          onChangeText={setTransactionDate}
          mode="Outlined"
          iconLeading={{name: 'calendar'}}
        />

        <Text style={styles.LabelText}>Note</Text>
        <TextInput
          label="Transaction Note"
          value={transactionDate}
          onChangeText={setTransactionDate}
          mode="Outlined"
          iconLeading={{name: 'document'}}
          multiline
        />

        <Text style={styles.LabelText}>Tags</Text>
        <TextInput
          label="Transaction Tags"
          value={transactionDate}
          onChangeText={setTransactionDate}
          mode="Outlined"
          iconLeading={{name: 'pricetag'}}
        />

        <View style={styles.ButtonContainer}>
          <Button label="Next" onPress={props.onNext} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDetailFragment;

const styles = StyleSheet.create({
  ContentContainer: {},
  ButtonContainer: {marginTop: Dimension.SpaceL},
  LabelText: {
    ...ThemeText.SubTitle_Regular,
    marginBottom: Dimension.TextMargin,
    marginTop: Dimension.Space,
  },
});
