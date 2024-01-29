import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  DefaultStyle,
  Dimension,
  ThemeText,
} from '@Utilities/Styles/GlobalStyle';
import {ITransactionFragmentProps} from '@Types/FragmentTypes';

import Button from '@Components/Common/Button';
import ThemeColor from '@Utilities/Styles/ThemeColor';
import TextPills from '@Components/Common/TextPills';
import LinesSeparator from '@Components/Common/LinesSeparator';
import DashedLine from 'react-native-dashed-line';
import {ITransactionItems} from '@Types/TransactionTypes';

const transactionItemDummy: ITransactionItems[] = [
  {
    _id: 'one',
    name: 'Shampoo',
    piecePrice: 25000,
    quantity: 1,
    subTotal: 50000,
  },
  {
    _id: 'two',
    name: 'Instant Noodles',
    piecePrice: 3000,
    quantity: 12,
    subTotal: 36000,
  },
];

const TransactionItemFragment = (props: ITransactionFragmentProps) => {
  const inset = useSafeAreaInsets();
  const imageSize = 70;

  const [transactionItem, setTransactionItem] =
    useState<ITransactionItems[]>(transactionItemDummy);

  return (
    <View
      style={[DefaultStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View
        style={[styles.ContentContainer, {paddingVertical: Dimension.Space}]}>
        <View style={[styles.ContainerSpacing, {flexDirection: 'row'}]}>
          <View
            style={{
              width: imageSize,
              height: imageSize,
              backgroundColor: ThemeColor.accent,
            }}
          />
          <View style={{marginLeft: Dimension.Space}}>
            <Text style={ThemeText.Title_Bold}>Apple Wallet Transaction</Text>
            <Text style={ThemeText.SubTitle_Regular}>Expense - Shopping</Text>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <TextPills text="Monthly" />
              <TextPills text="Monthly" />
            </View>
          </View>
        </View>

        <View style={styles.ContainerSpacing}>
          <Text style={ThemeText.SubTitle_Bold}>Unlisted Amount</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={ThemeText.Content_Regular}>Amount</Text>
            <Text style={ThemeText.Content_Regular}>Rp.54.200,00</Text>
          </View>
          <LinesSeparator dashed />
        </View>

        <View style={[styles.ContainerSpacing]}>
          <Text style={ThemeText.SubTitle_Bold}>Item details:</Text>
        </View>

        <FlatList
          data={transactionItem}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={ThemeText.SubTitle_Regular}>{item.name}</Text>
                  <Text style={ThemeText.Content_Regular}>
                    Quantity: {item.quantity} @ {item.piecePrice}
                  </Text>
                </View>
                <Text
                  style={[
                    ThemeText.Title_Regular,
                    {flex: 1, textAlign: 'right', textAlignVertical: 'center'},
                  ]}>
                  Rp {item.subTotal}
                </Text>
              </View>
            );
          }}
          ListFooterComponent={() => (
            <Button label="add item +" onPress={() => {}} />
          )}
          contentContainerStyle={{paddingHorizontal: Dimension.Space}}
        />

        <View style={[styles.ContainerSpacing]}>
          <Text style={ThemeText.SubTitle_Bold}>Total</Text>
        </View>
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="Next" onPress={props.onNext} />
      </View>
    </View>
  );
};

export default TransactionItemFragment;

const styles = StyleSheet.create({
  ContentContainer: {
    flex: 1,
    backgroundColor: ThemeColor.light,
    // padding: Dimension.SpaceL,
  },
  ButtonContainer: {marginTop: Dimension.SpaceL},
  ContainerSpacing: {paddingHorizontal: Dimension.Space},
});
