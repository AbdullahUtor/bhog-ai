import React, { useState } from 'react';
import {View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import SecondaryButton from './SecondaryButton.tsx';
import RatingInput from './RattingInput.tsx';
import AppIcons from '../../utils/Icons.ts';
// adjust path
const { width, height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FeedbackDialog = ({ visible, onClose }: Props) => {
  const [userRating, setUserRating] = useState(0);

  const handleSubmit = () => {
    console.log('User rating:', userRating);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>How was your meal?</Text>

          <Text style={styles.description}>
            You chose the Scallop Crudo with Nectarine Puree from Restaurante Italiana.
          </Text>

          <RatingInput
            filledStar={AppIcons.filledStarIcon}
            emptyStar={AppIcons.emptyStarIcon}
            onRatingChange={setUserRating}
          />

          <View style={{ height: 18 }} />
          <SecondaryButton
            title={'Submit'}
            onPress={handleSubmit}
            backgroundColor='#262020'
            borderColor='#262020'
            color='#FFFFFF'
            disabled={false}
          />

          <View style={{ height: 18 }} />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.subText}>I didn't eat this</Text>
          </TouchableOpacity>
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
    width: width-50,
    paddingVertical: 28,
    paddingHorizontal: 33,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontFamily: 'EB Garamond',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: '#090A0A',
  },
  description: {
    fontFamily: 'Gabarito',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#7A7A6A',
  },
  subText: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#090A0A',
    textDecorationLine: 'underline',
  },
});

export default FeedbackDialog;
