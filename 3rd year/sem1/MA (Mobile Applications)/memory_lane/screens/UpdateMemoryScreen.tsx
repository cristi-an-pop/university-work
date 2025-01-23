import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../models/RootStackParamList';
import { useMemoryStore } from '../stores/MemoryStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles';

type Props = StackScreenProps<RootStackParamList, 'UpdateMemory'>;

const UpdateMemoryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { memory } = route.params;
  const { updateMemory } = useMemoryStore();
  const [title, setTitle] = useState(memory.title);
  const [description, setDescription] = useState(memory.description);
  const [date, setDate] = useState(new Date(memory.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(memory.location);
  const [mood, setMood] = useState(memory.mood);
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState<string[]>(memory.tags.split(', '));
  const moodOptions = ['Happy', 'Indifferent', 'Sad'];

  const handleUpdate = () => {
    if (!title || !description || !mood) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const updatedMemory = {
      ...memory,
      title,
      description,
      date: date.toISOString(),
      location,
      mood,
      tags: tagList.join(', '),
    };
    updateMemory(updatedMemory);
    navigation.goBack();
  };

  const handleAddTag = () => {
    if (tags) {
      setTagList([...tagList, tags]);
      setTags('');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.label}>Title</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={commonStyles.label}>Description</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={commonStyles.label}>Date</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        style={commonStyles.dateTimePicker}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate);
          }
        }}
      />
      <Text style={commonStyles.label}>Location</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Text style={commonStyles.label}>Mood</Text>
      <View style={commonStyles.radioGroup}>
        {moodOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[commonStyles.radioButton, mood === option && commonStyles.radioButtonSelected]}
            onPress={() => setMood(option)}
          >
            <Text style={commonStyles.radioButtonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={commonStyles.label}>Tags</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Tags"
        value={tags}
        onChangeText={setTags}
        onSubmitEditing={handleAddTag}
      />
      <View style={commonStyles.tagContainer}>
        {tagList.map((tag, index) => (
          <View key={index} style={commonStyles.tag}>
            <TouchableOpacity onPress={() => setTagList(tagList.filter((_, i) => i !== index))}>
              <Text style={commonStyles.tagText}>{tag}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={commonStyles.button} onPress={handleUpdate}>
        <Text style={commonStyles.buttonText}>Update Memory</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateMemoryScreen;