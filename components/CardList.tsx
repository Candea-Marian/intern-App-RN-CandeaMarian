import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Collapsible } from '@/components/Collapsible';

interface CardData {
  id: number;
  title: string;
  description: string | null;
}

interface CardListProps {
  data: CardData[];
  onDelete: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ data, onDelete }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map(item => (
        <Collapsible
          key={item.id}
          title={item.title}
          onDelete={() => onDelete(item.id)}
        >
          {item.description}
        </Collapsible>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
  },
});

export default CardList;
