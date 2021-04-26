import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';

const CreateAccount = () => {
  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert('done!');
  };
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        style={{
          width: '100%',
        }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <TextInput
          autoFocus
          placeholder="First Name"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={{ backgroundColor: 'white', width: '100%' }}
          onSubmitEditing={() => onNext(lastNameRef)}
        />
        <TextInput
          ref={lastNameRef}
          placeholder="Last Name"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={{ backgroundColor: 'white', width: '100%' }}
          onSubmitEditing={() => onNext(userNameRef)}
        />
        <TextInput
          ref={userNameRef}
          placeholder="Username"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={{ backgroundColor: 'white', width: '100%' }}
          onSubmitEditing={() => onNext(emailRef)}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          returnKeyType="next"
          style={{ backgroundColor: 'white', width: '100%' }}
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          returnKeyType="done"
          style={{ backgroundColor: 'white', width: '100%' }}
          onSubmitEditing={onDone}
        />
        <AuthButton text="Create Account" disabled={true} onPress={() => {}} />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

export default CreateAccount;
