import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RoomItem from '../components/rooms/RoomItem';
import ScreenLayout from '../components/ScreenLayout';
import { ROOM_FRAGMENT } from '../fragments';

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading, refetch } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }: any) => <RoomItem room={room} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          ></View>
        )}
        style={{ width: '100%' }}
        data={data?.seeRooms}
        keyExtractor={(room) => '' + room.id}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
}
