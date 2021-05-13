import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import routes from '../routes';
import { gql, useMutation } from '@apollo/client';
import { goToProfile } from '../utils';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      success
      error
    }
  }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 999px;
  margin-right: 8px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

const File = styled.Image``;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Action = styled.TouchableOpacity`
  margin-right: 8px;
`;

const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;

const Caption = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CaptionText = styled.Text`
  margin-left: 5px;
  color: white;
`;

function Photo({ id, user, caption, file, isLiked, likes }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, (_, height) => {
      setImageHeight(height / 4.5);
    });
  }, [file]);
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { success },
      },
    } = result;
    if (success) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <Container>
      <Header onPress={() => goToProfile(user, navigation)}>
        <Avatar source={{ uri: user?.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              color={isLiked ? 'tomato' : 'white'}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate(routes.comments, { id })}>
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.likes, { id })}
        >
          <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => goToProfile(user, navigation)}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}

export default Photo;
