import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Memory from '../models/Memory';
import { commonStyles } from '../styles';

interface MemoryItemProps {
  memory: Memory;
  onPress: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const MemoryItem: React.FC<MemoryItemProps> = ({ memory, onPress, onDelete, onEdit }) => {
  return (
    <View style={commonStyles.listItemContainer}>
      <TouchableOpacity style={styles.itemContent} onPress={onPress}>
        <Text style={commonStyles.title}>{memory.title}</Text>
        <Text style={commonStyles.text}>{memory.description}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={commonStyles.floatingButton} onPress={onEdit}>
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.floatingButton} onPress={onDelete}>
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContent: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  }
});

export default MemoryItem;