import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import routes from '../routes';
import Comments from '../screens/Comments';
import UploadNav from './UploadNav';

const { Group, Navigator, Screen } = createStackNavigator();

const LoggedInNav = () => {
  return (
    <Navigator>
      <Group
        screenOptions={{ animationPresentation: 'modal', headerShown: false }}
      >
        <Screen name="Tabs" component={TabsNav} />
        <Screen
          name={routes.upload}
          component={UploadNav}
          options={{
            detachPreviousScreen: true,
          }}
        />
      </Group>
      <Group
        screenOptions={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'black',
            shadowColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <Screen name={routes.comments} component={Comments} />
      </Group>
    </Navigator>
  );
};

export default LoggedInNav;
