import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../Components/Common/Button';
import {IMainNavPropTypes} from '../../Routes/RouteTypes';
import TextInput from '../../Components/Common/TextInput';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import APICall from '../../Utilities/APIs/APIRequest';
import firebase from '@react-native-firebase/app';

const SignUpProfileScreen = (
  props: IMainNavPropTypes<'SignUpProfileScreen'>,
) => {
  const inset = useSafeAreaInsets();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState('');

  const onNextHandler = () => {
    props.navigation.navigate('SignUpImageScreen');
  };
  const onLogoutHandler = () => {
    auth().signOut();
  };

  const apiTest = () => {
    APICall('GET_USER');
  };
  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios' && {paddingBottom: inset.bottom},
      ]}>
      <Text style={textStyle.Hero_Bold}>Complete your Profile</Text>
      <KeyboardAvoidingView style={styles.InputGroupContainer}>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          label="First Name"
          iconLeading={{name: 'person-outline'}}
          containerStyle={styles.InputSpacing}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          label="Last Name"
          iconLeading={{name: 'person-outline'}}
          containerStyle={styles.InputSpacing}
        />
        <TextInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          label="Date of Birth"
          iconLeading={{name: 'calendar-outline'}}
          containerStyle={styles.InputSpacing}
        />
        <TextInput
          value={defaultCurrency}
          onChangeText={setDefaultCurrency}
          label="Default Currency"
          iconLeading={{name: 'logo-usd'}}
          containerStyle={styles.InputSpacing}
        />
      </KeyboardAvoidingView>
      <View style={styles.FooterContainer}>
        <Button label="API TEST" onPress={apiTest} />
        <Button label="Logout" onPress={onLogoutHandler} />
        <Button label="Next" onPress={onNextHandler} />
      </View>
    </View>
  );
};

export default SignUpProfileScreen;

const styles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    padding: 18,
  },
  InputGroupContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 24,
  },
  InputSpacing: {
    marginBottom: 12,
  },
  FooterContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
