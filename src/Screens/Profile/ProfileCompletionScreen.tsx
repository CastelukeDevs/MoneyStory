import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput as RNInput,
  View,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {IMainNavPropTypes} from '@Routes/RouteTypes';

import {textStyle} from '@Utilities/Styles/GlobalStyle';

import TextInput from '@Components/Common/TextInput';
import Button from '@Components/Common/Button';
import {useDispatch} from 'react-redux';
import {updateUserData} from '@Redux/Actions/UserAction';
import Dropdown, {IDropdownData} from '@Components/Common/Dropdown';
import CurrencyList from '@Utilities/DefaultData/CurrencyList';
import KAVBehavior from '@Utilities/Settings/KAVBehavior';
import {ICurrencyTypes} from '@Types/CommonTypes';

const ProfileCompletionScreen = (
  props: IMainNavPropTypes<'ProfileCompletionScreen'>,
) => {
  const {mode, data} = props.route.params;

  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const isCreate = mode === 'create';

  const lastNameRef = useRef<RNInput>(null);
  const DOBRef = useRef<RNInput>(null);
  const currencyRef = useRef<RNInput>(null);

  const [firstName, setFirstName] = useState(data?.firstName || '');
  const [lastName, setLastName] = useState(data?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(data?.dateOfBirth || '');
  const [defaultCurrency, setDefaultCurrency] = useState('');
  const [selectedCurrency, setSelectedCurrency] =
    useState<ICurrencyTypes | null>();

  const goBack = () => {
    props.navigation.replace('MainDashboard', {screen: 'HomeScreen'});
  };

  const onNextHandler = () => {
    const screenPayload = {
      firstName,
      lastName,
      dateOfBirth,
      defaultCurrency: selectedCurrency || 'IDR',
    };
    props.navigation.navigate('ProfileImageScreen', {
      mode: 'create',
      data: screenPayload,
    });
  };

  const onSubmitHandler = () => {
    const updatePayload = {
      firstName,
      lastName,
      dateOfBirth,
      defaultCurrency: selectedCurrency || 'IDR',
    };
    dispatch(updateUserData({data: updatePayload})).then(() => {
      goBack();
    });
  };

  const onCancelHandler = () => {
    goBack();
  };

  const onLogoutHandler = () => {
    auth().signOut();
  };

  const dropdownData: IDropdownData[] = CurrencyList.map(cur => ({
    label: cur.abbreviation + ' - ' + cur.currency,
    value: cur.abbreviation,
  }));

  return (
    <View
      style={[
        styles.RootContainer,
        Platform.OS === 'ios'
          ? {paddingBottom: inset.bottom}
          : {paddingBottom: 16},
      ]}>
      <Text style={textStyle.Hero_Bold}>
        {isCreate ? 'Complete your Profile' : 'Change your existing Profile'}
      </Text>
      <KeyboardAvoidingView
        style={styles.InputGroupContainer}
        behavior={KAVBehavior}>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          label="First Name"
          iconLeading={{name: 'person-outline'}}
          containerStyle={styles.InputSpacing}
          onSubmitEditing={() => {
            lastNameRef.current?.focus();
          }}
        />
        <TextInput
          ref={lastNameRef}
          value={lastName}
          onChangeText={setLastName}
          label="Last Name"
          iconLeading={{name: 'person-outline'}}
          containerStyle={styles.InputSpacing}
          onSubmitEditing={() => {
            DOBRef.current?.focus();
          }}
        />
        <TextInput
          ref={DOBRef}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          label="Date of Birth"
          iconLeading={{name: 'calendar-outline'}}
          containerStyle={styles.InputSpacing}
          onSubmitEditing={() => {
            currencyRef.current?.focus();
          }}
        />
        <Dropdown
          label="Default Currency"
          ref={currencyRef}
          // showLabel
          value={defaultCurrency}
          onChangeText={setDefaultCurrency}
          dropdown={dropdownData}
          iconLeading={{name: 'logo-usd'}}
          onSelectedChange={v => {
            setSelectedCurrency(v);
          }}
        />
      </KeyboardAvoidingView>
      <View style={styles.FooterContainer}>
        <Button label="Logout" onPress={onLogoutHandler} />
        {isCreate ? (
          <Button label="Next" onPress={onNextHandler} />
        ) : (
          <>
            <Button label="Submit" onPress={onSubmitHandler} />
            <Button label="Cancel" mode="text" onPress={onCancelHandler} />
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileCompletionScreen;

const styles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  InputGroupContainer: {
    flex: 1,
    marginTop: 48,
  },
  InputSpacing: {
    marginBottom: 12,
  },
  FooterContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    zIndex: -1,
  },
});
