// src/screens/Food/FoodDetailsScreen.tsx
import React from 'react';
import {View, Text, Animated, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import ScrollView = Animated.ScrollView;
import AppIcons from '../../utils/Icons.ts';
import RatingBar from '../../components/common/RattingBar.tsx';
import palette from '../../utils/colors.ts';
const { width, height } = Dimensions.get('window');

const FoodDetails = ({ route }) => {
  const { id } = route.params;
  const restaurantLocation = { latitude: 40.7128, longitude: -74.0060 };

  return (

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.sideContainer}>
              <TouchableOpacity onPress={() => console.log("Go Back!!")} style={styles.backButton}>
                <Image source={AppIcons.arrowLeft} style={styles.arrow} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>bhogi</Text>
            </View>
            <View style={styles.sideContainer} />
          </View>

          <View style={{ height: 42 }} />

          {/* Location */}
          <View style={styles.locationRow}>
            <Image source={AppIcons.locationMarkerFilled} style={styles.locationIcon} />
            <Text style={styles.locationText}>Restaurant Italiana</Text>
          </View>

          {/* Dish Title + Icon */}
          <View style={styles.dishRow}>
            <Text style={styles.dishTitle}>
              Scallop Crudo with Nectarine Puree
            </Text>
            <View style={styles.foodIconContainer}>
              <Image style={styles.foodIcon} source={AppIcons.shrimp} />
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Description of dish here. Lightly braised scallops in a butter sauce on a bed of freshly picked nectarines and some more text here just to test the elipses
          </Text>

          {/* Rating and Price */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <RatingBar
                rating={3.5}
                maxStars={5}
                emptyStar={AppIcons.emptyStarIcon}
                filledStar={AppIcons.filledStarIcon}
                starSize={14}
              />
              <Text style={styles.ratingText}>(293)</Text>
            </View>
            <Text style={styles.price}>$18.99</Text>
          </View>

          <View style={styles.divider} />

          {/* Allergens */}
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Allergens</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={styles.editText}>Edit</Text>
                <View style={styles.underline} />
              </View>
            </View>
            <Text style={styles.subText} numberOfLines={2} ellipsizeMode='tail'>
              Wheat, gluten, soy, shellfish
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Location Section */}
          <View>
            <View style={styles.sectionHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Location</Text>
                <Text style={styles.subText}>
                  Restaurant Italiana 115 N. Canton St. Washington DC (692) 555-2828
                </Text>
              </View>
              <View style={styles.mapBox}>
                {/*<MiniMap latitude={37.78825} longitude={-122.4324} />*/}
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Not for me */}
          <View style={styles.sectionHeader}>
            <Text style={styles.notForMeText}>
              Doesn’t sound good? Let us know so we can learn your preferences!
            </Text>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.editText}>Not for me</Text>
              <View style={styles.underline} />
            </View>
          </View>
        </ScrollView>

        {/* Fixed Footer */}
        <View>
          <View style={styles.footer}>
            <View style={styles.bookmarkButton}>
              <Image source={AppIcons.bookmark} style={styles.bookmarkIcon} />
            </View>
            <View style={{ width: 18 }} />
            <TouchableOpacity onPress={
              ()=>      console.log("open Bottom Sheet!")
              // handleOpenSheet
            }>
              <View style={styles.eatButton}>
                <Text style={styles.eatButtonText}>Let's eat!</Text>
                <Text style={styles.eatButtonTime}>7 min</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*<DirectionSheet*/}
        {/*  ref={bottomSheetRef}*/}
        {/*  latitude={restaurantLocation.latitude}*/}
        {/*  longitude={restaurantLocation.longitude}*/}
        {/*  onClose={handleCloseSheet}*/}
        {/*/>*/}
      </View>

  );
};

export default FoodDetails;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  sideContainer: {
    width: height * 0.04,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: palette.accent.light,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  arrow: {
    height: height * 0.025,
    width: height * 0.025,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  locationIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Gabarito',
    color: palette.accent.accentDark,
  },
  dishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishTitle: {
    fontFamily: 'EB Garamond',
    fontSize: 32,
    flex: 1,
    lineHeight: 36,
    marginRight: 12,
  },
  foodIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodIcon: {
    height: 42,
    width: 42,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Gabarito',
    color: '#76766A',
    paddingVertical: 12,
    lineHeight: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    paddingLeft: 6,
    fontFamily: 'ABeeZee',
    color: palette.accent.accentDark,
  },
  price: {
    fontSize: 12,
    fontFamily: 'ABeeZee',
    color: palette.accent.accentDark,
  },
  divider: {
    backgroundColor: '#eff2f5',
    height: 1,
    marginVertical: 28,
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'EB Garamond',
    color: '#262020',
  },
  editText: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '500',
    color: '#262020',
  },
  underline: {
    height: 0.5,
    backgroundColor: '#262020',
    marginTop: 2,
    width: '100%',
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Gabarito',
    lineHeight: 14,
    color: '#76766A',
    paddingTop: 12,
  },
  mapBox: {
    width: 170,
    height: 100,
  },
  notForMeText: {
    fontSize: 12,
    fontFamily: 'Gabarito',
    lineHeight: 14,
    color: '#76766A',
    flex: 1,
    paddingRight: 37,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bookmarkButton: {
    height: 62,
    width: 62,
    borderRadius: 18,
    backgroundColor: '#F4F4EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: {
    height: 42,
    width: 42,
  },
  eatButton: {
    height: 62,
    width: width - 62 - 36 - 24, // subtract padding + bookmark size
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#292D32',
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  eatButtonText: {
    fontFamily: 'EB Garamond',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
  },
  eatButtonTime: {
    fontFamily: 'Gabarito',
    fontWeight: '500',
    fontSize: 16,
    color: palette.accent.accentDark,
  },
});