import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import { FlatList } from 'react-native-gesture-handler';
import UserRow from '../components/UserRow';

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

function Likes({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: params?.id,
    },
    skip: !params?.id,
  });
  console.log(data);
  const renderUser = ({ item: user }) => <UserRow {...user} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refetch}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => '' + item.id}
        renderItem={renderUser}
        style={{ width: '100%' }}
      />
    </ScreenLayout>
  );
}

export default Likes;
