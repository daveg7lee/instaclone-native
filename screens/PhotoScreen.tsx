import { gql, useQuery } from '@apollo/client';
import React from 'react';
import ScreenLayout from '../components/ScreenLayout';
import { PHOTO_FRAGMENT } from '../fragments';
import Photo from '../components/Photo';
import { RefreshControl, ScrollView } from 'react-native';

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function PhotoScreen({
  route: {
    params: { id },
  },
}) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, { variables: { id } });
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
