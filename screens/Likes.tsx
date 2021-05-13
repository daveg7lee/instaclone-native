import gql from 'graphql-tag';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import { FlatList } from 'react-native-gesture-handler';
import UserRow from '../components/UserRow';
import Seperator from '../components/Seperator';

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

function Likes({ route: { params } }) {
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: params?.id,
    },
    skip: !params?.id,
  });
  const renderUser = ({ item: user }) => <UserRow {...user} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={Seperator}
        refreshing={false}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => '' + item.id}
        renderItem={renderUser}
        style={{ width: '100%' }}
      />
    </ScreenLayout>
  );
}

export default Likes;
