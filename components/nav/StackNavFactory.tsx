import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Photo from '../../screens/Photo';
import Profile from '../../screens/Profile';
import Feed from '../../screens/Feed';
import Search from '../../screens/Search';
import Notifications from '../../screens/Notifications';
import Me from '../../screens/Me';
import routes from '../../routes';

const { Navigator, Screen } = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    >
      {screenName === routes.feed ? (
        <Screen name={screenName} component={Feed} />
      ) : null}
      {screenName === routes.search ? (
        <Screen name={screenName} component={Search} />
      ) : null}
      {screenName === routes.notification ? (
        <Screen name={screenName} component={Notifications} />
      ) : null}
      {screenName === routes.me ? (
        <Screen name={screenName} component={Me} />
      ) : null}
      <Screen name={routes.profile} component={Profile} />
      <Screen name={routes.photo} component={Photo} />
    </Navigator>
  );
}
