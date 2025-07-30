import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
   StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ripple from 'react-native-material-ripple';

import AppIcons from '../../utils/Icons.ts';
import palette from '../../utils/colors.ts';
import RatingBar from './RattingBar.tsx';
import { FoodPost } from '../../services/RecommendationService.ts';
import { RootStackParamList } from '../../types/types.ts';

interface ItemContainerProps {
  foodPost: FoodPost;
}

type ItemContainerNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const screenWidth = Dimensions.get('window').width;

const ItemContainer: React.FC<ItemContainerProps> = ({ foodPost }) => {
  const navigation = useNavigation<ItemContainerNavigationProp>();

  // Helper function to format price
  const formatPrice = (price: number | null): string => {
    if (price === null) return '$';
    return `$${price.toFixed(2)}`;
  };

  // Helper function to get default rating display
  const getRatingDisplay = () => {
    if (foodPost.rating && foodPost.review_count) {
      return {
        rating: foodPost.rating,
        reviewCount: foodPost.review_count,
      };
    }
    // Default values when no rating data
    return {
      rating: 3.5,
      reviewCount: 0,
    };
  };

  const { rating, reviewCount } = getRatingDisplay();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.distanceAndPriceContainer}>
        <View style={styles.foodTitleIconAndLocation}>
          <View style={styles.foodIconContainer}>

            <Image
              style={styles.foodIcon}
              source={
                foodPost.icon_url
                  ? { uri: foodPost.icon_url }
                  : AppIcons.shrimp
              }
              onError={() => {

                console.log('Failed to load food icon, using default');
                console.log(foodPost.icon_url);
              }}
            />
          </View>
          <View style={styles.titleAndLocation}>
            <Text style={styles.title}>
              {foodPost.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={AppIcons.locationMarkerFilled}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  paddingRight: 2
                }}
              />
              <Text style={{
                fontFamily: 'Gabarito',
                textTransform: 'capitalize',
                fontSize: 12,
                fontWeight: '500',
                color: palette.accent.accentDark,
              }}>
                {foodPost.restaurantName || 'Unknown Restaurant'}
              </Text>
            </View>
          </View>
        </View>

        <Image
          source={AppIcons.bookmark}
          style={{ height: 34, width: 34, resizeMode: 'contain' }}
        />
      </View>

      <Text
        style={{
          paddingVertical: 12,
          fontSize: 12,
          fontWeight: '400',
          textTransform: 'capitalize',
          fontFamily: 'Gabarito',
          lineHeight: 12 * 1.18,
          color: '#76766A'
        }}
        numberOfLines={2}
        ellipsizeMode='tail'
      >
        {foodPost.description || 'Delicious dish with carefully selected ingredients...'}
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 1,
        height: 22,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ height: 14, width: 8 }}
            source={AppIcons.personWalkingIcon}
          />
          <Text style={{
            color: '#46505D',
            fontFamily: 'Gabarito',
            fontSize: 12,
            fontWeight: '400',
            paddingLeft: 8
          }}>
            {foodPost.walkingTime || '0 min'}
          </Text>
          <Image
            source={AppIcons.seperatorIcon}
            style={{ height: 22, marginHorizontal: 16 }}
          />
          <RatingBar
            rating={rating}
            maxStars={5}
            emptyStar={AppIcons.emptyStarIcon}
            starSize={14}
            filledStar={AppIcons.filledStarIcon}
          />
          <Text style={{
            fontFamily: 'ABeeZee',
            fontSize: 12,
            fontWeight: '400',
            color: palette.accent.accentDark,
            paddingLeft: 6,
          }}>
            ({reviewCount > 0 ? reviewCount : '0'})
          </Text>
        </View>

        <Text style={{
          fontFamily: 'ABeeZee',
          fontSize: 12,
          fontWeight: '400',
          color: palette.accent.accentDark,
        }}>
          {formatPrice(foodPost.dish_price)}
        </Text>
      </View>

      <View style={{ backgroundColor: '#eff2f5', height: 1, width: '100%', marginVertical: 10 }} />

      <View style={styles.reactAndButtons}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{
            fontFamily: 'EB Garamond',
            fontSize: 16,
            fontWeight: '500',
            color: '#262020'
          }}>
            Not for me
          </Text>
          <View style={{
            height: 0.5,
            backgroundColor: '#262020',
            marginTop: 0.4,
            width: '100%'
          }} />
        </View>
        <Ripple
          onPress={() => {
            navigation.navigate('FoodDetails', {
              id: foodPost.dish_id,
              foodPost: foodPost // Pass the entire foodPost object
            });
          }}
          borderRadius={10}
        >
          <View style={styles.viewDetailsButton}>
            <Text style={{
              fontFamily: 'EB Garamond',
              fontSize: 16,
              fontWeight: '500',
              paddingRight: 4
            }}>
              View Details
            </Text>
            <Image style={styles.rightArrow} source={AppIcons.arrowRight} />
          </View>
        </Ripple>
      </View>
    </View>
  );
};

export default ItemContainer;

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: 'rgba(175, 175, 160, 0.4)',
    backgroundColor: '#FFFFFD',
    width: screenWidth - 28,
    marginHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },

  distanceAndPriceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexShrink: 1,

  },

  foodIconContainer: {
    height: 64,
    width: 64,
    backgroundColor: '#F8F5F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 8,
  },

  foodTitleIconAndLocation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    width: screenWidth - 28,

  },

  titleAndLocation: {
    paddingHorizontal: 24,
  },

  title: {
    fontFamily: 'EB Garamond',
    fontWeight: '500',
    textTransform: 'capitalize',
    fontSize: 24,
    letterSpacing: -0.01,
    lineHeight: 23,
    paddingRight: 36,
  },


  foodIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  itemTitle: {
    paddingVertical: 4,
  },

  descriptionContainer: {
    paddingVertical: 24,
  },

  thumbsIcon: {
    height: 32,
    width: 32,
  },

  reactAndButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  likeDislikeContainer: {
    width: 94,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacer: {
    flex: 1,
  },

  viewDetailsButton: {
    width: 172,
    height: 42,
    backgroundColor: palette.accent.light,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  rightArrow: {
    paddingLeft: 6,
    height: 10.18 * 1.5,
    width: 11.69 * 1.5,
  }
})
