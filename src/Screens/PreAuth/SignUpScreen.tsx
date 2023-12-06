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

const SignUpScreen = (prop: IMainNavPropTypes<'SignUpScreen'>) => {
  const inset = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [confirmHide, setConfirmHide] = useState(true);

  const onRegisterHandler = () => {
    prop.navigation.navigate('SignUpProfileScreen');
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
          onChange={setEmail}
          label="Email"
          iconLeading={{name: 'mail-outline'}}
          style={styles.InputSpacing}
        />
        <TextInput
          value={password}
          onChange={setPassword}
          label="Password"
          iconLeading={{name: 'lock-closed-outline'}}
          iconTrailing={{
            name: passwordHide ? 'eye-outline' : 'eye-off-outline',
            onPress: () => setPasswordHide(!passwordHide),
          }}
          options={{secureTextEntry: passwordHide}}
          style={styles.InputSpacing}
        />
        <TextInput
          value={confirm}
          onChange={setConfirm}
          label="Confirm Password"
          iconLeading={{name: 'lock-closed-outline'}}
          iconTrailing={{
            name: confirmHide ? 'eye-outline' : 'eye-off-outline',
            onPress: () => setConfirmHide(!confirmHide),
          }}
          options={{secureTextEntry: confirmHide}}
          style={styles.InputSpacing}
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
