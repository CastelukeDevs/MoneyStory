import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {IMainNavPropTypes} from '@Routes/RouteTypes';

import {textStyle} from '@Utilities/Styles/GlobalStyle';
import Button from '@Components/Common/Button';
import {useDispatch} from 'react-redux';
import {createUserData} from '@Redux/Actions/UserAction';

const SignUpImageScreen = (props: IMainNavPropTypes<'ProfileImageScreen'>) => {
  const payload = props.route.params;
  console.log('screen payload', payload);

  const dispatch = useDispatch<any>();

  const onSubmitHandler = () => {
    dispatch(createUserData({data: payload.data!})).then(() => {
      props.navigation.replace('PostAuthTransitionScreen');
    });
  };

  return (
    <View style={styles.RootContainer}>
      <Text style={textStyle.Hero_Bold}>Add your profile picture</Text>
      <View style={styles.ButtonContainer}>
        <Button label="Submit" onPress={onSubmitHandler} />
      </View>
    </View>
  );
};

export default SignUpImageScreen;

const styles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    padding: 18,
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
