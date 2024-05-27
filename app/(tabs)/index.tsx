import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
import AddCardModal from '@/components/AddCardModal';
import CardList from '@/components/CardList';
import CameraButton from '@/components/CameraButton';

interface CardData {
  id: number;
  title: string;
  description: string | null;
}

export default function HomeScreen() {
  const initialData: CardData[] = [
    { id: 1, title: 'Card 1', description: 'This is the description for card 1' },
    { id: 2, title: 'Card 2', description: 'This is the description for card 2' },
    { id: 3, title: 'Card 3', description: 'This is the description for card 3' },
  ];

  const [data, setData] = useState<CardData[]>(initialData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleAddNewCard = (title: string, description: string | null) => {
    const newCard: CardData = {
      id: Date.now(),
      title,
      description,
    };
    setData(prevData => [...prevData, newCard]);
    setModalVisible(false);
  };

  const handleImagePicked = (uri: string) => {
    setSelectedImage(uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/assets/images/logo.webp')}
            style={styles.logo}
            resizeMode="contain"
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <CardList data={data} onDelete={handleDelete} />
        </ThemedView>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.capturedImage} />
        )}
      </ParallaxScrollView>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: useThemeColor('backgroundHeader') }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <CameraButton onImagePicked={handleImagePicked} />

      <AddCardModal
        isVisible={isModalVisible}
        onAdd={handleAddNewCard}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: '65%',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  capturedImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
  },
});
