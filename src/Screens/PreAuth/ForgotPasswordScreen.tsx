import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeText} from '@Utilities/Styles/GlobalStyle';
import ForgetPassword from '@Utilities/Authentication/ForgetPassword';
import {
  IValidationResult,
  validateEmail,
} from '@Utilities/String/EmailPasswordValidation';

import Button from '@Components/Common/Button';
import TextInput from '@Components/Common/TextInput';

const ForgotPasswordScreen = () => {
  const inset = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<IValidationResult[]>([]);

  const onSendVerificationHandler = async () => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid?.length > 0)
      return setError([{description: 'Email is invalid', name: 'invalid'}]);

    setError([]);

    console.log('error', error);

    await ForgetPassword(email).catch(() => {
      return setError([{description: 'email is invalid', name: 'error'}]);
    });
  };

  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios' && {paddingBottom: inset.bottom},
      ]}>
      <Text style={ThemeText.Hero_Bold}>Forgot your Password</Text>
      <KeyboardAvoidingView style={styles.InputGroupContainer}>
        <Text style={[ThemeText.Content_Regular, {marginBottom: 12}]}>
          Enter Your registered email below to receive password reset Link or
          Instruction
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          label="Email"
          iconLeading={{name: 'mail-outline'}}
          containerStyle={styles.InputSpacing}
          isError={error.length >= 1}
        />
      </KeyboardAvoidingView>
      <View style={styles.FooterContainer}>
        <Button label="Send Verification" onPress={onSendVerificationHandler} />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

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
