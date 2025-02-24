import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { commonStyles } from '../../styles/style';
import { useBookStore } from '../stores/Store';
import BookItem from '../components/BookItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import OfflineDialog from '../components/OfflineDialog';

const ListScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { books, fetchBooks, loading, isOffline, retryConnection } = useBookStore();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (isOffline) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [isOffline]);

  const handleRetry = () => {
    retryConnection();
  };

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('CreateScreen')}>
        <Text style={commonStyles.buttonText}>Add Book</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(book) => book.id.toString()}
          renderItem={({ item }) => (
            <BookItem
              book={item}
              onPress={() => navigation.navigate('DetailsScreen', { book: item })}
              onEdit={() => navigation.navigate('UpdateScreen', { book: item })}
            />
          )}
        />
      )}
      {isOffline && (
        <TouchableOpacity style={commonStyles.retryButton} onPress={handleRetry}>
          <Text style={commonStyles.buttonText}>Retry</Text>
          <Icon name="refresh" size={24} color="white" />
        </TouchableOpacity>
      )}
      <OfflineDialog
        visible={showDialog}
        onRetry={handleRetry}
        onCancel={() => setShowDialog(false)}
      />
    </View>
  );
};

export default ListScreen;