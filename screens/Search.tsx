import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import ScreenLayout from '../components/ScreenLayout';
import { RouteProps } from '../types';

const Input = styled.TextInput`
  background-color: white;
  ::placeholder {
    color: black;
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

export default function Search({ navigation }: RouteProps) {
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  console.log(data);
  const SearchBox = () => (
    <Input
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(value) => setValue('keyword', value)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox });
    register('keyword', { required: true, minLength: 3 });
  }, []);
  const renderPhoto = ({ item: photo }) => (
    <View>
      <Text style={{ color: 'white' }}>{photo.id}</Text>
    </View>
  );
  return (
    <DismissKeyboard>
      <ScreenLayout>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : (
          <FlatList
            style={{
              width: '100%',
            }}
            onEndReachedThreshold={0.2}
            refreshing={false}
            showsVerticalScrollIndicator={false}
            data={data?.searchPhotos}
            keyExtractor={(photo) => '' + photo.id}
            renderItem={renderPhoto}
          />
        )}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined &&
        data?.searchPhotos?.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not find anything.</MessageText>
          </MessageContainer>
        ) : null}
      </ScreenLayout>
    </DismissKeyboard>
  );
}
