import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

type CreateAccountForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const CreateAccount = () => {
  const { register, handleSubmit, setValue } = useForm<CreateAccountForm>();
  const onValid = (data) => {
    console.log(data);
  };
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  useEffect(() => {
    register('firstName', { required: 'first Name is required' });
    register('lastName', { required: 'last Name is required' });
    register('username', { required: 'Username is required' });
    register('email', { required: 'Email is required' });
    register('password', { required: 'Password is required' });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue('firstName', text)}
        placeholderTextColor="gray"
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(userNameRef)}
        onChangeText={(text) => setValue('lastName', text)}
        placeholderTextColor="gray"
      />
      <TextInput
        ref={userNameRef}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue('username', text)}
        placeholderTextColor="gray"
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('email', text)}
        placeholderTextColor="gray"
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
        placeholderTextColor="gray"
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
        loading
      />
    </AuthLayout>
  );
};

export default CreateAccount;
