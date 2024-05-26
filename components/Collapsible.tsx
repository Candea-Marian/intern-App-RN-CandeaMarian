import Ionicons from '@expo/vector-icons/Ionicons';
import React, {Fragment, PropsWithChildren, useState} from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from 'react-native-elements';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardBackgroundColor = useThemeColor('background');

  return (
    <Fragment>
      <Card containerStyle={[styles.card, {backgroundColor: cardBackgroundColor}]}>
        
        <TouchableOpacity
            style={styles.heading}
            onPress={() => setIsOpen((value) => !value)}
            activeOpacity={0.8}>
            <Ionicons
              name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
              size={20}
              color={useThemeColor('icon')}
            />
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
          </TouchableOpacity>
        
        <Card.Divider />

        {isOpen && <Card.FeaturedSubtitle><ThemedView style={styles.content}>{children}</ThemedView> </Card.FeaturedSubtitle>}
        
      </Card>

    </Fragment>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  card: {
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
});
