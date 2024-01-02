import ActivityListCard from '@Components/ActivityListCard';
import {IRootStateType} from '@Redux/Store';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const ActivityListScreen = () => {
  const transactionList = useSelector(
    (state: IRootStateType) => state.transaction.allTransaction,
  );

  const itemSeparator = () => <View style={{height: 12}} />;

  return (
    <View style={styles.RootContainer}>
      {/* <Text>ActivityListScreen</Text> */}
      <FlatList
        data={transactionList}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ActivityListCard transaction={item} />}
        contentContainerStyle={styles.FlatListContentContainer}
        style={styles.FlatListStyle}
      />
    </View>
  );
};

export default ActivityListScreen;

const styles = StyleSheet.create({
  RootContainer: {flex: 1},
  FlatListStyle: {flex: 1},
  FlatListContentContainer: {paddingVertical: 12},
});
