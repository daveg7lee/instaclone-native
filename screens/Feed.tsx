import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT, USER_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo from '../components/Photo';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProps } from '../types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        ...UserFragment
      }
      caption
      comments {
        ...CommentFragment
      }
      commentNumbers
      createdAt
      isMine
    }
  }
  ${USER_FRAGMENT}
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Feed({ navigation }: RouteProps) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate('Messages')}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{
          width: '100%',
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() =>
          fetchMore({
            variables: { offset: data?.seeFeed?.length },
          })
        }
        refreshing={false}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => '' + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
export default Feed;
