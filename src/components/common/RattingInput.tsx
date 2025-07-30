import React, { useState } from 'react';
import { TouchableOpacity, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface RatingInputProps {
  onRatingChange?: (rating: number) => void;
  filledStar: ImageSourcePropType;
  emptyStar: ImageSourcePropType;
  starSize?: number;
  maxStars?: number;
}

const RatingInput: React.FC<RatingInputProps> = ({
                                                   onRatingChange,
                                                   filledStar,
                                                   emptyStar,
                                                   starSize = 32.41,
                                                   maxStars = 5,
                                                 }) => {
  const [rating, setRating] = useState(0);

  const handlePress = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    onRatingChange?.(newRating);
  };

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(index)}>
          <Image
            source={index < rating ? filledStar : emptyStar}
            style={[styles.star, { width: starSize, height: starSize }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  star: {
    marginHorizontal: 4,
  },
});

export default RatingInput;
