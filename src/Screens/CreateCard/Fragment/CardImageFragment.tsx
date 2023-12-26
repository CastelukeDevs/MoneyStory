import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';

import {PickerOption} from '@Utilities/ImagePicker';
import {IWalletMain} from '@Types/WalletTypes';

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

  const onImagePress = async () => {
    await launchImageLibrary(PickerOption).then(res => {
      const assets = res.assets?.[0];

      const newWallet: IWalletMain = {
        ...props.cardData,
        imageUrl: assets?.uri!,
      };
      props.onDataChange(newWallet);
    });
  };

  const onNextPressHandler = () => {
    props.onNextPress(props.cardData);
  };

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={styles.CardContainer}>
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

const styles = StyleSheet.create({
  CardContainer: {alignItems: 'center', flex: 1},
});
