import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  onClose: () => void;
  onOpenAppleMaps: () => void;
  onOpenGoogleMaps: () => void;
};

const MapOptionsContent: React.FC<Props> = ({ onClose, onOpenAppleMaps, onOpenGoogleMaps }) => {
  return (
    <View style={styles.sheetContainer}>

      <View style={styles.externalBox}>
      <View style={styles.innerBox}>
        <Text style={styles.address}>
          115 N. Canton Street, Washington DC
        </Text>
        <Text style={styles.question}>How are you directing there?</Text>

        <View style={styles.divider} />
        <TouchableOpacity style={styles.optionButton} onPress={onOpenAppleMaps}>
          <Text style={styles.optionText}>Apple Maps</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.optionButton} onPress={onOpenGoogleMaps}>
          <Text style={styles.optionText}>Google Maps</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.optionButton} onPress={onClose}>
          <Text style={styles.optionText}>Bhogi Maps</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
      </View>
      </View>


      <View style={styles.externalBox}>
      <View style={styles.innerBox}>
        <TouchableOpacity style={styles.optionButton} onPress={onClose}>
          <Text style={[styles.optionText, styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 16,
    paddingBottom: 8,
  },

  externalBox:{
    backgroundColor: '#FFFFFD',
    opacity: 0.99,
    borderRadius: 18,
    // paddingVertical: 8,
    marginBottom: 8,
  },
  innerBox: {
    backgroundColor: '#999999E6',
    borderRadius: 18,
    opacity: 0.75,
    paddingVertical: 8,
    // marginBottom: 8,
  },
  address: {
    color: '#3D3D3D',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  question: {
    color: '#3D3D3D',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 12,
  },
  optionButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  optionText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '500',
  },
  cancelText: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#8080808C',
  },
  spacer: {
    height: 6,
  },
});

export default MapOptionsContent;
