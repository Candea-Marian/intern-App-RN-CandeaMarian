import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CameraButtonProps {
  onImagePicked: (uri: string) => void;
}

const CameraButton: React.FC<CameraButtonProps> = ({ onImagePicked }) => {
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.cameraButton, { backgroundColor: useThemeColor('backgroundHeader') }]}
      onPress={openCamera}
    >
      <Ionicons name="camera" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default CameraButton;
