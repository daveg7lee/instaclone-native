import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import routes from '../routes';
import Likes from '../screens/Likes';
import PhotoScreen from '../screens/PhotoScreen';

const { Navigator, Screen } = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        headerTintColor: 'white',
        headerBackTitle: ' ',
      }}
    >
      {screenName === routes.feed ? (
        <Screen
          name={'Stack' + screenName}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 135,
                  height: 55,
                }}
                resizeMode="contain"
                source={require('../assets/logo.png')}
              />
            ),
          }}
        />
      ) : null}
      {screenName === routes.search ? (
        <Screen name={'Stack' + screenName} component={Search} />
      ) : null}
      {screenName === routes.notification ? (
        <Screen name={'Stack' + screenName} component={Notifications} />
      ) : null}
      {screenName === routes.me ? (
        <Screen name={'Stack' + screenName} component={Me} />
      ) : null}
      <Screen name={routes.profile} component={Profile} />
      <Screen name={routes.photo} component={PhotoScreen} />
      <Screen name={routes.likes} component={Likes} />
    </Navigator>
  );
}
