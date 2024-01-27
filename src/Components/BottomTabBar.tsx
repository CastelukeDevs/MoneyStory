import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import GlobalColor, {Opacity} from '@Utilities/Styles/ThemeColor';
import Icon, {IIconName} from './Common/Icon';
import {Dimension} from '@Utilities/Styles/GlobalStyle';

type ITabIcon = {
  index: number;
  icon: IIconName;
};

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const iconSize = 24;

  const menu: ITabIcon[] = [
    {
      index: 0,
      icon: 'home',
    },
    {
      index: 1,
      icon: 'bar-chart',
    },
    {
      index: 99,
      icon: 'scan-circle',
    },
    {
      index: 2,
      icon: 'card',
    },
    {
      index: 3,
      icon: 'cash',
    },
  ];

  const goToCreateTransaction = () => {
    navigation.navigate('CreateTransactionScreen');
  };

  const onIconPressHandler = (item: ITabIcon) => {
    if (item.index === 99) return goToCreateTransaction();

    const selectedRoutes = state.routes[item.index];
    if (selectedRoutes === undefined) return;
    navigation.navigate(selectedRoutes.name);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: insets.bottom,
        backgroundColor: GlobalColor.light,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 8,
      }}>
      {menu.map((item, index) => {
        const isFocused = item.index === state.index;
        const isMiddle = item.index === 99;
        return (
          <View key={index} style={isMiddle && styles.middleContainer}>
            <Icon
              name={item.icon}
              color={
                isFocused
                  ? GlobalColor.accent
                  : isMiddle
                  ? GlobalColor.light
                  : GlobalColor.dark + Opacity[25]
              }
              size={iconSize}
              onPress={() => onIconPressHandler(item)}
              disabled={isFocused}
            />
            {!isMiddle && (
              <View
                style={[styles.indicator, isFocused && styles.indicatorActive]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  indicator: {
    width: Dimension.SpaceS,
    height: Dimension.SpaceS,
    borderRadius: Dimension.Space,
    alignSelf: 'center',
    marginTop: Dimension.SpaceM,
  },
  indicatorActive: {
    backgroundColor: GlobalColor.accent,
  },
  middleContainer: {
    padding: Dimension.Space,
    backgroundColor: GlobalColor.accent,
    borderRadius: Dimension.RadiusFull,
  },
});
