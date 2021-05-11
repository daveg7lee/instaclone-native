import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Platform } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import HeaderRight from '../components/HeaderRight';
import { FEED_PHOTO } from '../fragments';
import { ReactNativeFile } from 'apollo-upload-client';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  background-color: black;
  padding: 0px 30px;
`;

const Photo = styled.Image`
  height: 350px;
`;

const CaptionContainer = styled.View`
  margin-top: 30px;
`;

const Caption = styled.TextInput`
  background-color: white;
  padding: 10px 20px;
  border-radius: 999px;
`;

function Upload({
  route: {
    params: { file: uri },
  },
  navigation,
}) {
  const [uploadPhotoMutation, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION);
  const { register, setValue, watch, handleSubmit } = useForm();
  const onValid = async ({ caption }) => {
    const file = new ReactNativeFile({
      uri,
      name: 'file.jpg',
      type: 'image/jpeg',
    });
    await uploadPhotoMutation({ variables: { file, caption } });
  };
  useEffect(() => {
    register('caption', { required: true });
  }, [register]);
  const headerRightLoading = () => (
    <ActivityIndicator color="white" style={{ marginRight: 24 }} />
  );
  const headerRight = () => (
    <HeaderRight text="Upload" onPress={handleSubmit(onValid)} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? headerRightLoading : headerRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  return (
    <DismissKeyboard>
      <Container
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <Photo source={{ uri }} />
        <CaptionContainer>
          <Caption
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0,0,0,0.5)"
            autoCorrect={false}
            value={watch('caption')}
            onChangeText={(value) => setValue('caption', value)}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}

export default Upload;
