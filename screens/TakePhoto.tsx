import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const PermissionsContainer = styled.TouchableOpacity`
  margin: auto;
`;

const PermissionsText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 15;
  text-align: center;
`;

const Actions = styled.View`
  flex: 0.3;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;
`;

function TakePhoto() {
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, [ok]);
  return (
    <Container>
      {!ok ? (
        <PermissionsContainer onPress={getPermissions}>
          <PermissionsText>
            Permission denied. Please Click to allow Permissions
          </PermissionsText>
        </PermissionsContainer>
      ) : (
        <>
          <Camera type={cameraType} style={{ flex: 1 }} />
          <Actions>
            <TakePhotoBtn></TakePhotoBtn>
            <TouchableOpacity></TouchableOpacity>
          </Actions>
        </>
      )}
    </Container>
  );
}

export default TakePhoto;
