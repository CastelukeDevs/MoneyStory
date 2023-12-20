import React, {useState} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';

import WalletCard from '@Components/WalletCard';
import TextInput from '@Components/Common/TextInput';
import Button from '@Components/Common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ICardImageFragmentProps = {
  onNextPress: () => void;
};
const CardImageFragment = (props: ICardImageFragmentProps) => {
  const width = useWindowDimensions().width;
  const inset = useSafeAreaInsets().bottom;

  const [keyword, setKeyword] = useState('');

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
      </View>
      {/* <TextInput value={keyword} onChangeText={setKeyword} label="Keyword" /> */}
      <Button onPress={props.onNextPress} label="Next" mode="contained" />
      {/* <Text>Frag1</Text> */}
    </View>
  );
};

export default CardImageFragment;

const styles = StyleSheet.create({});
