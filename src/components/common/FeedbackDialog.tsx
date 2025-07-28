import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FeedbackDialog = ({ visible, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>We'd love your feedback!</Text>
          <View style={styles.buttonContainer}>
            <Button title="👍 Green" onPress={onClose} color="green" />
            <Button title="👎 Red" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: 300,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default FeedbackDialog;
