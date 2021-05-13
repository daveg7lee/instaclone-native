import { gql, useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import useMe from '../hooks/useMe';

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

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

const Top = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Column = styled.View`
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 999px;
`;

const BoldText = styled.Text`
  font-weight: 600;
  color: white;
  font-size: ${(props) => props.size};
`;

const InfoText = styled.Text`
  color: lightgray;
  font-size: ${(props) => (props.size ? props.size : '18px')};
`;

const Bottom = styled.View`
  padding: 0px 15px;
`;

const BtnsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  width: 49%;
  border-radius: 4px;
  padding: 8px 10px;
`;

const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 15;
  text-align: center;
`;

const MessageBtn = styled(FollowBtn)`
  background-color: white;
`;

const MessageBtnText = styled(FollowBtnText)`
  color: black;
`;

function Profile({
  avatar,
  totalFollowers,
  totalFollowing,
  totalPosts,
  username,
  isMe,
  isFollowing,
  bio,
}) {
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
          isFollowing(prev) {
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
  return (
    <Container>
      <Top>
        <Column>
          <Avatar source={{ uri: avatar }} />
        </Column>
        <Column>
          <BoldText size={20}>{totalPosts}</BoldText>
          <InfoText>Posts</InfoText>
        </Column>
        <Column>
          <BoldText size={20}>{totalFollowers}</BoldText>
          <InfoText>Followers</InfoText>
        </Column>
        <Column>
          <BoldText size={20}>{totalFollowing}</BoldText>
          <InfoText>Following</InfoText>
        </Column>
      </Top>
      <Bottom>
        <BoldText size={18}>{username}</BoldText>
        <InfoText size={15}>{bio}</InfoText>
        {!isMe && (
          <BtnsContainer>
            <FollowBtn onPress={toggleFollow}>
              <FollowBtnText>
                {isFollowing ? 'UnFollow' : 'Follow'}
              </FollowBtnText>
            </FollowBtn>
            <MessageBtn>
              <MessageBtnText>Message</MessageBtnText>
            </MessageBtn>
          </BtnsContainer>
        )}
      </Bottom>
    </Container>
  );
}

export default Profile;
