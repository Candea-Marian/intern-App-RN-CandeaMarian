import { Image, StyleSheet, useColorScheme, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const data = [
    { title: 'Card 1', description: 'This is the description for card 1' },
    { title: 'Card 2', description: 'This is the description for card 2' },
    { title: 'Card 3', description: 'This is the description for card 3' },
    // Add more cards as needed
  ];
  
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
          {data.map((item, index) => (
            <Collapsible key={index} title={item.title}>
              <ThemedText>{item.description}</ThemedText>
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
