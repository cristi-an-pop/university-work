import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../models/RootStackParamList';
import { commonStyles } from '../../styles/style';
import { useBookStore } from '../stores/Store';

type Props = StackScreenProps<RootStackParamList, 'UpdateScreen'>;

const UpdateScreen: React.FC<Props> = ({ route, navigation }) => {
  const { book } = route.params;
  const { updateBook } = useBookStore();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [status, setStatus] = useState(book.status);
  const [reviewCount, setReviewCount] = useState(book.reviewCount.toString());
  const [avgRating, setAvgRating] = useState(book.avgRating.toString());

  const handleUpdate = () => {
    if (!title || !author || !genre || !status || !reviewCount || !avgRating) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const updatedBook = {
      ...book,
      title,
      author,
      genre,
      status,
      reviewCount: parseInt(reviewCount, 10),
      avgRating: parseFloat(avgRating),
    };
    updateBook(updatedBook);
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
      <TouchableOpacity style={commonStyles.button} onPress={handleUpdate}>
        <Text style={commonStyles.buttonText}>Update Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateScreen;