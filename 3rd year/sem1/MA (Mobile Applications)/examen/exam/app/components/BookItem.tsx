import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Book } from '../models/Book';
import { commonStyles } from '../../styles/style';

interface ItemProps {
  book: Book;
  onPress: () => void;
  onEdit: () => void;
}

const MemoryItem: React.FC<ItemProps> = ({ book, onPress, onEdit }) => {
  return (
    <View style={commonStyles.listItemContainer}>
      <TouchableOpacity style={styles.itemContent} onPress={onPress}>
        <Text style={commonStyles.title}>{book.title}</Text>
        <Text style={commonStyles.text}>{book.author}</Text>
        <Text style={commonStyles.text}>{book.genre}</Text>
        <Text style={commonStyles.text}>Id: {book.id}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={commonStyles.floatingButton} onPress={onEdit}>
          <Icon name="edit" size={20} color="#fff" />
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