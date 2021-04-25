import React from 'react';
import { RouteProps } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';

const LogInLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

const Welcome = ({ navigation }: RouteProps) => {
  const goToCreateAccount = () => navigation.navigate(routes.createAccount);
  const goToLogIn = () => navigation.navigate(routes.logIn);
  return (
    <AuthLayout>
      <AuthButton
        text="Crate New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LogInLink>Log In</LogInLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
