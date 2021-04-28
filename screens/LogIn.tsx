import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

type LogInForm = {
  username: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      success
      token
      error
    }
  }
`;

const LogIn = ({ route: { params } }) => {
  const passwordRef = useRef<any>();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const onCompleted = ({ logIn: { success, token } }) => {
    if (success) {
      isLoggedInVar(true);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: onCompleted,
  });
  const onValid = (data: LogInForm) => {
    if (!loading) {
      logInMutation({ variables: { ...data } });
    }
  };
  useEffect(() => {
    register('username', { required: 'Username is required' });
    register('password', { required: 'Password is required' });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch('username')}
        autoFocus
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => passwordRef?.current?.focus()}
        onChangeText={(text: string) => setValue('username', text)}
        placeholderTextColor="gray"
      />
      <TextInput
        value={watch('password')}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text: string) => setValue('password', text)}
        placeholderTextColor="gray"
      />
      <AuthButton
        text="Log In"
        loading={loading}
        onPress={handleSubmit(onValid)}
        disabled={!watch('username') || !watch('password')}
      />
    </AuthLayout>
  );
};

export default LogIn;
