import Ionicons from '@expo/vector-icons/Ionicons';
import React, { Fragment, PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from 'react-native-elements';
import { useThemeColor } from '@/hooks/useThemeColor';
import currentEnvironment from '@/constants/environment';

interface CollapsibleProps extends PropsWithChildren<{ title: string }> {
  onDelete: () => void;
}

export function Collapsible({
  children,
  title,
  onDelete,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState('');
  const cardBackgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const iconColor = useThemeColor('icon');

  useEffect(() => {
    if (!children) {
      fetch(currentEnvironment.chuck.baseUrl)
        .then(response => response.json())
        .then(data => setEditableDescription(data.value));
    } else if (typeof children === 'string') {
      setEditableDescription(children);
    } else {
      const childArray = React.Children.toArray(children);
      setEditableDescription(
        childArray
          .map(child => (typeof child === 'string' ? child : ''))
          .join(''),
      );
    }
  }, [children]);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  const handleEmojify = () => {
    const textToEmojify = editableDescription;
    const clientId = 'fa67b88b7f34e42df9e632423ba0cc665c8f993c054a'; // be careful with this, I only have 100 credits

    console.log('Text to emojify:', textToEmojify);

    fetch(`${currentEnvironment.emoji.baseUrl}?text=${encodeURIComponent(textToEmojify)}&client_id=${clientId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Emojified text:', data);
        setEditableDescription(data.text); // Update here
      })
      .catch(error => {
        console.error('Error fetching emojified text:', error);
        setEditableDescription('Error fetching emojified text');
      });
  };

  return (
    <Fragment>
      <Card
        containerStyle={[styles.card, { backgroundColor: cardBackgroundColor }]}
      >
        <TouchableOpacity
          style={styles.heading}
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
            size={20}
            color={iconColor}
          />
          {isEditing ? (
            <TextInput
              style={[styles.editableTitle, { color: textColor }]}
              value={editableTitle}
              onChangeText={setEditableTitle}
            />
          ) : (
            <ThemedText style={[styles.titleText, { color: textColor }]}>{editableTitle}</ThemedText>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditToggle}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isEditing ? 'checkmark' : 'create'}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
            activeOpacity={0.8}
          >
            <Ionicons
              name="trash"
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emojifyButton}
            onPress={handleEmojify}
            activeOpacity={0.8}
          >
            <Ionicons
              name="happy-outline"
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <Card.Divider />

        {isOpen && (
          <ThemedView style={styles.content}>
            {isEditing ? (
              <TextInput
                style={[styles.editableDescription, { color: textColor }]}
                value={editableDescription}
                onChangeText={setEditableDescription}
                multiline
              />
            ) : (
              <ThemedText style={[styles.descriptionText, { color: textColor }]}>{editableDescription}</ThemedText>
            )}
          </ThemedView>
        )}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 0,
    margin: 10,
  },
  editableTitle: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 20,
  },
  editableDescription: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 17,
  },
  editButton: {
    position: 'absolute',
    right: 90,
  },
  deleteButton: {
    position: 'absolute',
    right: 60,
  },
  emojifyButton: {
    position: 'absolute',
    right: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 17,
  },
});
