import gql from 'graphql-tag';
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProps } from '../types';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import { useQuery } from '@apollo/client';

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

function Feed({ navigation }: RouteProps) {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Feed</Text>
    </View>
  );
}
export default Feed;
