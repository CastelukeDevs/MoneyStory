import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {createUserWallets} from '@Redux/Actions/WalletAction';

import {IMainNavPropTypes} from '@Routes/RouteTypes';
import {IWalletMain} from '@Types/WalletTypes';

import {textStyle} from '@Utilities/Styles/GlobalStyle';
import {defaultWalletData} from '@Utilities/DefaultData/walletData';

import ProgressBar from '@Components/Common/ProgressBar';
import Header from '@Components/Header';

import CardImageFragment from './Fragment/CardImageFragment';
import CardLogoFragment from './Fragment/CardLogoFragment';
import CardDetailsFragment from './Fragment/CardDetailsFragment';
import CardCompletionFragment from './Fragment/CardCompletionFragment';

const CreateCardScreen = (props: IMainNavPropTypes<'CreateCardScreen'>) => {
  const width = useWindowDimensions().width;
  const dispatch = useDispatch<any>();

  const scrollViewRef = useRef<ScrollView>(null);

  const wallet = useSelector((state: IRootStateType) => state.wallet);

  const [page, setPage] = useState(1);
  const [cardData, setCardData] = useState(defaultWalletData);

  const goToPage = (targetPage: number) => {
    scrollViewRef.current?.scrollTo({x: targetPage * width - width});
  };

  const getSubHeaderTitle = () => {
    switch (page) {
      case 1:
        return 'Add new wallet card image';
      case 2:
        return 'Select wallet card logo';
      case 3:
        return 'Complete your wallet card details';
      case 4:
        return 'Confirm your new wallet card';
      default:
        return 'Create new card';
    }
  };

  const onNextHandler = (walletPassed: IWalletMain) => {
    goToPage(page + 1);
    setCardData(walletPassed);
  };

  const onHeaderBackPressHandler = () => {
    console.log('back');

    if (page === 1) {
      props.navigation.goBack();
    } else {
      goToPage(page - 1);
    }
  };

  const onDataChangeHandler = (passedWallet: IWalletMain) => {
    setCardData(prev => (prev = passedWallet));
  };

  const onSubmitDataHandler = async () => {
    if (wallet.status === 'fetching') return;

    const image = {
      uri: cardData?.imageUrl,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    };
    // dispatch(resetWallet());

    await dispatch(createUserWallets({data: {...cardData, image}}))
      .unwrap()
      .then(() => {
        props.navigation.goBack();
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header label="Create Card" onBackPressed={onHeaderBackPressHandler} />
      <View style={styles.SubHeaderContainer}>
        <Text style={textStyle.H3_Bold}>{getSubHeaderTitle()}</Text>
        <View style={{height: 18}} />
        <ProgressBar indicatorCount={4} indicatorActive={page} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        snapToInterval={width}
        scrollEnabled={false}
        onMomentumScrollEnd={ev => {
          const scroll = ev.nativeEvent.contentOffset.x;
          const currentPage = (scroll + width) / width;
          setPage(currentPage);
        }}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}>
        <CardImageFragment
          cardData={cardData}
          onNextPress={onNextHandler}
          onDataChange={onDataChangeHandler}
        />

        <CardLogoFragment
          cardData={cardData}
          onNextPress={onNextHandler}
          onDataChange={onDataChangeHandler}
        />

        <CardDetailsFragment
          onNextPress={onNextHandler}
          cardData={cardData}
          onDataChange={onDataChangeHandler}
        />

        <CardCompletionFragment
          cardData={cardData}
          onNextPress={onSubmitDataHandler}
        />
      </ScrollView>
      {/* <Button label="Next" onPress={onNextHandler} /> */}
    </View>
  );
};

export default CreateCardScreen;

const styles = StyleSheet.create({
  SubHeaderContainer: {
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
});
