import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Room from '../screens/Room';
import Rooms from '../screens/Rooms';
import routes from '../routes';

const Stack = createStackNavigator();

export default function MessagesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      <Stack.Screen
        name={routes.rooms}
        component={Rooms}
        options={{
          headerBackImage: () => (
            <Ionicons
              name="close"
              size={28}
              color="white"
              style={{ marginLeft: 5 }}
            />
          ),
        }}
      />
      <Stack.Screen name={routes.room} component={Room} />
    </Stack.Navigator>
  );
}
