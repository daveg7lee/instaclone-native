import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from '../screens/CreateAccount';
import LogIn from '../screens/LogIn';
import Welcome from '../screens/Welcome';

const { Navigator, Screen } = createStackNavigator();

const LoggedOutNav = () => {
  return (
    <Navigator>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="LogIn" component={LogIn} />
      <Screen name="CreateAccount" component={CreateAccount} />
    </Navigator>
  );
};

export default LoggedOutNav;
