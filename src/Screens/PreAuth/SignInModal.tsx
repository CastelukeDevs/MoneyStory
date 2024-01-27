import React, {useRef, useState} from 'react';
import {Text, TextInput as RNTextInput, View} from 'react-native';

import {IUserAuth} from '@Types/AuthTypes';

import {ThemeText} from '@Utilities/Styles/GlobalStyle';

import TextInput from '@Components/Common/TextInput';
import Button from '@Components/Common/Button';
import IconButton from '@Components/Common/IconButton';

type ISignInModalProp = {
  onSignIn: (user: IUserAuth) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
};

const SignInModal = (props: ISignInModalProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const passwordRef = useRef<RNTextInput>(null);

  return (
    <View style={{padding: 18}}>
      <Text style={ThemeText.Hero_Bold}>Login to your Account</Text>
      <TextInput
        label="Email"
        onChangeText={setEmail}
        value={email}
        iconLeading={{name: 'mail-outline'}}
        containerStyle={{marginTop: 12}}
        onSubmitEditing={() => passwordRef.current?.focus()}
        keyboardType="email-address"
      />
      <TextInput
        ref={passwordRef}
        label="Password"
        onChangeText={setPassword}
        value={password}
        iconLeading={{name: 'lock-closed-outline'}}
        iconTrailing={{
          name: isPasswordHidden ? 'eye-outline' : 'eye-off-outline',
          onPress: () => setIsPasswordHidden(!isPasswordHidden),
        }}
        containerStyle={{marginTop: 12}}
        secureTextEntry={isPasswordHidden}
        onSubmitEditing={() => props.onSignIn({email, password})}
      />
      <Button
        label="Login"
        containerStyle={{marginTop: 12}}
        onPress={() => {
          console.log({email, password});

          props.onSignIn({email, password});
        }}
      />
      <Button
        label="Forgot your Password?"
        containerStyle={{marginTop: 12}}
        mode="text"
        onPress={props.onForgotPassword}
      />
      <View style={{height: 50}} />
      <Text style={[ThemeText.Content_Regular, {textAlign: 'center'}]}>
        or continue with
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 12,
        }}>
        <IconButton
          name="logo-google"
          onPress={() => {
            console.log('pressed');
          }}
        />
        <IconButton
          name="logo-facebook"
          onPress={() => {
            console.log('pressed');
          }}
        />
        <IconButton
          name="logo-apple"
          onPress={() => {
            console.log('pressed');
          }}
        />
      </View>
      <View style={{height: 50}} />
      <Text style={{textAlign: 'center', marginBottom: 12}}>
        <Text style={ThemeText.SubTitle_Regular}>Don't have an account? </Text>
        <Text
          style={[ThemeText.SubTitle_Bold, ThemeText.hyperlink]}
          onPress={props.onSignUp}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default SignInModal;
