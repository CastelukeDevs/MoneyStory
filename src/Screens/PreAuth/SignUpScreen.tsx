import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {IMainNavPropTypes} from '../../Routes/RouteTypes';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';
import TextInput from '../../Components/Common/TextInput';
import Button from '../../Components/Common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import validatePassword, {
  IValidationResult,
} from '../../Utilities/String/ValidatePassword';
import validateEmail, {
  stringProofEmail,
} from '../../Utilities/String/ValidateEmail';

const SignUpScreen = (prop: IMainNavPropTypes<'SignUpScreen'>) => {
  const inset = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [confirmHide, setConfirmHide] = useState(true);
  const [error, setError] = useState<IValidationResult[]>([]);

  console.log('error', error);

  const onRegisterHandler = () => {
    console.log('register attempted');

    const isPasswordValid = validatePassword(password);
    const isEmailValid = stringProofEmail(email);
    if (isPasswordValid.length > 0) return setError(isPasswordValid);
    if (password !== confirm)
      return setError([{description: 'Password not match', name: 'unmatch'}]);

    console.log('ready to sign up new user', {email: isEmailValid, password});

    // prop.navigation.navigate('SignUpProfileScreen');
    // auth()
    //   .createUserWithEmailAndPassword(
    //     'jane.doe@example.com',
    //     'SuperSecretPassword!',
    //   )
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //   });
  };

  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios' && {paddingBottom: inset.bottom},
      ]}>
      <Text style={textStyle.Hero_Bold}>Register new Account</Text>
      <KeyboardAvoidingView style={styles.InputGroupContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          label="Email"
          iconLeading={{name: 'mail-outline'}}
          containerStyle={styles.InputSpacing}
          inputMode="email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          label="Password"
          iconLeading={{name: 'lock-closed-outline'}}
          iconTrailing={{
            name: passwordHide ? 'eye-outline' : 'eye-off-outline',
            onPress: () => setPasswordHide(!passwordHide),
          }}
          secureTextEntry={passwordHide}
          containerStyle={styles.InputSpacing}
        />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          label="Confirm Password"
          iconLeading={{name: 'lock-closed-outline'}}
          iconTrailing={{
            name: confirmHide ? 'eye-outline' : 'eye-off-outline',
            onPress: () => setConfirmHide(!confirmHide),
          }}
          containerStyle={styles.InputSpacing}
          secureTextEntry={confirmHide}
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
