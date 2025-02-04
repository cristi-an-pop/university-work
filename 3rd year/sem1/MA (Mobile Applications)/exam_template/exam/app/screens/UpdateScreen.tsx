import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../models/RootStackParamList';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../../styles/style';
import { useItemStore } from '../stores/Store';

type Props = StackScreenProps<RootStackParamList, 'Update'>;

const UpdateScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const { updateItem } = useItemStore();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [date, setDate] = useState(new Date(item.date));

  const handleUpdate = () => {
    if (!title || !description || !date) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const updatedItem = {
      ...item,
      title,
      description,
      date: date.toISOString(),
    };
    updateItem(updatedItem);
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
      <TouchableOpacity style={commonStyles.button} onPress={handleUpdate}>
        <Text style={commonStyles.buttonText}>Update Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateScreen;
