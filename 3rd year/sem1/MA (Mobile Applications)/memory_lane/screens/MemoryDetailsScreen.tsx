import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMemoryStore } from '../stores/MemoryStore';
import { commonStyles, colors } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../models/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'MemoryDetails'>;

const MemoryDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { memory } = route.params;
  const { deleteMemory } = useMemoryStore();

  const handleDelete = () => {
    Alert.alert(
      'Delete Memory',
      'Are you sure you want to delete this memory?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteMemory(memory.id);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.screenTitle}>{memory.title}</Text>
      <Text style={commonStyles.label}>Description</Text>
      <Text style={commonStyles.textLight}>{memory.description}</Text>
      <Text style={commonStyles.label}>Date</Text>
      <Text style={commonStyles.textLight}>{new Date(memory.date).toDateString()}</Text>
      <Text style={commonStyles.label}>Location</Text>
      <Text style={commonStyles.textLight}>{memory.location}</Text>
      <Text style={commonStyles.label}>Mood</Text>
      <Text style={commonStyles.textLight}>{memory.mood}</Text>
      <Text style={commonStyles.label}>Tags</Text>
      <View style={commonStyles.tagContainer}>
        {memory.tags.split(', ').map((tag, index) => (
          <View key={index} style={commonStyles.tag}>
            <Text style={commonStyles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={commonStyles.radioGroup}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Icon name="trash" size={20} color={colors.lighttext} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    color: colors.lighttext,
    marginLeft: 5,
  },
});

export default MemoryDetailsScreen;