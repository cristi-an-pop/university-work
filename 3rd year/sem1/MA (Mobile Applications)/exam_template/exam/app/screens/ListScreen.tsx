import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { commonStyles } from '../../styles/style';
import { useItemStore } from '../stores/Store';
import ModelItem from '../components/ModelItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { items, fetchItems, deleteItem, loading, isOffline, setOffline, retryConnection } = useItemStore();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Memory",
      "Are you sure you want to delete this memory?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: async () => {
          await deleteItem(id);
        }}
      ]
    );
  };

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
        { loading ? (
            <ActivityIndicator size="large" color="white" />
        ) : (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <ModelItem
                model={item}
                onPress={() => navigation.navigate('Details', { item })}
                onEdit={() => navigation.navigate('Update', { item })}
                onDelete={() => handleDelete(item.id)}
            />
            )}
        />
        )}
        {showDialog && (
            <View style={commonStyles.dialog}>
                <Text style={commonStyles.dialogText}>You are offline. Please check your internet connection and try again.</Text>
                <TouchableOpacity style={commonStyles.dialogButton} onPress={handleRetry}>
                    <Text style={commonStyles.dialogButtonText}>Retry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.retryButton} onPress={handleRetry}>
                  <Icon name="refresh" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )}
      <TouchableOpacity disabled={isOffline} style={commonStyles.button} onPress={() => navigation.navigate('Create')}>
        <Text style={commonStyles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListScreen;