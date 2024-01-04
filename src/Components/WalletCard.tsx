import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {textStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/GlobalColor';

import {IWallet, IWalletMain} from '@Types/WalletTypes';

import {defaultWalletData} from '@Utilities/DefaultData/walletData';

import Icon from './Common/Icon';
import IconButton from './Common/IconButton';
import FormatCurrency from '@Utilities/String/Currency/FormatCurrency';
import {LinearGradientProps} from '@Utilities/Settings/LinearGradient';

type IWalletCardProps = {
  isEmpty?: boolean;
  onPress?: () => void;
  disable?: boolean;
  orientation?: 'portrait' | 'landscape';
  wallet?: IWalletMain | IWallet;
  style?: ViewStyle;
};

const WalletCard = (props: IWalletCardProps) => {
  const isDisabled = props.disable || typeof props.onPress === 'undefined';
  const orientation = props.orientation || 'portrait';
  const isPortrait = orientation === 'portrait';
  const walletData = props.wallet || defaultWalletData; //TODO:Remove later

  return (
    <View
      style={[
        styles.RootComponentContainer,
        isPortrait ? styles.CardPortrait : styles.CardLandscape,
        props.style,
      ]}>
      {walletData.imageUrl && (
        <Image
          source={{uri: walletData.imageUrl}}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <LinearGradient {...LinearGradientProps} />
      {!props.isEmpty ? (
        <TouchableOpacity
          style={styles.ComponentContainer}
          disabled={isDisabled}
          onPress={props.onPress}>
          <View style={styles.HeaderContainer}>
            <IconButton name={walletData.logo} />
            <View style={styles.HeaderTextContainer}>
              <Text
                style={[
                  textStyle.H2_Bold,
                  styles.HeaderText,
                  {paddingLeft: 12},
                ]}
                numberOfLines={3}>
                {walletData.walletName}.
              </Text>
              <Text style={[textStyle.Title_Light, styles.HeaderText]}>
                ( {walletData.walletAbbreviation} )
              </Text>
            </View>
          </View>
          <View style={styles.NumberContainer}>
            <Text
              style={[
                isPortrait ? textStyle.H2_Bold : textStyle.H1_Bold,
                styles.NumberText,
              ]}>
              {
                FormatCurrency(
                  walletData.balance as number,
                  walletData.currency,
                ).format
              }
            </Text>
            <Text style={[textStyle.Content_Regular, styles.NumberText]}>
              +{walletData.monthDiff} ({walletData.percentDiff}%)
            </Text>
          </View>
          <View style={styles.PersonContainer}>
            <Text
              style={[textStyle.SubTitle_Light, styles.CardHolderNumberText]}>
              {walletData.type}
            </Text>
            <Text style={[textStyle.H3_Regular, styles.CardHolderNameText]}>
              {walletData.holderName}
            </Text>
            <Text style={[textStyle.Title_Light, styles.CardHolderNumberText]}>
              {walletData.holderNumber}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.EmptyContainer}
          disabled={isDisabled}
          onPress={props.onPress}>
          <Icon name="add-outline" color={GlobalColor.light} size={50} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WalletCard;

const CardWidth = 254;
const CardHeight = 355;

export const WalletCardSize = {width: CardWidth, height: CardHeight};

const styles = StyleSheet.create({
  RootComponentContainer: {
    borderRadius: 12,
    backgroundColor: GlobalColor.accent,
    padding: 12,
    overflow: 'hidden',
  },
  CardPortrait: {
    aspectRatio: 9 / 13,

    width: CardWidth,
    // height: CardHeight,
  },
  CardLandscape: {
    aspectRatio: 13 / 9,
    width: CardHeight,
    // height: CardWidth,
  },
  ComponentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  HeaderText: {textAlign: 'right', color: GlobalColor.light},
  HeaderTextContainer: {
    flex: 1,
  },
  PersonContainer: {},
  CardHolderNameText: {color: GlobalColor.light, letterSpacing: 4},
  CardHolderNumberText: {color: GlobalColor.light, letterSpacing: 2},
  NumberContainer: {
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 18,
  },
  NumberText: {color: GlobalColor.light},
  EmptyContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
