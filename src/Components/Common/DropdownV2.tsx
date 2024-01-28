import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import IconButton from './IconButton';
import {Dimension, ThemeText} from '@Utilities/Styles/GlobalStyle';
import Icon, {IIconName} from './Icon';
import GlobalColor, {Opacity} from '@Utilities/Styles/ThemeColor';
import {ScrollView} from 'react-native-gesture-handler';

export type IDropdownItem = {
  label: string;
  subLabel?: string;
  icon?: IIconName;
  value: any;
};

type IDropdownPropType = {
  items: IDropdownItem[];
  initialIndex?: number;
  onSelected?: (value: any, index: number, item: IDropdownItem) => void;
  onOpen?: (isOpen: boolean) => void;
};

const DropdownV2 = (props: IDropdownPropType) => {
  const wHeight = useWindowDimensions().height;

  const halfWindow = wHeight / 2;
  const items = props.items;

  const initialIndex = props.initialIndex
    ? props.initialIndex >= items.length
      ? items.length - 1
      : props.initialIndex
    : 0;

  const [dropdownItems, setDropdownItems] = useState<IDropdownItem[]>(items);
  const [showDropdown, setShowDropdown] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [posTop, setPosTop] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const wrapperRef = useRef<View>(null);

  useEffect(() => {
    setDropdownItems(items);
    setSelectedIndex(initialIndex);
  }, [items]);

  const onPressHandler = () => {
    setShowDropdown(!showDropdown);
    props.onOpen?.(!showDropdown);
  };

  const onItemPress = (selected: IDropdownItem, index: number) => {
    props.onSelected?.(selected.value, index, selected);
    setSelectedIndex(index);
    setShowDropdown(false);
  };

  const onLayoutWrapperHandler = useCallback((ev: LayoutChangeEvent) => {
    const layout = ev.nativeEvent.layout;
    // console.log('layout', layout);

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
        {ItemRender(dropdownItems[selectedIndex])}
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
              key={item.value}
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
    {items.icon !== undefined && (
      <IconButton name={items.icon} shape="circle" />
    )}
    <View style={styles.ItemTextContainer}>
      <Text style={ThemeText.SubTitle_Bold}>{items.label}</Text>
      {items.subLabel && (
        <Text style={ThemeText.SubTitle_Regular}>{items.subLabel}</Text>
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
    borderRadius: Dimension.Space,
    zIndex: 1,
  },
  DropMainContainer: {
    flexDirection: 'row',
    padding: Dimension.Space,
    backgroundColor: GlobalColor.dark + Opacity[10],
    borderRadius: Dimension.Space,
    alignItems: 'center',
  },
});
