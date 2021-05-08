import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from '../routes';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import StackNavFactory from './SharedStackNav';

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
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={routes.feed} />}
      </Screen>
      <Screen
        name={routes.search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="search" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={routes.search} />}
      </Screen>
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
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="heart" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={routes.notification} />}
      </Screen>
      <Screen
        name={routes.me}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="person" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={routes.me} />}
      </Screen>
    </Navigator>
  );
};

export default LoggedOutNav;
