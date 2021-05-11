import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import ScreenLayout from '../components/ScreenLayout';

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View``;
const Author = styled.View``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  width: 95%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;

export default function Room({
  route: {
    params: { id, talkingTo },
  },
  navigation,
}) {
  const { data, loading, refetch } = useQuery(ROOM_QUERY, {
    variables: { id },
  });
  useEffect(() => {
    navigation.setOptions({
      title: talkingTo?.username,
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: '100%' }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => '' + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
