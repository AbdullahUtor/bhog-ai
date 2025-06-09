import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface RatingBarProps {
  rating: number; // any number, will be rounded up
  filledStar: ImageSourcePropType;
  emptyStar: ImageSourcePropType;
  starSize?: number;
  maxStars?: number;
}

const RatingBar: React.FC<RatingBarProps> = ({
                                               rating,
                                               filledStar,
                                               emptyStar,
                                               starSize = 24,
                                               maxStars = 5,
                                             }) => {
  const roundedRating = Math.ceil(rating);

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <Image
          key={index}
          source={index < roundedRating ? filledStar : emptyStar}
          style={[styles.star, { width: starSize, height: starSize }]}
          resizeMode="contain"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 4,
  },
});

export default RatingBar;
