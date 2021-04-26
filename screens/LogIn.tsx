import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

type LogInForm = {
  username: string;
  password: string;
};

const LogIn = () => {
  const passwordRef = useRef<any>();
  const { register, handleSubmit, setValue } = useForm<LogInForm>();
  const onValid = (data) => {
    console.log(data);
  };
  useEffect(() => {
    register('username', { required: 'Username is required' });
    register('password', { required: 'Password is required' });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => passwordRef?.current?.focus()}
        onChangeText={(text: string) => setValue('username', text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text: string) => setValue('password', text)}
      />
      <AuthButton
        text="Log In"
        onPress={handleSubmit(onValid)}
        disabled={false}
      />
    </AuthLayout>
  );
};

export default LogIn;
