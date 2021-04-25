import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';

const CreateAccount = () => {
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => {}} />
    </AuthLayout>
  );
};

export default CreateAccount;
