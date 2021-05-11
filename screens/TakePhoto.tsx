import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Image, StatusBar } from 'react-native';
import { RouteProps } from '../types';

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
  justify-content: space-around;
  align-items: center;
`;

const ActionBtn = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;
`;

const SliderContainer = styled.View``;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  left: 20px;
`;

function TakePhoto({ navigation }: RouteProps) {
  const camera: any = useRef();
  const [takenPhoto, setTakenPhoto] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
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
  const onFlashChange = () => {
    switch (flashMode) {
      case Camera.Constants.FlashMode.off:
        setFlashMode(Camera.Constants.FlashMode.on);
        break;
      case Camera.Constants.FlashMode.on:
        setFlashMode(Camera.Constants.FlashMode.auto);
        break;
      case Camera.Constants.FlashMode.auto:
        setFlashMode(Camera.Constants.FlashMode.off);
        break;
    }
  };
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exit: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => setTakenPhoto('');
  return (
    <Container>
      <StatusBar hidden />
      {!ok ? (
        <PermissionsContainer onPress={getPermissions}>
          <PermissionsText>
            Permission denied. Please Click to allow Permissions
          </PermissionsText>
        </PermissionsContainer>
      ) : (
        <>
          {takenPhoto === '' ? (
            <Camera
              type={cameraType}
              style={{ flex: 1 }}
              zoom={zoom}
              flashMode={flashMode}
              ref={camera}
              onCameraReady={onCameraReady}
            >
              <CloseBtn onPress={() => navigation.navigate('Tabs')}>
                <Ionicons name="close" color="white" size={30} />
              </CloseBtn>
            </Camera>
          ) : (
            <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
          )}
          {takenPhoto === '' ? (
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
                <ActionBtn onPress={onFlashChange}>
                  <Ionicons
                    size={30}
                    color="white"
                    name={
                      flashMode === Camera.Constants.FlashMode.off
                        ? 'flash-off'
                        : flashMode === Camera.Constants.FlashMode.on
                        ? 'flash'
                        : flashMode === Camera.Constants.FlashMode.auto
                        ? 'eye'
                        : ''
                    }
                  />
                </ActionBtn>
                <TakePhotoBtn onPress={takePhoto} />
                <ActionBtn onPress={onCameraSwitch}>
                  <Ionicons
                    size={30}
                    color="white"
                    name={
                      cameraType === Camera.Constants.Type.front
                        ? 'camera-reverse'
                        : 'camera'
                    }
                  />
                </ActionBtn>
              </ButtonsContainer>
            </Actions>
          ) : (
            <Actions>
              <PhotoAction onPress={onDismiss}>
                <PhotoActionText>Dismiss</PhotoActionText>
              </PhotoAction>
              <PhotoAction>
                <PhotoActionText>Upload</PhotoActionText>
              </PhotoAction>
              <PhotoAction>
                <PhotoActionText>Save & Upload</PhotoActionText>
              </PhotoAction>
            </Actions>
          )}
        </>
      )}
    </Container>
  );
}

export default TakePhoto;
