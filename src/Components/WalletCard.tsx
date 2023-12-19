import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import IconButton from './Common/IconButton';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/GlobalColor';
import Icon from './Common/Icon';

type IWalletCardProps = {
  isEmpty?: boolean;
};
const WalletCard = (props: IWalletCardProps) => {
  return (
    <View style={styles.RootComponentContainer}>
      {!props.isEmpty ? (
        <TouchableOpacity style={styles.ComponentContainer}>
          <View style={styles.HeaderContainer}>
            <IconButton />
            <View style={styles.HeaderTextContainer}>
              <Text style={[textStyle.H2_Bold, styles.HeaderText]}>
                Apple Inc.
              </Text>
              <Text style={[textStyle.Title_Light, styles.HeaderText]}>
                ( AAPL )
              </Text>
            </View>
          </View>
          <View style={styles.ContentContainer}>
            <Text style={[textStyle.H2_Regular, styles.ContentText]}>
              Rp.7.820.300,00
            </Text>
            <Text style={[textStyle.Content_Light, styles.ContentText]}>
              +50.233 (5.25%)
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.EmptyContainer}>
          <Icon name="add-outline" color={GlobalColor.light} size={50} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    width: 254,
    height: 355,
    borderRadius: 12,
    backgroundColor: 'skyblue',
    // justifyContent: 'space-between',
    padding: 12,
  },
  ComponentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderText: {textAlign: 'right'},
  HeaderTextContainer: {
    // transform: [{rotate: '90deg'}],
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // backgroundColor: 'red',
  },
  ContentContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: GlobalColor.overlay,
  },
  ContentText: {color: GlobalColor.light},
  EmptyContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});