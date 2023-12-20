import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {IMainNavPropTypes} from '@Routes/RouteTypes';
import {Asset} from 'react-native-image-picker';

import {textStyle} from '@Utilities/Styles/GlobalStyle';
import {defaultWalletData} from '@Utilities/DefaultData/walletData';

import CardLogoFragment from './Fragment/CardLogoFragment';
import CardImageFragment from './Fragment/CardImageFragment';

import ProgressBar from '@Components/Common/ProgressBar';
import Header from '@Components/Header';

import CardDetailsFragment from './Fragment/CardDetailsFragment';
import CardCompletionFragment from './Fragment/CardCompletionFragment';
import {IWalletMain} from '@Types/WalletTypes';

const CreateCardScreen = (props: IMainNavPropTypes<'CreateCardScreen'>) => {
  const width = useWindowDimensions().width;

  const scrollViewRef = useRef<ScrollView>(null);

  const [page, setPage] = useState(1);
  const [cardData, setCardData] = useState(defaultWalletData);

  useEffect(() => {
    console.log('card data updated');
  }, [cardData]);

  const goToPage = (targetPage: number) => {
    scrollViewRef.current?.scrollTo({x: targetPage * width - width});
  };

  const onNextHandler = (walletPassed: IWalletMain) => {
    goToPage(page + 1);
    setCardData(walletPassed);

    // scrollViewRef.current?.scrollTo({x: (page + 1) * width});
    // setPage(page + 1);
  };

  const onHeaderBackPressHandler = () => {
    console.log('back');

    if (page === 1) {
      props.navigation.goBack();
    } else {
      goToPage(page - 1);
    }
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

  const onDataChangeHandler = (passedWallet: IWalletMain) => {
    setCardData(passedWallet);
  };

  return (
    <View style={{flex: 1}}>
      <Header label="Create Card" onBackPressed={onHeaderBackPressHandler} />
      <View style={styles.SubHeaderContainer}>
        <Text style={textStyle.H3_Bold}>{getSubHeaderTitle()}</Text>
        <View style={{height: 18}} />
        <ProgressBar indicatorCount={4} indicatorActive={page} />
      </View>

      {/* <Button label="Back" onPress={() => props.navigation.goBack()} /> */}
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        snapToInterval={width}
        // disableScrollViewPanResponder
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
        <CardCompletionFragment cardData={cardData} onNextPress={() => {}} />
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
