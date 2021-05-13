import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import useMe from '../hooks/useMe';
import routes from '../routes';

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      success
      error
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      success
      error
    }
  }
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

function UserRow({ id, avatar, username, isFollowing, isMe }) {
  const { me } = useMe();
  const unfollowUserUpdate = (cache: any, result: any) => {
    const {
      data: {
        unfollowUser: { success },
      },
    } = result;
    if (success) {
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing() {
            return false;
          },
          totalFollowers(prev: number) {
            return prev - 1;
          },
        },
      });
      cache.modify({
        id: `User:${me?.username}`,
        fields: {
          totalFollowers(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };
  const followUserUpdate = (cache: any, result: any) => {
    const {
      data: {
        followUser: { success },
      },
    } = result;
    if (!success) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing() {
          return true;
        },
        totalFollowers(prev: number) {
          return prev + 1;
        },
      },
    });
    cache.modify({
      id: `User:${me?.username}`,
      fields: {
        totalFollowers(prev: number) {
          return prev + 1;
        },
      },
    });
  };
  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    update: unfollowUserUpdate,
  });
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    update: followUserUpdate,
  });
  const toggleFollow = async () => {
    if (isFollowing) {
      await unfollowUserMutation();
    } else {
      await followUserMutation();
    }
  };
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate(routes.profile, { username, id });
  };
  return (
    <Wrapper>
      <Column onPress={goToProfile}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn onPress={toggleFollow}>
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}

export default UserRow;
