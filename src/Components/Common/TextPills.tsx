import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeText} from '@Utilities/Styles/GlobalStyle';
import ThemeColor, {Opacity} from '@Utilities/Styles/ThemeColor';

const TextPills = (props: {text: string; color?: string}) => {
  const color = props.color || ThemeColor.accent;
  return (
    <View
      style={[
        styles.ContainerStyle,
        {borderColor: color, backgroundColor: color + Opacity[10]},
      ]}>
      <Text
        numberOfLines={1}
        style={[
          ThemeText.Content_Bold,
          styles.TextStyle,
          {
            color: color,
          },
        ]}>
        {props.text}
      </Text>
    </View>
  );
};
export default TextPills;

const styles = StyleSheet.create({
  ContainerStyle: {
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  TextStyle: {
    // flex: 2,
    textAlign: 'center',
  },
});
