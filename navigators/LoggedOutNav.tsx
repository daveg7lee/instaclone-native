import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from '../screens/CreateAccount';
import LogIn from '../screens/LogIn';
import Welcome from '../screens/Welcome';
import routes from '../routes';

const { Navigator, Screen } = createStackNavigator();

const LoggedOutNav = () => {
  return (
    <Navigator
      initialRouteName={routes.welcome}
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    >
      <Screen name={routes.welcome} component={Welcome} />
      <Screen name={routes.logIn} component={LogIn} />
      <Screen name={routes.createAccount} component={CreateAccount} />
    </Navigator>
  );
};

export default LoggedOutNav;
