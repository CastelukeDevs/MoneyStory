import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput as RNInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import TextInput, {ITextInputProps} from './TextInput';
import GlobalColor from '@Utilities/Styles/GlobalColor';

export type IDropdownData = {
  label: string;
  value: any;
};

type IDropdownPropsType = {
  dropdown: IDropdownData[];
  preSelectedIndex?: number;
  zIndex?: number;
  onSelectedChange: (value: any, index?: number) => void;
} & ITextInputProps;

const Dropdown = forwardRef<RNInput, IDropdownPropsType>((props, ref) => {
  const wHeight = useWindowDimensions().height;

  const halfWindow = wHeight / 2;
  const defaultPadding = 12;

  const emptyDropdownData: IDropdownData = {
    label: props.label,
    value: null,
  };

  const dropdownData: IDropdownData[] = props.preSelectedIndex
    ? props.dropdown
    : [emptyDropdownData, ...props.dropdown];

  const defaultDimension: LayoutRectangle = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  const wrapperRef = useRef<View>(null);

  const [inputTextDimension, setInputTextDimension] =
    useState(defaultDimension);
  const [wrapperDimension, setWrapperDimension] = useState(defaultDimension);
  const [dropdownItem, setDropdownItem] = useState(dropdownData);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInTopHalf, setIsInTopHalf] = useState(true);

  useEffect(() => {
    const filtered = dropdownData.filter(item =>
      item.label.toLowerCase().includes(props.value.toLowerCase()),
    );
    setDropdownItem(filtered);
  }, [props.value]);

  wrapperRef.current?.measureInWindow((_, posY) => {
    setIsInTopHalf(posY < halfWindow);
  });

  const onInputTextLayoutHandler = useCallback((ev: LayoutChangeEvent) => {
    const layout = ev.nativeEvent.layout;
    console.log('layout', layout);

    setInputTextDimension(layout);
  }, []);

  const onLayoutWrapperHandler = useCallback((ev: LayoutChangeEvent) => {
    const layout = ev.nativeEvent.layout;
    setWrapperDimension(layout);
  }, []);

  const onFocusHandler = () => {
    setShowDropdown(true);
  };

  const onBlurHandler = () => {
    setShowDropdown(false);
  };

  const onChevronPress = () => {
    setShowDropdown(!showDropdown);
  };

  const onItemPressHandler = (item: IDropdownData, index: number) => {
    setShowDropdown(false);
    props.onSelectedChange(item.value, index);
    props.onChangeText(item.label);
  };

  const positionTopStyle = {
    top: wrapperDimension.height,
  };
  const positionBottomStyle = {
    bottom: wrapperDimension.height - (props.showLabel ? 21 : 0),
  };

  return (
    // <View style={{zIndex: showDropdown ? props.zIndex || 20 : 0}}>
    <>
      <View
        onLayout={onLayoutWrapperHandler}
        ref={wrapperRef}
        style={{zIndex: showDropdown ? props.zIndex || 20 : 0}}>
        <TextInput
          {...props}
          onLayout={onInputTextLayoutHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          iconTrailing={{
            name: showDropdown ? 'chevron-back' : 'chevron-down',
            onPress: onChevronPress,
          }}
          ref={ref}
        />
        {showDropdown && (
          <ScrollView
            bounces={false}
            scrollEnabled
            automaticallyAdjustKeyboardInsets={true}
            style={[
              {
                position: 'absolute',
                backgroundColor: GlobalColor.light,
                width: inputTextDimension.width + defaultPadding * 2,
                left: inputTextDimension.x - defaultPadding,
                borderRadius: defaultPadding,
                //   padding: defaultPadding,
                zIndex: 211,
                maxHeight: 200,
              },
              !isInTopHalf ? positionBottomStyle : positionTopStyle,
            ]}>
            {dropdownItem.map((item, index) =>
              DropdownItem({item, index, onItemPress: onItemPressHandler}),
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
});

type IDropdownItemProps = {
  item: IDropdownData;
  index: number;
  onItemPress?: (item: IDropdownData, index: number) => void;
};
const DropdownItem = ({item, index, onItemPress}: IDropdownItemProps) => {
  const isEmpty = item.value === null;
  return (
    <TouchableOpacity
      disabled={isEmpty}
      key={index.toString()}
      style={styles.DropdownItem}
      onPress={() => onItemPress?.(item, index)}>
      <Text style={textStyle.SubTitle_Regular}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  LabelText: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 4,
  },
  DropdownItem: {
    padding: 12,
  },
});
