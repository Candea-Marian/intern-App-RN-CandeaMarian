import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CardData {
  id: number;
  title: string;
  description: string | null;
}

export default function HomeScreen() {

  const initialData: CardData[] = [
    {
      id: 1,
      title: 'Card 1',
      description: 'This is the description for card 1',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description for card 2',
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'This is the description for card 3',
    },
    // Add more cards as needed
  ];

  const [data, setData] = useState<CardData[]>(initialData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState<string | null>(
    null,
  );

  const handleDelete = (id: number) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleAddNewCard = () => {
    if (newCardTitle.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    const newCard: CardData = {
      id: Date.now(), // Use current timestamp as a unique ID
      title: newCardTitle,
      description: newCardDescription,
    };
    setData(prevData => [...prevData, newCard]);
    setModalVisible(false);
    setNewCardTitle('');
    setNewCardDescription(null);
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
          <ScrollView contentContainerStyle={styles.stepContainer}>
            {data.map(item => (
              <Collapsible
                key={item.id}
                title={item.title}
                onDelete={() => handleDelete(item.id)}
              >
                {item.description}
              </Collapsible>
            ))}
          </ScrollView>
        </ThemedView>

      </ParallaxScrollView>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: useThemeColor('backgroundHeader') }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Title"
              value={newCardTitle}
              onChangeText={setNewCardTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={newCardDescription ?? ''}
              onChangeText={setNewCardDescription}
              style={styles.input}
              multiline
            />
            <View style={[styles.modalButtons]}>
              <Button color={useThemeColor('background')} title="Add" onPress={handleAddNewCard} />
              <Button color={useThemeColor('background')} title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: 'gray',
  },
});
