import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextInput from './Common/TextInput';
import IconButton from './Common/IconButton';
import {Dimension} from '@Utilities/Styles/GlobalStyle';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        label="Search"
        iconLeading={{name: 'search'}}
        containerStyle={{flex: 1}}
      />
      <IconButton
        name="funnel"
        shape="circle"
        buttonMode="bordered"
        onPress={() => console.log('funnel pressed')}
        style={{marginLeft: Dimension.Space}}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
