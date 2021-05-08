import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Text, View } from 'react-native';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import { FlatList } from 'react-native-gesture-handler';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Feed() {
  const { data, loading } = useQuery(FEED_QUERY);
  const renderPhoto = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{item.caption}</Text>
      </View>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeFeed}
        keyExtractor={(photo) => '' + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
export default Feed;
