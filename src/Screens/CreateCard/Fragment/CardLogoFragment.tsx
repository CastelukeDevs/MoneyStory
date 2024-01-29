import React from 'react';
import {FlatList, StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IWalletMain} from '@Types/WalletTypes';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';
import IconButton from '@Components/Common/IconButton';
import {ILogoName, LogoList} from '@Components/Common/Icon';
import ConvertEnumToArray from '@Utilities/Tools/ConvertEnumToArray';

type ICardLogoFragmentProps = {
  onNextPress: (cardData: IWalletMain) => void;
  onDataChange: (cardData: IWalletMain) => void;
  cardData: IWalletMain;
};
const CardLogoFragment = (props: ICardLogoFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const iconSizeApproximate = 42;
  const iconColumns = 6;
  const componentWidth = width - 28;
  const iconMargin =
    (componentWidth - iconSizeApproximate * iconColumns) / iconColumns;

  const onNextPressHandler = () => {
    props.onNextPress(props.cardData);
  };

  const logoList = ConvertEnumToArray(LogoList);

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={styles.CardContainer}>
        <WalletCard orientation="landscape" wallet={props.cardData} />
        <FlatList
          style={{marginVertical: 12}}
          data={logoList}
          keyExtractor={item => item.name}
          numColumns={6}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: iconMargin}}
          columnWrapperStyle={{gap: iconMargin}}
          renderItem={({item}) => {
            return (
              <View style={{margin: 0}}>
                <IconButton
                  name={item.name}
                  onPress={() => {
                    const newWallet: IWalletMain = {
                      ...props.cardData,
                      logo: item.name,
                    };
                    props.onDataChange(newWallet);
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <Button onPress={onNextPressHandler} label="Next" mode="contained" />
    </View>
  );
};

export default CardLogoFragment;

const styles = StyleSheet.create({
  CardContainer: {alignItems: 'center', flex: 1},
});
