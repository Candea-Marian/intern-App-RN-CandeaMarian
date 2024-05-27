import React, { useState } from 'react';
import {
  Modal,
  TextInput,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AddCardModalProps {
  isVisible: boolean;
  onAdd: (title: string, description: string | null) => void;
  onCancel: () => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isVisible, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);

  const handleAdd = () => {
    if (title.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    onAdd(title, description);
    setTitle('');
    setDescription(null);
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description ?? ''}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />
          <View style={styles.modalButtons}>
            <Button color={useThemeColor('backgroundHeader')} title="Add" onPress={handleAdd} />
            <Button color={useThemeColor('backgroundHeader')} title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default AddCardModal;
