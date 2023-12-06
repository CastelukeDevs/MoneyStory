import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInput from '../../Components/Common/TextInput';
import {textStyle} from '../../Utilities/Styles/GlobalStyle';
import Button from '../../Components/Common/Button';
import IconButton from '../../Components/Common/IconButton';
import {IUserAuth} from '../../Types/Types';

type ISignInModalProp = {
  onSignIn: (user: IUserAuth) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
};

const SignInModal = (prop: ISignInModalProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View style={{padding: 18}}>
      <Text style={textStyle.Hero_Bold}>Login to your Account</Text>
      <TextInput
        label="Email"
        onChangeText={setEmail}
        value={email}
        iconLeading={{name: 'mail-outline'}}
        containerStyle={{marginTop: 12}}
      />
      <TextInput
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
      />
      <Button
        label="Login"
        containerStyle={{marginTop: 12}}
        onPress={() => {
          console.log({email, password});

          prop.onSignIn({email, password});
        }}
      />
      <Button
        label="Forgot your Password?"
        containerStyle={{marginTop: 12}}
        mode="text"
        onPress={prop.onForgotPassword}
      />
      <View style={{height: 50}} />
      <Text style={[textStyle.Content_Regular, {textAlign: 'center'}]}>
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
        <Text style={textStyle.SubTitle_Regular}>Don't have an account? </Text>
        <Text
          style={[textStyle.SubTitle_Bold, textStyle.hyperlink]}
          onPress={prop.onSignUp}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default SignInModal;
