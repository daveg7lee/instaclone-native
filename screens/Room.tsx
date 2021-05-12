import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';
import { MESSAGE_FRAGMENT } from '../fragments';

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
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
        ...MessageFragment
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
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
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
  width: 100%;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
  margin-top: 15px;
  width: 95%;
  flex-direction: row;
  align-items: center;
`;

const SendBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;

export default function Room({
  route: {
    params: { id, talkingTo },
  },
  navigation,
}) {
  const { me } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  useEffect(() => {
    register('payload', { required: true });
  }, [register]);
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { success, id: messageId },
      },
    } = result;
    if (success && me) {
      const { payload } = getValues();
      setValue('payload', '');
      const messageObj = {
        id: messageId,
        payload,
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
            return [messageFragment, ...prev];
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
  const { data, loading, subscribeToMore } = useQuery(ROOM_QUERY, {
    variables: { id },
  });
  const client = useApolloClient();
  const updateQuery = (prevQuery, options) => {
    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = options;
    if (message.id) {
      const incomingMessage = client.cache.writeFragment({
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
        data: message,
      });
      client.cache.modify({
        id: `Room:${id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === incomingMessage?.__ref
            );
            if (existingMessage) {
              return prev;
            }
            return [...prev, incomingMessage];
          },
        },
      });
    }
  };
  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: { id },
        updateQuery,
      });
    }
  }, [data]);
  const onValid = ({ payload }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload,
          roomId: id,
        },
      });
    }
  };
  useEffect(() => {
    navigation.setOptions({
      title: talkingTo?.username,
    });
  }, []);
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
      keyboardVerticalOffset={130}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: '100%', marginVertical: 10 }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => '' + message.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <InputContainer>
          <TextInput
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={watch('payload')}
            onChangeText={(value) => setValue('payload', value)}
            onSubmitEditing={handleSubmit(onValid)}
          />
          <SendBtn
            disabled={!Boolean(watch('payload'))}
            onPress={handleSubmit(onValid)}
          >
            <Ionicons
              name="paper-plane"
              color={
                !Boolean(watch('payload'))
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'white'
              }
              size={23}
            />
          </SendBtn>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
