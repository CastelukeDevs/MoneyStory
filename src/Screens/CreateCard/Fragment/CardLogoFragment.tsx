import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import WalletCard from '@Components/WalletCard';
import Button from '@Components/Common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LogoList from '@Utilities/LogoList';
import Icon from '@Components/Common/Icon';
import IconButton from '@Components/Common/IconButton';

type ICardLogoFragmentProps = {
  onNextPress: () => void;
};
const CardLogoFragment = (props: ICardLogoFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const iconSizeApproximate = 42;
  const iconColumns = 6;
  const componentWidth = width - 60;
  const iconMargin =
    (componentWidth - iconSizeApproximate * iconColumns) / iconColumns / 2;

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 14,
        paddingBottom: inset || 14,
      }}>
      <View style={{alignItems: 'center', flex: 1}}>
        <WalletCard orientation="landscape" />
        <FlatList
          style={{marginVertical: 12}}
          data={LogoList}
          keyExtractor={item => item.name}
          numColumns={6}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={{margin: iconMargin}}>
                <IconButton
                  name={item.name}
                  onPress={() => {
                    console.log('pressed', item.name);
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <Button onPress={props.onNextPress} label="Next" mode="contained" />
    </View>
  );
};

export default CardLogoFragment;

const styles = StyleSheet.create({});
