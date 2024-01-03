import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconButton from './IconButton';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import Icon from './Icon';
import GlobalColor, {Opacity} from '@Utilities/Styles/GlobalColor';

export type IDropdownItem = {
  label: string;
  subLabel?: string;
  icon?: string;
  value: any;
};

type IDropdownPropType = {
  items: IDropdownItem[];
};
const DropdownV2 = (props: IDropdownPropType) => {
  const item = props.items[0];
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: GlobalColor.dark + Opacity[20],
        borderRadius: 12,
      }}>
      <IconButton name={item.icon} shape="circle" />
      <View style={{justifyContent: 'center', marginHorizontal: 8, flex: 1}}>
        <Text style={textStyle.SubTitle_Bold}>{item.label}</Text>
        {item.subLabel && (
          <Text style={textStyle.SubTitle_Regular}>{item.subLabel}</Text>
        )}
      </View>
      <Icon name="chevron-back" />
    </View>
  );
};

export default DropdownV2;

const styles = StyleSheet.create({});
