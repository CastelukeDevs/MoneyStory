import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {IUserType} from '@Types/UserType';
import {textStyle} from '@Utilities/Styles/GlobalStyle';
import GlobalColor from '@Utilities/Styles/GlobalColor';

type IAvatarPillsProps = {
  user: IUserType;
};

const AvatarPills = (props: IAvatarPillsProps) => {
  const user = props.user;
  console.log('user avatar url', user.avatarUrl);

  return (
    <View style={styles.RootContainer}>
      <Image source={{uri: user.avatarUrl}} style={styles.AvatarSize} />
      <View style={{flexDirection: 'column'}}>
        <Text
          style={[textStyle.Content_Regular, {marginRight: 24, marginLeft: 8}]}>
          Good Morning
        </Text>
        <Text
          style={[
            textStyle.Title_Bold,
            {
              marginRight: 24,
              marginLeft: 8,
            },
          ]}>
          <Text>{user.firstName}</Text>
          {/* <Text>{' ' + user.lastName}</Text> */}
        </Text>
      </View>
    </View>
  );
};

export default AvatarPills;

const styles = StyleSheet.create({
  RootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: GlobalColor.accentLight,
    borderRadius: 100,
    flexWrap: 'wrap',
    marginRight: 'auto',
  },
  AvatarSize: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
