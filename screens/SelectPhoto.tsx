import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Image, useWindowDimensions } from 'react-native';
import { colors } from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

function SelectPhoto() {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<any>([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      setPhotos(photos);
    }
  };
  const getPermissions = async () => {
    const {
      accessPrivileges,
      canAskAgain,
    } = await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none') {
        setOk(true);
      }
    } else if (accessPrivileges !== 'none') {
      setOk(true);
    }
  };
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={chosenPhoto === photo.uri ? colors.blue : 'white'}
        />
      </IconContainer>
    </ImageContainer>
  );
  useEffect(() => {
    getPermissions();
    getPhotos();
  }, [ok]);
  return (
    <Container>
      <Top>
        {chosenPhoto !== '' ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: '100%' }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          numColumns={numColumns}
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Bottom>
    </Container>
  );
}

export default SelectPhoto;