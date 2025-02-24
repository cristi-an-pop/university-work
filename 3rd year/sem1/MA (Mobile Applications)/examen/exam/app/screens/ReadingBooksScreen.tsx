import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { commonStyles } from '../../styles/style';
import { useBookStore } from '../stores/Store';
import { StyleSheet } from 'react-native';
import Repository from '../repository/Repository';
import { Book } from '../models/Book';

const ReadingBooksScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

    useFocusEffect(
        React.useCallback(() => {
          const fetchBooks = async () => {
            setLoading(true);
            const books2 = await Repository.getBooks2();
            setBooks(books2);
            setLoading(false);
          };
    
          fetchBooks();
        }, [])
      );

  const readingBooks = books.filter(book => book.status === 'reading');

  return (
    <View style={commonStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={readingBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={commonStyles.listItemContainer}>
              <View style={styles.itemContent}>
                <Text style={commonStyles.title}>{item.title}</Text>
                <Text style={commonStyles.text}>{item.author}</Text>
                <Text style={commonStyles.text}>Status: {item.status}</Text>
                <Text style={commonStyles.text}>Reviews: {item.reviewCount}</Text>
              </View>
            </View>
          )}
        />
      )}
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

export default ReadingBooksScreen;