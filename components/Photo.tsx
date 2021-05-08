import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { PhotoType } from '../types';

const Container = styled.View``;

const Header = styled.View``;

const Avatar = styled.Image``;

const Username = styled.Text`
  color: white;
`;

const File = styled.Image``;

const Actions = styled.View``;

const Action = styled.TouchableOpacity``;

const Likes = styled.Text`
  color: white;
`;

const CaptionText = styled.Text`
  color: white;
`;

const Caption = styled.View``;

function Photo({ id, user, caption, file, isLiked, likes }: PhotoType) {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <Header>
        <Avatar />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: height - 450,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action></Action>
        <Action></Action>
      </Actions>
      <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
      <Caption>
        <Username>{user.username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}

export default Photo;
