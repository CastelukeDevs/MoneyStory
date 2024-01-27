import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Icon from './Common/Icon';
import {Dimension, ThemeText} from '@Utilities/Styles/GlobalStyle';
import {
  ITransactionCategory,
  ITransactionMain,
  ITransactionType,
} from '@Types/TransactionTypes';
import {useSelector} from 'react-redux';
import {selectUserDefaultCurrency} from '@Redux/Reducers/UserReducer';

import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import GlobalColor from '@Utilities/Styles/ThemeColor';
import getCategories from '@Utilities/Tools/getCategories';

type IActivityListCardPropsType = {
  transaction: ITransactionMain;
  containerStyle?: ViewStyle;
};
const ActivityListCard = (props: IActivityListCardPropsType) => {
  const {transaction} = props;
  const transactionCategory = getCategories(
    transaction.category,
    transaction.transactionType,
  ); //to future me, this has to be casted since its confused about its type

  const currency = useSelector(selectUserDefaultCurrency);

  const getColor = (type: ITransactionType) => {
    if (type === 'Expense') return GlobalColor.error;
    if (type === 'Income') return 'green';
    return GlobalColor.accent;
  };

  const categories = getCategories(
    transactionCategory.category,
    transaction.transactionType!,
  );

  return (
    <View style={[styles.RootComponentContainer, props.containerStyle]}>
      <View
        style={[
          styles.Icon,
          {
            backgroundColor: getColor(transaction.transactionType),
            marginRight: Dimension.Space,
          },
        ]}>
        <Icon name={categories.icon} size={24} color={GlobalColor.light} />
      </View>
      <View style={styles.CenterTextContainer}>
        <Text style={ThemeText.Title_Bold}>{categories.category}</Text>
        <Text numberOfLines={1} style={ThemeText.SubTitle_Light}>
          {transaction.note}
        </Text>
      </View>
      <Text style={ThemeText.SubTitle_Regular}>
        {FormatCurrency(transaction.amount as number, currency || 'IDR').format}
      </Text>
    </View>
  );
};

export default ActivityListCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Dimension.SpaceM,
  },
  Icon: {
    padding: Dimension.Space,
    backgroundColor: 'skyblue',
    borderRadius: Dimension.RadiusFull,
  },
  CenterTextContainer: {
    marginRight: 'auto',
  },
});
