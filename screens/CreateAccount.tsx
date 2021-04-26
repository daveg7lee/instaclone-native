import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

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
          returnKeyType="next"
          onSubmitEditing={() => onNext(lastNameRef)}
        />
        <TextInput
          ref={lastNameRef}
          placeholder="Last Name"
          returnKeyType="next"
          onSubmitEditing={() => onNext(userNameRef)}
        />
        <TextInput
          ref={userNameRef}
          placeholder="Username"
          returnKeyType="next"
          onSubmitEditing={() => onNext(emailRef)}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={onDone}
          lastOne
        />
        <AuthButton text="Create Account" disabled={true} onPress={() => {}} />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

export default CreateAccount;
