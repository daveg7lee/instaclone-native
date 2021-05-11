import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../colors';
import { RouteProps } from '../types';
import routes from '../routes';
import HeaderRight from '../components/HeaderRight';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  flex: 0.7;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

function SelectPhoto({ navigation }: RouteProps) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<any>([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const getPhotos = async () => {
    if (ok && Platform.OS !== 'web') {
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
  const choosePhoto = async (uri) => {
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
  const goToUpload = () => {
    if (!chosenPhoto) {
      Alert.alert('Please Choose Photo');
    } else {
      navigation.navigate(routes.upload, { file: chosenPhoto });
    }
  };
  useEffect(() => {
    getPermissions();
    getPhotos();
  }, [ok]);
  const headerRight = () => <HeaderRight text="Next" onPress={goToUpload} />;
  useEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [chosenPhoto]);
  return (
    <Container>
      <StatusBar hidden />
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
