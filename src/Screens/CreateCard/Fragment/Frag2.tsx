import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';

const Frag2 = () => {
  const width = useWindowDimensions().width;

  return (
    <View style={{backgroundColor: 'blue', flex: 1, width}}>
      <Text>Frag2</Text>
    </View>
  );
};

export default Frag2;

const styles = StyleSheet.create({});
