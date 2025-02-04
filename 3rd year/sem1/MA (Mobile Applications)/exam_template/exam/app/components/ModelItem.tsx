import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Item } from '../models/Item';
import { commonStyles } from '../../styles/style';
import { useItemStore } from '../stores/Store';

interface ItemProps {
  model: Item;
  onPress: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ModelItem: React.FC<ItemProps> = ({ model, onPress, onDelete, onEdit }) => {
  const { isOffline } = useItemStore();
  return (
    <View style={commonStyles.listItemContainer}>
      <TouchableOpacity style={styles.itemContent} onPress={onPress}>
        <Text style={commonStyles.title}>{model.title}</Text>
        <Text style={commonStyles.text}>{model.description}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity disabled={isOffline} style={commonStyles.floatingButton} onPress={onEdit}>
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity disabled={isOffline} style={commonStyles.floatingButton} onPress={onDelete}>
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

export default ModelItem;
