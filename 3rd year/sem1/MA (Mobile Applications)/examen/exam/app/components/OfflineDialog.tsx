import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OfflineDialogProps {
  visible: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

const OfflineDialog: React.FC<OfflineDialogProps> = ({ visible, onRetry, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You are offline. Please check your internet connection and try again.</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onRetry}>
            <Text style={styles.modalButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default OfflineDialog;