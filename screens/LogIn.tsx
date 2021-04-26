import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import { RouteProps } from '../types';

const LogIn = ({ navigation }: RouteProps) => {
  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="Email"
        returnKeyType="next"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne
      />
    </AuthLayout>
  );
};

export default LogIn;
