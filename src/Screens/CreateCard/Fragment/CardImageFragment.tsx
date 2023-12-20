import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import {PickerOption} from '@Utilities/ImagePicker';
import {IWallet, IWalletMain} from '@Types/WalletTypes';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';

type ICardImageFragmentProps = {
  onNextPress: (cardData: IWalletMain) => void;
  onDataChange: (cardData: IWalletMain) => void;
  cardData: IWalletMain;
};
const CardImageFragment = (props: ICardImageFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const [wallet, setWallet] = useState<IWalletMain>(props.cardData);

  useEffect(() => {
    setWallet(props.cardData);
  }, [props.cardData]);

  const onImagePress = async () => {
    await launchImageLibrary(PickerOption).then(res => {
      const assets = res.assets?.[0];

      const newWallet: IWalletMain = {...wallet, imageUrl: assets?.uri!};
      props.onDataChange(newWallet);
    });
  };

  useEffect(() => {
    setWallet(props.cardData);
  }, [props.cardData]);

  const onNextPressHandler = () => {
    props.onNextPress(wallet);
  };

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={{alignItems: 'center', flex: 1}}>
        <WalletCard
          wallet={props.cardData}
          orientation="landscape"
          onPress={onImagePress}
        />
      </View>
      <Button onPress={onNextPressHandler} label="Next" mode="contained" />
    </View>
  );
};

export default CardImageFragment;

const styles = StyleSheet.create({});
