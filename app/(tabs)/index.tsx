import React, { useState } from 'react';
import { Image, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

export default function HomeScreen() {
  
  const initialData = [
    { id: 1, title: 'Card 1', description: 'This is the description for card 1' },
    { id: 2, title: 'Card 2', description: 'This is the description for card 2' },
    { id: 3, title: 'Card 3', description: 'This is the description for card 3' },
    // Add more cards as needed
  ];

  const [data, setData] = useState(initialData);

  const handleDelete = (id:number) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
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
          {data.map((item) => (
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
    height: '70%',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
});
