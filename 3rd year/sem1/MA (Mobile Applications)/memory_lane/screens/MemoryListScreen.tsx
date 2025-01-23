import React, { useEffect } from 'react';
import { FlatList, View, Button, Alert, TouchableOpacity, Text } from 'react-native';
import MemoryItem from '../components/MemoryItem';
import { useMemoryStore } from '../stores/MemoryStore';
import { NavigationProp } from '@react-navigation/native';
import { commonStyles } from '../styles';

const MemoryListScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { memories, fetchMemories, deleteMemory } = useMemoryStore();

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Memory",
      "Are you sure you want to delete this memory?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: async () => {
          await deleteMemory(id);
        }}
      ]
    );
  };

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={memories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MemoryItem
            memory={item}
            onPress={() => navigation.navigate('MemoryDetails', { memory: item })}
            onEdit={() => navigation.navigate('UpdateMemory', { memory: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('CreateMemory')}>
        <Text style={commonStyles.buttonText}>Add Memory</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemoryListScreen;