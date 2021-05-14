import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import useMe from '../hooks/useMe';
import routes from '../routes';
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from '../shared/shared.query';
import {
  followUserUpdate,
  toggleFollow,
  unfollowUserUpdate,
} from '../shared/shared.utils';

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
  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    update: (cache, result) => unfollowUserUpdate(cache, result, username, me),
  });
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    update: (cache, result) => followUserUpdate(cache, result, username, me),
  });
  const navigation: any = useNavigation();
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
        <FollowBtn
          onPress={() =>
            toggleFollow(isFollowing, followUserMutation, unfollowUserMutation)
          }
        >
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}

export default UserRow;
