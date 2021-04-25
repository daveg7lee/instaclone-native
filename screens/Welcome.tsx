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
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const CreateAccount = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 13px 10px;
  margin-top: 20px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const LogInLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

const Welcome = ({ navigation }: RouteProps) => {
  const goToCreateAccount = () => navigation.navigate(routes.createAccount);
  const goToLogIn = () => navigation.navigate(routes.logIn);
  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/logo.png')} />
      <CreateAccount onPress={goToCreateAccount} disabled={false}>
        <CreateAccountText>Create New Account</CreateAccountText>
      </CreateAccount>
      <TouchableOpacity onPress={goToLogIn}>
        <LogInLink>Log In</LogInLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;
