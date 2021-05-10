import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import routes from '../routes';

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
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'black',
                shadowColor: 'rgba(255, 255, 255, 0.3)',
              },
              headerTintColor: 'white',
              headerBackTitleVisible: false,
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
            <Stack.Screen
              name={routes.selectPhoto}
              options={{ title: 'Choose a photo' }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Screen>
      <Screen name={routes.takePhoto} component={TakePhoto} />
    </Navigator>
  );
}

export default UploadNav;
