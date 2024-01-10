import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import GlobalColor, {Opacity} from '@Utilities/Styles/GlobalColor';
import Icon from './Common/Icon';

type ITabIcon = {
  index: number;
  icon: string;
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
      icon: 'home-outline',
    },
    {
      index: 1,
      icon: 'bar-chart-outline',
    },
    {
      index: 99,
      icon: 'scan-circle-outline',
    },
    {
      index: 2,
      icon: 'card-outline',
    },
    {
      index: 3,
      icon: 'cash-outline',
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
    width: 3,
    height: 3,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 8,
  },
  indicatorActive: {
    backgroundColor: GlobalColor.accent,
  },
  middleContainer: {
    padding: 12,
    // borderColor: GlobalColor.overlay80,
    backgroundColor: GlobalColor.accent,
    borderRadius: 100,
    // borderWidth: 1.5,
  },
});
