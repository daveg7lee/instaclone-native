import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import routes from '../routes';
import Comments from '../screens/Comments';
import Upload from '../screens/Upload';

const { Navigator, Screen } = createStackNavigator();

const LoggedInNav = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} mode="modal">
      <Screen name="Tabs" component={TabsNav} />
      <Screen name={routes.comments} component={Comments} />
      <Screen name={routes.upload} component={Upload} />
    </Navigator>
  );
};

export default LoggedInNav;
