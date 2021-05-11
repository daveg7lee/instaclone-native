import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { colors } from '../colors';
import DismissKeyboard from '../components/DismissKeyboard';
import HeaderRight from '../components/HeaderRight';

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
    params: { file },
  },
  navigation,
}) {
  const { register, setValue, watch, handleSubmit } = useForm();
  const onValid = ({ caption }) => {
    console.log(caption);
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
      headerRight: headerRight,
    });
  }, [navigation]);
  return (
    <DismissKeyboard>
      <Container
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <Photo source={{ uri: file }} />
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
