import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { commonStyles } from '../../styles/style';
import { useBookStore } from '../stores/Store';

const CreateScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { addBook } = useBookStore();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [avgRating, setAvgRating] = useState('');

  const handleCreate = () => {
    if (!title || !author || !genre || !status || !reviewCount || !avgRating) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const newBook = {
      title,
      author,
      genre,
      status,
      reviewCount: parseInt(reviewCount),
      avgRating: parseFloat(avgRating),
    };
    addBook(newBook);
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
      <Text style={commonStyles.label}>Author</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <Text style={commonStyles.label}>Genre</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <Text style={commonStyles.label}>Status</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Text style={commonStyles.label}>Review Count</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Review Count"
        value={reviewCount}
        onChangeText={setReviewCount}
        keyboardType="numeric"
      />
      <Text style={commonStyles.label}>Average Rating</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Average Rating"
        value={avgRating}
        onChangeText={setAvgRating}
        keyboardType="numeric"
      />
      <TouchableOpacity style={commonStyles.button} onPress={handleCreate}>
        <Text style={commonStyles.buttonText}>Add Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateScreen;