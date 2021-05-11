import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import useMe from '../../hooks/useMe';
import routes from '../../routes';

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;

const UnreadDot = styled.View`
  width: 10px;
  border-radius: 5px;
  height: 10px;
  background-color: ${colors.blue};
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;

function RoomItem({ room }: any) {
  const navigation = useNavigation();
  const { me } = useMe();
  const talkingTo = room.users.find((user) => user.username !== me?.username);
  return (
    <RoomContainer
      onPress={() =>
        navigation.navigate(routes.room, { id: room.id, talkingTo })
      }
    >
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.username}</Username>
          <UnreadText>
            {room.unreadTotal} unread{' '}
            {room.unreadTotal === 1 ? 'message' : 'messages'}
          </UnreadText>
        </Data>
      </Column>
      <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}

export default RoomItem;
