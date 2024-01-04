import React, {useCallback, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import IconButton from './IconButton';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import Icon from './Icon';
import GlobalColor, {Opacity} from '@Utilities/Styles/GlobalColor';
import {ScrollView} from 'react-native-gesture-handler';

export type IDropdownItem = {
  label: string;
  subLabel?: string;
  icon?: string;
  value: any;
};

type IDropdownPropType = {
  items: IDropdownItem[];
  initialIndex?: number;
  onSelected?: (value: any, index: number, item: IDropdownItem) => void;
};

const DropdownV2 = (props: IDropdownPropType) => {
  const wHeight = useWindowDimensions().height;

  const halfWindow = wHeight / 2;
  const dropdownItems = props.items;
  const initialItems = dropdownItems[props.initialIndex || 0];

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDropdownItem>(initialItems);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [posTop, setPosTop] = useState(true);

  const wrapperRef = useRef<View>(null);

  const onPressHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const onItemPress = (selected: IDropdownItem, index: number) => {
    props.onSelected?.(selected.value, index, selected);
    setSelectedItem(selected);
    setShowDropdown(false);
  };

  const onLayoutWrapperHandler = useCallback((ev: LayoutChangeEvent) => {
    const layout = ev.nativeEvent.layout;
    console.log('layout', layout);

    setWrapperHeight(layout.height);
  }, []);

  wrapperRef.current?.measureInWindow((_, posY) => {
    const isTopHalf = posY < halfWindow;
    setPosTop(isTopHalf);
  });

  const positionWiseDropdown = posTop
    ? {top: wrapperHeight}
    : {bottom: wrapperHeight};

  return (
    <View
      ref={wrapperRef}
      onLayout={onLayoutWrapperHandler}
      style={{zIndex: showDropdown ? 20 : 0}}>
      <TouchableOpacity
        onPress={onPressHandler}
        style={styles.DropMainContainer}>
        {ItemRender(selectedItem)}
        <Icon name={showDropdown ? 'chevron-back' : 'chevron-down'} />
      </TouchableOpacity>
      {showDropdown && (
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            padding: 6,
          }}
          style={[
            styles.DropContainer,
            {maxHeight: wrapperHeight * 3.5},
            positionWiseDropdown,
          ]}>
          {dropdownItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{padding: 4}}
              onPress={() => onItemPress(item, i)}>
              {ItemRender(item)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const ItemRender = (items: IDropdownItem) => (
  <View style={styles.ItemGeneral}>
    <IconButton name={items.icon} shape="circle" />
    <View style={styles.ItemTextContainer}>
      <Text style={textStyle.SubTitle_Bold}>{items.label}</Text>
      {items.subLabel && (
        <Text style={textStyle.SubTitle_Regular}>{items.subLabel}</Text>
      )}
    </View>
  </View>
);

export default DropdownV2;

const styles = StyleSheet.create({
  ItemGeneral: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ItemTextContainer: {justifyContent: 'center', marginHorizontal: 8, flex: 1},
  DropContainer: {
    position: 'absolute',
    backgroundColor: GlobalColor.light,
    width: '100%',
    // paddingHorizontal: 4,
    // paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  DropMainContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: GlobalColor.dark + Opacity[10],
    borderRadius: 12,
    alignItems: 'center',
  },
});
