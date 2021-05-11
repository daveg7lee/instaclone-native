import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int!, $userId: Int!) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      success
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
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

const MessageContainer = styled.View`
  padding: 10px;
  flex-direction: ${(props) => (props.outGoing ? 'row-reverse' : 'row')};
  align-items: flex-end;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  height: 23px;
  width: 23px;
  border-radius: 999px;
`;
const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 16px;
  margin: 0px 8px;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
`;

export default function Room({
  route: {
    params: { id, talkingTo },
  },
  navigation,
}) {
  const { me } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && me) {
      const { message } = getValues();
      setValue('payload', '');
      const messageObj = {
        id,
        payload: message,
        user: {
          username: me.username,
          avatar: me.avatar,
        },
        read: true,
        __typename: 'Message',
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: { id },
  });
  const onValid = ({ payload }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload,
          roomId: id,
          userId: talkingTo?.id,
        },
      });
    }
  };
  useEffect(() => {
    navigation.setOptions({
      title: talkingTo?.username,
    });
  }, []);
  useEffect(() => {
    register('payload', { required: true });
  }, [register]);
  const renderItem = ({ item: message }) => (
    <MessageContainer outGoing={message.user.username !== talkingTo?.username}>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="padding"
      keyboardVerticalOffset={110}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: '100%', paddingVertical: 10 }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => '' + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={watch('payload')}
          onChangeText={(value) => setValue('payload', value)}
          onSubmitEditing={handleSubmit(onValid)}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
