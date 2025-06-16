import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import AppIcons from '../../utils/Icons.ts'; // assuming you have these icons
import palette from '../../utils/colors.ts';
import {Flavors} from '../../services/RecommendationService.ts';
const { width } = Dimensions.get('window');
type Restaurant = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  distance: number;
  flavors: Flavors;
  ingredients: string[];
  google_place_id: string;
  allergens: string[];
  rating: number | null;
  review_count: number | null;
  dish_price: number | null;
  icon_url: string;
  restaurantName?: string;
  walkingTime?: string;
};

type Props = {
  item: Restaurant;
  onViewDetails: () => void;
  onNotForMe: () => void;
};

export default function FoodCard({ item, onViewDetails, onNotForMe }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Image source={AppIcons.bookmark} style={styles.bookmarkIcon} />
      </View>

      <View style={styles.locationRow}>
        <Image
          source={AppIcons.locationMarkerFilled}
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>{item.restaurantName}</Text>
      </View>

      <View style={styles.ratingRow}>
        <View style={styles.walkTime}>
          <Image source={AppIcons.personWalkingIcon} style={styles.walkIcon} />
          <Text style={styles.walkText}>{item.walkingTime}s</Text>
        </View>

        <Image source={AppIcons.seperatorIcon} style={styles.separator} />

        <View style={styles.starsRow}>
          {[0, 1, 2, 3, 4].map(index => (
            <Image
              key={index}
              source={
                index < 4 ? AppIcons.filledStarIcon : AppIcons.emptyStarIcon
              }
              style={styles.starIcon}
            />
          ))}
          <Text style={styles.reviewCount}>({item.review_count ?? 0})</Text>
        </View>

        <Text style={styles.price}>${item.dish_price}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={onNotForMe}>
          <Text style={styles.notForMeText}>Not for me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={onViewDetails}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Image source={AppIcons.arrowRight} style={styles.arrowRightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFD', // same as Color(0xFFFFFFFD)
    borderRadius: 18,
    borderColor: 'rgba(175, 175, 160, 0.40)',
    borderWidth: 1,
    padding: 14,
    width: width * 0.82, // same CARD_WIDTH
    height: 193, // same CARD_HEIGHT
    marginHorizontal: 10,
    elevation: 5, // for shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'EB Garamond',
    fontSize: 24,
    fontWeight: '500',
    color: '#292D32',
    textTransform: 'capitalize',
    flex: 1,
  },
  bookmarkIcon: {
    width: 28,
    height: 27,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 4,
  },
  locationText: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: palette.accent.accentDark,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  walkTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walkIcon: {
    width: 14,
    height: 14,
    tintColor: '#46505D',
  },
  walkText: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    fontWeight: '400',
    color: '#46505D',
    marginLeft: 8,
  },
  separator: {
    height: 18,
    width: 1,
    tintColor: '#EFF2F5',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 1,
    resizeMode: 'contain',
  },
  reviewCount: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    fontWeight: '400',
    color: '#76766A',
    marginLeft: 6,
  },
  price: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    fontWeight: '400',
    color: palette.accent.accentDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFF2F5',
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notForMeText: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '500',
    color: '#262020',
    borderBottomWidth: 1,
    borderBottomColor: '#262020',
    paddingBottom: 2,
  },
  viewDetailsButton: {
    backgroundColor: '#F5F4EE',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '500',
    color: '#262020',
  },
  arrowRightIcon: {
    width: 17,
    height: 21,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});
