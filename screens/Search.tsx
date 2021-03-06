import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Image, useWindowDimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import routes from '../routes';
import { RouteProps } from '../types';

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 6px 10px;
  border-radius: 7px;
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
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
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
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.photo, { id: photo.id })}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
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
        ) : (
          <FlatList
            numColumns={numColumns}
            data={data?.searchPhotos}
            keyExtractor={(photo) => '' + photo.id}
            renderItem={renderItem}
          />
        )}
      </Container>
    </DismissKeyboard>
  );
}
