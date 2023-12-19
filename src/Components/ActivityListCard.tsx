import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from './Common/Icon';
import {textStyle} from '@Utilities/Styles/GlobalStyle';

const ActivityListCard = () => {
  return (
    <View style={styles.RootComponentContainer}>
      <View style={styles.Icon}>
        <Icon name="logo-google" size={24} />
      </View>
      <View style={styles.CenterTextContainer}>
        <Text style={textStyle.Title_Bold}>Shopping</Text>
        <Text style={textStyle.SubTitle_Light}>Shopping</Text>
      </View>
      <Text style={textStyle.Title_Regular}>Rp.240.000,00</Text>
    </View>
  );
};

export default ActivityListCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    padding: 12,
    backgroundColor: 'skyblue',
    borderRadius: 100,
  },
  CenterTextContainer: {
    marginRight: 'auto',
  },
});
