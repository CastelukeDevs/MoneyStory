import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import GlobalColor from '@Utilities/Styles/GlobalColor';
import Icon from './Common/Icon';
import {ThemeText} from '@Utilities/Styles/GlobalStyle';

type INewWalletCardProps = {
  onPress?: () => void;
};
const NewWalletCard = (props: INewWalletCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress?.()}
      style={[styles.RootContainer]}>
      <Icon name="add-outline" size={40} color={GlobalColor.accent} />
      <Text
        numberOfLines={2}
        style={[ThemeText.SubTitle_Regular, styles.TextColor]}>
        Add new card
      </Text>
    </TouchableOpacity>
  );
};

export default NewWalletCard;

const styles = StyleSheet.create({
  RootContainer: {
    borderWidth: 2,
    borderColor: GlobalColor.accent,
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextColor: {
    color: GlobalColor.accent,
  },
});
