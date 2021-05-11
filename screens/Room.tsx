import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

export default function Room({
  route: {
    params: { id, talkingTo },
  },
  navigation,
}) {
  const { data } = useQuery(ROOM_QUERY, { variables: { id } });
  console.log(data);
  useEffect(() => {
    navigation.setOptions({
      title: talkingTo?.username,
    });
  }, []);
  return (
    <ScreenLayout>
      <Text>Room</Text>
    </ScreenLayout>
  );
}
