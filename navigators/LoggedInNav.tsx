import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from '../routes';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';

const { Navigator, Screen } = createBottomTabNavigator();

const LoggedOutNav = () => {
  return (
    <Navigator
      initialRouteName={routes.feed}
      tabBarOptions={{
        activeTintColor: 'white',
        showLabel: false,
        style: {
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
      }}
    >
      <Screen
        name={routes.feed}
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Screen
        name={routes.search}
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="search" color={color} focused={focused} />
          ),
        }}
      />
      <Screen
        name={'camera'}
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="add-circle" color={color} focused={focused} />
          ),
        }}
      />
      <Screen
        name={routes.notification}
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="heart" color={color} focused={focused} />
          ),
        }}
      />
      <Screen
        name={routes.profile}
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
};

export default LoggedOutNav;
