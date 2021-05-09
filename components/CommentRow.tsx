import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import routes from '../routes';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  margin-right: 5px;
`;

const Payload = styled.Text`
  color: white;
`;

const DeleteBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 5px 10px;
  border-radius: 4px;
`;

const DeleteBtnText = styled.Text`
  color: white;
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int) {
    deleteComment(id: $id) {
      success
      error
    }
  }
`;

function CommentRow({
  photoId,
  id,
  payload,
  user: { username, avatar, id: userId },
  isMine,
}) {
  const deleteCommentUpdate = (
    cache: any,
    {
      data: {
        deleteComment: { success },
      },
    }: any
  ) => {
    if (success) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumbers(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
    update: deleteCommentUpdate,
  });
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate(routes.profile, { username, id: userId });
  };
  return (
    <Wrapper>
      <Column onPress={goToProfile}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
        <Payload>{payload}</Payload>
      </Column>
      {isMine && (
        <DeleteBtn onPress={deleteCommentMutation}>
          <DeleteBtnText>Delete</DeleteBtnText>
        </DeleteBtn>
      )}
    </Wrapper>
  );
}

export default CommentRow;
