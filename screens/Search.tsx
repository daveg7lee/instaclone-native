import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import ScreenLayout from '../components/ScreenLayout';
import { RouteProps } from '../types';

const Input = styled.TextInput`
  background-color: white;
  ::placeholder {
    color: black;
  }
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
  const { setValue, register } = useForm();
  const [startQueryFn, { loading, data }] = useLazyQuery(SEARCH_PHOTOS);
  const SearchBox = () => (
    <TextInput
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(value) => setValue('keyword', value)}
    />
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox });
    register('keyword');
  }, []);

  return (
    <ScreenLayout>
      <Text>Search</Text>
    </ScreenLayout>
  );
}
