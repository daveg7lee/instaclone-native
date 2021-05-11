import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import TabsNav from './TabsNav';
import routes from '../routes';
import Comments from '../screens/Comments';
import UploadNav from './UploadNav';
import Upload from '../screens/Upload';

const { Group, Navigator, Screen } = createStackNavigator();

const LoggedInNav = () => {
  return (
    <Navigator>
      <Group
        screenOptions={{ animationPresentation: 'modal', headerShown: false }}
      >
        <Screen
          name="Tabs"
          component={TabsNav}
          options={{ animationEnabled: false }}
        />
        <Screen name={'UploadNav'} component={UploadNav} />
      </Group>
      <Group
        screenOptions={{
          animationPresentation: 'modal',
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'black',
            shadowColor: 'rgba(255, 255, 255, 0.3)',
          },
          headerBackImage: () => (
            <Ionicons
              name="close"
              color="white"
              size={28}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      >
        <Screen
          name={routes.upload}
          options={{ title: 'Upload' }}
          component={Upload}
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
