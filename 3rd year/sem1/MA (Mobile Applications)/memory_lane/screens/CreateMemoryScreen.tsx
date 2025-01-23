import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useMemoryStore } from '../stores/MemoryStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles';

const CreateMemoryScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { addMemory } = useMemoryStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const handleCreate = () => {
    if (!title || !description || !mood) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const newMemory = {
      title,
      description,
      date: date.toISOString(),
      location,
      mood,
      tags: tagList.join(', '),
    };
    addMemory(newMemory);
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
        <TouchableOpacity
          style={[commonStyles.radioButton, mood === 'Happy' && commonStyles.radioButtonSelected]}
          onPress={() => setMood('Happy')}
        >
          <Text style={commonStyles.radioButtonText}>Happy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[commonStyles.radioButton, mood === 'Indifferent' && commonStyles.radioButtonSelected]}
          onPress={() => setMood('Indifferent')}
        >
          <Text style={commonStyles.radioButtonText}>Indifferent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[commonStyles.radioButton, mood === 'Sad' && commonStyles.radioButtonSelected]}
          onPress={() => setMood('Sad')}
        >
          <Text style={commonStyles.radioButtonText}>Sad</Text>
        </TouchableOpacity>
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
      <TouchableOpacity style={commonStyles.button} onPress={handleCreate}>
        <Text style={commonStyles.buttonText}>Add Memory</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateMemoryScreen;