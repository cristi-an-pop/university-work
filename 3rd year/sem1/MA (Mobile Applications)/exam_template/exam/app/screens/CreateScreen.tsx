import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../../styles/style';
import { useItemStore } from '../stores/Store';

const CreateScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { addItem } = useItemStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const handleCreate = () => {
    if (!title || !description || !date) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const newItem = {
      title,
      description,
      date: date.toISOString(),
    };
    addItem(newItem);
    navigation.goBack();
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
      <TouchableOpacity style={commonStyles.button} onPress={handleCreate}>
        <Text style={commonStyles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateScreen;