import Ionicons from '@expo/vector-icons/Ionicons';
import React, { Fragment, PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
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

  //if children is null or undefined, it will become the value of the response from thre chuck norris api
  useEffect(() => {
    if (!children) {
      fetch(currentEnvironment.chuck.baseUrl)
        .then(response => response.json())
        .then(data => setEditableDescription(data.value));
    }
  }, [children]);

  useEffect(() => {
    if (children && typeof children === 'string') {
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
            color={useThemeColor('icon')}
          />
          {isEditing ? (
            <TextInput
              style={[styles.editableTitle, { color: textColor }]}
              value={editableTitle}
              onChangeText={setEditableTitle}
            />
          ) : (
            <ThemedText style={styles.titleText}>{editableTitle}</ThemedText>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditToggle}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isEditing ? 'checkmark' : 'create'}
              size={20}
              color={useThemeColor('icon')}
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
              color={useThemeColor('icon')}
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
              <ThemedText style={styles.descriptionText}>{editableDescription}</ThemedText>
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
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 0,
    margin: 0,
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
    right: 30, 
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
  },
  titleText: {
    fontSize: 20, 
    fontWeight: 'bold', 
  },
  descriptionText: {
    fontSize: 17, 
  },
});
