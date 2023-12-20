import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IMainNavPropTypes} from '@Routes/RouteTypes';

import {textStyle} from '@Utilities/Styles/GlobalStyle';

import Frag2 from './Fragment/Frag2';
import CardImageFragment from './Fragment/CardImageFragment';

import ProgressBar from '@Components/Common/ProgressBar';
import Header from '@Components/Header';

const CreateCardScreen = (props: IMainNavPropTypes<'CreateCardScreen'>) => {
  const inset = useSafeAreaInsets();
  const width = useWindowDimensions().width;

  const [page, setPage] = useState(1);

  const scrollViewRef = useRef<ScrollView>(null);

  const goToPage = (targetPage: number) => {
    scrollViewRef.current?.scrollTo({x: targetPage * width - width});
  };

  const onNextHandler = () => {
    goToPage(page + 1);
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

  console.log('current page', page);

  const getSubHeaderTitle = () => {
    switch (page) {
      case 1:
        return 'Add new card image';
      case 2:
        return 'Select card logo';
      default:
        return 'Create new card';
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header label="Create Card" onBackPressed={onHeaderBackPressHandler} />
      <View style={styles.SubHeaderContainer}>
        <Text style={textStyle.H3_Bold}>{getSubHeaderTitle()}</Text>
        <View style={{height: 18}} />
        <ProgressBar indicatorActive={page} />
      </View>

      {/* <Button label="Back" onPress={() => props.navigation.goBack()} /> */}
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        snapToInterval={width}
        // disableScrollViewPanResponder
        onMomentumScrollEnd={ev => {
          const scroll = ev.nativeEvent.contentOffset.x;
          const currentPage = (scroll + width) / width;
          setPage(currentPage);
        }}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}>
        <CardImageFragment onNextPress={onNextHandler} />
        <Frag2 />
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
