import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@Redux/Store';
import {
  createNewWallet,
  selectWalletStatus,
} from '@Redux/Reducers/WalletReducer';

import {IMainNavProp} from '@Routes/RouteTypes';
import {IWalletMain} from '@Types/WalletTypes';
import {IFile} from '@Types/CommonTypes';

import {ThemeText} from '@Utilities/Styles/GlobalStyle';
import {defaultWalletData} from '@Utilities/DefaultData/walletData';

import ProgressBar from '@Components/Common/ProgressBar';
import Header from '@Components/Header';

import CardImageFragment from './Fragment/CardImageFragment';
import CardLogoFragment from './Fragment/CardLogoFragment';
import CardDetailsFragment from './Fragment/CardDetailsFragment';
import CardCompletionFragment from './Fragment/CardCompletionFragment';

const CreateCardScreen = (props: IMainNavProp<'CreateCardScreen'>) => {
  const width = useWindowDimensions().width;
  const dispatch = useAppDispatch();

  const scrollViewRef = useRef<ScrollView>(null);

  const walletStatus = useSelector(selectWalletStatus);

  const [page, setPage] = useState(1);
  const [cardData, setCardData] = useState(defaultWalletData);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({x: page * width - width});
  }, [page]);

  const getSubHeaderTitle = () => {
    return fragments[page - 1].title;
  };

  const onHeaderBackPressHandler = () => {
    if (page === 1) {
      props.navigation.goBack();
    } else {
      setPage(page - 1);
    }
  };

  const onNextHandler = (walletPassed: IWalletMain) => {
    setPage(page + 1);
    setCardData(walletPassed);
  };

  const onDataChangeHandler = (passedWallet: IWalletMain) => {
    setCardData(prev => (prev = passedWallet));
  };

  const onSubmitDataHandler = async () => {
    if (walletStatus === 'fetching') return;

    const image: IFile = {
      uri: cardData.imageUrl!,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    };

    await dispatch(createNewWallet({data: {...cardData, image}}))
      .unwrap()
      .then(() => {
        props.navigation.goBack();
      });
  };

  const fragments = [
    {
      title: 'Add new wallet card image',
      view: CardImageFragment({
        cardData,
        onNextPress: onNextHandler,
        onDataChange: onDataChangeHandler,
      }),
    },
    {
      title: 'Select wallet card logo',
      view: CardLogoFragment({
        cardData,
        onNextPress: onNextHandler,
        onDataChange: onDataChangeHandler,
      }),
    },
    {
      title: 'Complete your wallet card details',
      view: CardDetailsFragment({
        cardData,
        onNextPress: onNextHandler,
        onDataChange: onDataChangeHandler,
      }),
    },
    {
      title: 'Confirm your new wallet card',
      view: CardCompletionFragment({
        cardData,
        onNextPress: onSubmitDataHandler,
      }),
    },
  ];

  return (
    <View style={{flex: 1}}>
      <Header label="Create Card" onBackPressed={onHeaderBackPressHandler} />
      <View style={styles.SubHeaderContainer}>
        <Text style={ThemeText.H3_Bold}>{getSubHeaderTitle()}</Text>
        <View style={{height: 18}} />
        <ProgressBar indicatorCount={fragments.length} indicatorActive={page} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        snapToInterval={width}
        scrollEnabled={false}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}>
        {fragments.map((item, index) => (
          <View key={index}>{item.view}</View>
        ))}
      </ScrollView>
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
