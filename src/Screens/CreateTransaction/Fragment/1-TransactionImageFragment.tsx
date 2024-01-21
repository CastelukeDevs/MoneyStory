import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeStyle} from '@Utilities/Styles/GlobalStyle';
import {ITransactionFragmentProps} from '@Types/FragmentTypes';

import Button from '@Components/Common/Button';
import GlobalColor from '@Utilities/Styles/GlobalColor';

import {launchImageLibrary} from 'react-native-image-picker';
import {PickerOption} from '@Utilities/Settings/ImagePicker';

const dimens = Dimensions.get('window');

const TransactionImageFragment = (
  props: ITransactionFragmentProps & {
    onImageChange: (uri: string | undefined) => void;
  },
) => {
  const inset = useSafeAreaInsets();

  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const onImagePress = async () => {
    await launchImageLibrary(PickerOption).then(result => {
      const assets = result.assets?.[0];
      setImageUri(assets?.uri);
      props.onImageChange(assets?.uri);
    });
  };

  return (
    <View style={[ThemeStyle.RootFragmentStyle, {paddingBottom: inset.bottom}]}>
      <View style={styles.ContentContainer}>
        <TouchableOpacity style={styles.ImageContainer} onPress={onImagePress}>
          {imageUri && (
            <Image
              source={{uri: imageUri}}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <LinedView />
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="Next" onPress={props.onNext} />
      </View>
    </View>
  );
};

export default TransactionImageFragment;

const styles = StyleSheet.create({
  ContentContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  ButtonContainer: {},
  ImageContainer: {
    width: (dimens.width / 4) * 3,
    aspectRatio: 9 / 13,
    backgroundColor: 'skyblue',
  },
});

const LinedView = () => (
  <>
    <View style={[lines.LineHorizontal, lines.PosTopLeft]} />
    <View style={[lines.LineHorizontal, lines.PosTopRight]} />
    <View style={[lines.LineHorizontal, lines.PosBottomLeft]} />
    <View style={[lines.LineHorizontal, lines.PosBottomRight]} />
    <View style={[lines.LineVertical, lines.PosTopLeft]} />
    <View style={[lines.LineVertical, lines.PosTopRight]} />
    <View style={[lines.LineVertical, lines.PosBottomLeft]} />
    <View style={[lines.LineVertical, lines.PosBottomRight]} />
  </>
);

const lines = StyleSheet.create({
  LineHorizontal: {
    width: 100,
    height: 3,
    backgroundColor: GlobalColor.dark,
    position: 'absolute',
  },
  LineVertical: {
    width: 3,
    height: 150,
    backgroundColor: GlobalColor.dark,
    position: 'absolute',
  },
  PosTopLeft: {top: 0, left: 0},
  PosTopRight: {top: 0, right: 0},
  PosBottomLeft: {bottom: 0, left: 0},
  PosBottomRight: {bottom: 0, right: 0},
});
