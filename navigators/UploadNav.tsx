import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import routes from '../routes';
import { createStackNavigator } from '@react-navigation/stack';

const { Screen, Navigator } = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

function UploadNav() {
  return (
    <Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: { backgroundColor: 'black' },
      }}
    >
      <Screen name={routes.selectPhoto}>
        {() => (
          <Stack.Navigator>
            <Stack.Screen name={routes.selectPhoto} component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Screen>
      <Screen name={routes.takePhoto} component={TakePhoto} />
    </Navigator>
  );
}

export default UploadNav;
