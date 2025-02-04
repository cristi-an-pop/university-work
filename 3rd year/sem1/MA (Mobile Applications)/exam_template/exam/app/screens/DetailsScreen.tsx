import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../models/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import { useItemStore } from '../stores/Store';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const { deleteItem } = useItemStore();

  const handleDelete = () => {
    Alert.alert(
      'Delete Memory',
      'Are you sure you want to delete this memory?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteItem(item.id);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.screenTitle}>{item.title}</Text>
      <Text style={commonStyles.label}>Description</Text>
      <Text style={commonStyles.textLight}>{item.description}</Text>
      <Text style={commonStyles.label}>Date</Text>
      <Text style={commonStyles.textLight}>{new Date(item.date).toDateString()}</Text>
      <View style={commonStyles.radioGroup}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Icon name="trash" size={20} color={colors.lighttext} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    color: colors.lighttext,
    marginLeft: 5,
  },
});

export default DetailsScreen;