import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IMainNavProp} from '@Routes/RouteTypes';

import {ThemeText} from '@Utilities/Styles/GlobalStyle';
import CreateUserEmailPassword from '@Utilities/Authentication/CreateUserEmailPassword';

import TextInput from '@Components/Common/TextInput';
import Button from '@Components/Common/Button';
import ValidateString from '@Utilities/Tools/ValidateString';

const SignUpScreen = (prop: IMainNavProp<'SignUpScreen'>) => {
  const inset = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [confirmHide, setConfirmHide] = useState(true);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const passwordRef = useRef<RNTextInput>(null);
  const confirmRef = useRef<RNTextInput>(null);

  // console.log('error', error);

  const onRegisterHandler = () => {
    console.log('register attempted');

    const isPasswordValid = ValidateString(password, 'password');
    const isEmailValid = ValidateString(email, 'email');

    if (isEmailValid.length > 0) return setEmailError(isEmailValid);
    setEmailError([]);
    if (isPasswordValid.length > 0) return setPasswordError(isPasswordValid);
    if (password !== confirm) {
      return setPasswordError(['Password not match']);
    }
    setPasswordError([]);

    console.log('ready to sign up new user', {email, password});
    CreateUserEmailPassword({email, password}).catch(() => {
      const generalError = ['General Error'];
      setEmailError(generalError);
      setPasswordError(generalError);
    });
  };

  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios' && {paddingBottom: inset.bottom},
      ]}>
      <Text style={ThemeText.Hero_Bold}>Register new Account</Text>
      <KeyboardAvoidingView style={styles.InputGroupContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          label="Email"
          iconLeading={{name: 'mail-outline'}}
          containerStyle={styles.InputSpacing}
          inputMode="email"
          isError={emailError.length > 0}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={setPassword}
          iconLeading={{name: 'lock-closed-outline'}}
          iconTrailing={{
            name: passwordHide ? 'eye-outline' : 'eye-off-outline',
            onPress: () => setPasswordHide(!passwordHide),
          }}
          containerStyle={styles.InputSpacing}
          secureTextEntry={passwordHide}
          isError={passwordError.length > 0}
          onSubmitEditing={() => confirmRef.current?.focus()}
        />
        <TextInput
          ref={confirmRef}
          label="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          iconLeading={{name: 'lock-closed-outline'}}
          iconTrailing={{
            name: confirmHide ? 'eye-outline' : 'eye-off-outline',
            onPress: () => setConfirmHide(!confirmHide),
          }}
          containerStyle={styles.InputSpacing}
          secureTextEntry={confirmHide}
          isError={passwordError.length > 0}
          onSubmitEditing={onRegisterHandler}
        />
      </KeyboardAvoidingView>
      <View style={styles.FooterContainer}>
        <Button label="Register" onPress={onRegisterHandler} />
      </View>
    </View>
  );
};

export default SignUpScreen;

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
