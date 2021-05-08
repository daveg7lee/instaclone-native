import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import routes from '../routes';
import { PhotoType } from '../types';

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
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [file]);
  const goToProfile = () => {
    navigation.navigate(routes.profile);
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        <Avatar resizeMode="cover" source={{ uri: user?.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action></Action>
        <Action></Action>
      </Actions>
      <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
      <Caption>
        <TouchableOpacity onPress={goToProfile}>
          <Username>{user.username}</Username>
        </TouchableOpacity>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}

export default Photo;
