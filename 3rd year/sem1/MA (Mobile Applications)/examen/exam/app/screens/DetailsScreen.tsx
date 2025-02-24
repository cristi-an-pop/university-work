import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { commonStyles } from '../../styles/style';
import { RootStackParamList } from '../models/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import { useBookStore } from '../stores/Store';
import { Book } from '../models/Book';

type Props = StackScreenProps<RootStackParamList, 'DetailsScreen'>;

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { isOffline, booksGet } = useBookStore();
  const { book } = route.params;
  const id = book.id;

  const { fetchBook, loading } = useBookStore();
  const [_book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      const fetchedBook = await fetchBook(id);
      setBook(fetchedBook);
    };
    const exisitng = booksGet.find((b) => b.id === id);
    if(!exisitng)
      loadBook();
  }, [id]);

  if (loading || !book) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.screenTitle}>{book.title}</Text>
      <Text style={commonStyles.label}>Id</Text>
      <Text style={commonStyles.textLight}>{book.id}</Text>
      <Text style={commonStyles.label}>Author</Text>
      <Text style={commonStyles.textLight}>{book.author}</Text>
      <Text style={commonStyles.label}>Genre</Text>
      <Text style={commonStyles.textLight}>{book.genre}</Text>
      <Text style={commonStyles.label}>Status</Text>
      <Text style={commonStyles.textLight}>{book.status}</Text>
      <Text style={commonStyles.label}>Review Count</Text>
      <Text style={commonStyles.textLight}>{book.reviewCount}</Text>
      <Text style={commonStyles.label}>Average Rating</Text>
      <Text style={commonStyles.textLight}>{book.avgRating}</Text>
      <View style={commonStyles.radioGroup}>
      </View>
    </View>
  );
};

export default DetailsScreen;