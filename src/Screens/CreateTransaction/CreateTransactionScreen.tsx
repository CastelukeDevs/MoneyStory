import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {IMainNavProp} from '@Routes/RouteTypes';
import {ITransaction} from '@Types/TransactionTypes';
import {IFile} from '@Types/CommonTypes';

import {DefaultText} from '@Utilities/Styles/GlobalStyle';
import Header from '@Components/Header';
import TransactionImageFragment from './Fragment/1-TransactionImageFragment';
import TransactionDetailFragment from './Fragment/2-TransactionDetailFragment';
import TransactionItemFragment from './Fragment/3-TransactionItemFragment';
import TransactionReceiptFragment from './Fragment/4-TransactionReceiptFragment';
import ProgressBar from '@Components/Common/ProgressBar';

const CreateTransactionScreen = ({
  navigation,
}: IMainNavProp<'CreateTransactionScreen'>) => {
  const width = useWindowDimensions().width;
  const scrollViewRef = useRef<ScrollView>(null);

  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState<ITransaction>();

  useEffect(() => {
    scrollViewRef.current?.scrollTo({x: page * width - width});
  }, [page]);

  const backHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      navigation.goBack();
    }
  };

  const onNext = () => {
    setPage(page + 1);
  };

  const onSubmit = () => {
    console.log('submitting');
  };

  const getSubHeaderTitle = () => {
    return fragments[page - 1].title;
  };

  const onImageChange = (uri: string | undefined) => {
    if (uri === undefined) return;
    const newImage: IFile = {
      uri: uri,
      name: 'transaction.jpg',
      type: 'image/jpeg',
    };
  };

  const fragments = [
    {
      title: 'Snap your receipt',
      view: TransactionImageFragment({onNext, onImageChange}),
    },
    {
      title: 'Your transaction details',
      view: TransactionDetailFragment({onNext}),
    },
    {
      title: 'Add transaction items',
      view: TransactionItemFragment({onNext}),
    },
    {
      title: 'Transaction receipt',
      view: TransactionReceiptFragment({onNext: onSubmit}),
    },
  ];

  return (
    <View style={styles.RootScreenContainer}>
      <Header label="Make Transaction" onBackPressed={backHandler} />
      <View style={styles.SubHeaderContainer}>
        <Text style={DefaultText.H3_Bold}>{getSubHeaderTitle()}</Text>
        <View style={{height: 18}} />
        <ProgressBar indicatorCount={fragments.length} indicatorActive={page} />
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        snapToInterval={width}
        // scrollEnabled={false}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}>
        {/* {fragments.map((item, index) => (
          <View key={index}>{item.view}</View>
        ))} */}
        <TransactionImageFragment
          onNext={onNext}
          onImageChange={onImageChange}
        />
        <TransactionDetailFragment onNext={onNext} />
        <TransactionItemFragment onNext={onNext} />
        <TransactionReceiptFragment onNext={onSubmit} />
      </ScrollView>
    </View>
  );
};

export default CreateTransactionScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {flex: 1},
  SubHeaderContainer: {
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
});
