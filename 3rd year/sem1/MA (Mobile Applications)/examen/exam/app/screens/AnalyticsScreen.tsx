import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { commonStyles } from '../../styles/style';
import { useBookStore } from '../stores/Store';
import { StyleSheet } from 'react-native';

const AnalyticsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { topRatedBooks, computeTopRatedBooks, books, loading } = useBookStore();

  useEffect(() => {
    computeTopRatedBooks();
  }, [books]);

  return (
    <View style={commonStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={topRatedBooks}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={commonStyles.listItemContainer}>
              <View style={styles.itemContent}>
                <Text style={commonStyles.title}>{item.title}</Text>
                <Text style={commonStyles.text}>{item.author}</Text>
                <Text style={commonStyles.text}>Rating: {item.avgRating.toFixed(2)}</Text>
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

export default AnalyticsScreen;