import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import routes from '../routes';
import { RouteProps } from '../types';

type CreateAccountForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      success
      error
    }
  }
`;

const CreateAccount = ({ navigation }: RouteProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<CreateAccountForm>();
  const onCompleted = ({ createAccount: { success } }) => {
    const { username, password } = getValues();
    if (success) {
      navigation.navigate(routes.logIn, {
        username,
        password,
      });
    }
  };
  const [
    createAccountMutation,
    { loading },
  ] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({ variables: { ...data } });
    }
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
        disabled={
          !watch(
            'firstName' ||
              !watch(
                'lastName' ||
                  !watch('username' || !watch('email') || !watch('password'))
              )
          )
        }
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
