import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextInput from './Common/TextInput';
import IconButton from './Common/IconButton';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        label="Search"
        iconLeading={{name: 'search-outline'}}
        containerStyle={{flex: 1}}
      />
      <IconButton
        name="funnel"
        shape="circle"
        mode="bordered"
        style={{marginLeft: 12}}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
