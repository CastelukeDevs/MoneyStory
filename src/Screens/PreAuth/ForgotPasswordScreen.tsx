import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInput from '../../Components/Common/TextInput';
import Button from '../../Components/Common/Button';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';

const ForgotPasswordScreen = () => {
  const inset = useSafeAreaInsets();

  const [Email, setEmail] = useState('');

  const onSendVerificationHandler = () => {};

  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios' && {paddingBottom: inset.bottom},
      ]}>
      <Text style={textStyle.Hero_Bold}>Forgot your Password</Text>
      <KeyboardAvoidingView style={styles.InputGroupContainer}>
        <Text style={[textStyle.Content_Regular, {marginBottom: 12}]}>
          Enter Your registered email below to receive password reset Link or
          Instruction
        </Text>
        <TextInput
          value={Email}
          onChangeText={setEmail}
          label="Email"
          iconLeading={{name: 'mail-outline'}}
          containerStyle={styles.InputSpacing}
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
