import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { USER_FRAGMENT } from '../fragments';
import useMe from '../hooks/useMe';
import routes from '../routes';
import {
  FOLLOW_USER_MUTATION,
  SEE_ROOMS_QUERY,
  UNFOLLOW_USER_MUTATION,
} from '../shared/shared.query';
import {
  followUserUpdate,
  unfollowUserUpdate,
  toggleFollow,
} from '../shared/shared.utils';
import ScreenLayout from './ScreenLayout';

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($userId: Int!) {
    createRoom(userId: $userId) {
      success
      id
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

function Profile({ username, id }) {
  const { me } = useMe();
  const navigation: any = useNavigation();
  const [createRoomMutation] = useMutation(CREATE_ROOM_MUTATION);
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  const { data: RoomsData } = useQuery(SEE_ROOMS_QUERY);
  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    update: (cache, result) => unfollowUserUpdate(cache, result, username, me),
  });
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    update: (cache, result) => followUserUpdate(cache, result, username, me),
  });
  const onPressMessage = async () => {
    const roomExist = RoomsData?.seeRooms?.map((room) => {
      if (room?.users.find((user) => user.id === id)) {
        return room.id;
      }
    });
    if (!roomExist) {
      const {
        data: { id: createdId },
      } = await createRoomMutation({ variables: { userId: id } });
      navigation.navigate('Messages', {
        screen: routes.room,
        params: {
          id: createdId,
          talkingTo: { ...data?.seeProfile },
        },
      });
    }
    navigation.navigate('Messages', {
      screen: routes.room,
      params: {
        id: roomExist,
        talkingTo: { ...data?.seeProfile },
      },
    });
  };
  return (
    <ScreenLayout loading={loading}>
      <Container>
        <Top>
          <Column>
            <Avatar source={{ uri: data?.seeProfile?.avatar }} />
          </Column>
          <Column>
            <BoldText size={20}>{data?.seeProfile?.totalPosts}</BoldText>
            <InfoText>Posts</InfoText>
          </Column>
          <Column>
            <BoldText size={20}>{data?.seeProfile?.totalFollowers}</BoldText>
            <InfoText>Followers</InfoText>
          </Column>
          <Column>
            <BoldText size={20}>{data?.seeProfile?.totalFollowing}</BoldText>
            <InfoText>Following</InfoText>
          </Column>
        </Top>
        <Bottom>
          <BoldText size={18}>{username}</BoldText>
          <InfoText size={15}>{data?.seeProfile?.bio}</InfoText>
          {!data?.seeProfile?.isMe && (
            <BtnsContainer>
              <FollowBtn
                onPress={() =>
                  toggleFollow(
                    data?.seeProfile?.isFollowing,
                    unfollowUserMutation,
                    followUserMutation
                  )
                }
              >
                <FollowBtnText>
                  {data?.seeProfile?.isFollowing ? 'UnFollow' : 'Follow'}
                </FollowBtnText>
              </FollowBtn>
              <MessageBtn onPress={onPressMessage}>
                <MessageBtnText>Message</MessageBtnText>
              </MessageBtn>
            </BtnsContainer>
          )}
        </Bottom>
      </Container>
    </ScreenLayout>
  );
}

export default Profile;
