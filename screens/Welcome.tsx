import React from 'react';
import { RouteProps } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../routes';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const CreateAccount = styled.View`
  background-color: ${colors.blue};
  padding: 7px 10px;
  border-radius: 3px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
`;

const LogInLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 10px;
`;

const Welcome = ({ navigation }: RouteProps) => {
  const goToCreateAccount = () => navigation.navigate(routes.createAccount);
  const goToLogIn = () => navigation.navigate(routes.logIn);
  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/logo.png')} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogIn}>
        <LogInLink>Log in</LogInLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;
