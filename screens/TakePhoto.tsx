import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
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
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;
`;

const SliderContainer = styled.View``;

function TakePhoto() {
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, [ok]);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomValueChange = (e) => {
    setZoom(e);
  };
  console.log(zoom);
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
          <Camera type={cameraType} style={{ flex: 1 }} zoom={zoom} />
          <Actions>
            <SliderContainer>
              <Slider
                style={{ width: 200, height: 20 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                onValueChange={onZoomValueChange}
              />
            </SliderContainer>
            <ButtonsContainer>
              <TakePhotoBtn />
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? 'camera-reverse'
                      : 'camera'
                  }
                />
              </TouchableOpacity>
            </ButtonsContainer>
          </Actions>
        </>
      )}
    </Container>
  );
}

export default TakePhoto;
