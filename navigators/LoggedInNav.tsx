import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from '../routes';
import Feed from '../screens/Feed';

const { Navigator, Screen } = createBottomTabNavigator();

const LoggedOutNav = () => {
  return (
    <Navigator initialRouteName={routes.feed}>
      <Screen name={routes.feed} component={Feed} />
    </Navigator>
  );
};

export default LoggedOutNav;
