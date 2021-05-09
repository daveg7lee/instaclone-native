import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from '../routes';
import { Image, View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import StackNavFactory from './SharedStackNav';
import useMe from '../hooks/useMe';
import { UserType } from '../types';
import styled from 'styled-components/native';

const { Navigator, Screen } = createBottomTabNavigator();

interface DataType {
  me: UserType;
}

const Profile = styled.Image`
  height: 22px;
  width: 22px;
  border-radius: 999px;
`;

const LoggedOutNav = () => {
  const data: DataType = useMe();
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
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Profile
                source={{ uri: data.me.avatar }}
                style={{
                  ...(focused && { borderColor: 'white', borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon name={'person'} color={color} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName={routes.me} />}
      </Screen>
    </Navigator>
  );
};

export default LoggedOutNav;
