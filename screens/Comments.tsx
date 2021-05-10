import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { USER_FRAGMENT } from '../fragments';
import CommentRow from '../components/CommentRow';
import { useForm } from 'react-hook-form';
import useMe from '../hooks/useMe';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: black;
`;

const Input = styled.TextInput`
  background-color: white;
  width: 75%;
  padding: 10px;
  border-radius: 999px;
  border: lightgray;
  margin-bottom: 10px;
`;

const Avatar = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const InputContainer = styled.View`
  background-color: black;
  height: 90px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SEE_PHOTO_COMMENTS = gql`
  query seePhotoComments($id: Int!, $offset: Int) {
    seePhotoComments(id: $id, offset: $offset) {
      id
      user {
        ...UserFragment
      }
      payload
      isMine
    }
  }
  ${USER_FRAGMENT}
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      success
      error
      id
    }
  }
`;

const PAYLOAD = 'payload';

function Comments({
  route: {
    params: { id: photoId },
  },
}) {
  const { me } = useMe();
  const { register, setValue, handleSubmit, watch } = useForm();
  useEffect(() => {
    register(PAYLOAD, { required: true, minLength: 3 });
  }, [register]);
  const { data, fetchMore, refetch } = useQuery(SEE_PHOTO_COMMENTS, {
    variables: { id: photoId, offset: 0 },
  });
  const [createCommentMutation] = useMutation(CREATE_COMMENT_MUTATION);
  const onValid = async ({ payload }) => {
    await createCommentMutation({ variables: { payload, photoId } });
    setValue(PAYLOAD, '');
    refetch();
  };
  const renderItem = ({ item: comment }) => (
    <CommentRow {...comment} photoId={photoId} />
  );
  return (
    <DismissKeyboard>
      <Container
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          style={{
            width: '100%',
          }}
          onEndReachedThreshold={0.2}
          onEndReached={() =>
            fetchMore({
              variables: { offset: data?.seePhotoComments?.length },
            })
          }
          refreshing={false}
          onRefresh={refetch}
          showsVerticalScrollIndicator={false}
          data={data?.seePhotoComments}
          keyExtractor={(comment) => '' + comment.id}
          renderItem={renderItem}
        />
        <InputContainer>
          <Avatar source={{ uri: me?.avatar }} />
          <Input
            placeholder="Write Comment..."
            autoCorrect={false}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            onChangeText={(text) => setValue(PAYLOAD, text)}
            value={watch(PAYLOAD)}
            onSubmitEditing={handleSubmit(onValid)}
          />
        </InputContainer>
      </Container>
    </DismissKeyboard>
  );
}

export default Comments;
