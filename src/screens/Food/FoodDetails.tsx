// src/screens/Food/FoodDetailsScreen.tsx
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions, Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScrollView = Animated.ScrollView;
import AppIcons from '../../utils/Icons.ts';
import RatingBar from '../../components/common/RattingBar.tsx';
import palette from '../../utils/colors.ts';
import { RootStackParamList } from '../../types/types.ts';
import RBSheet from 'react-native-raw-bottom-sheet';
import MiniMap from '../../components/common/MiniMap.tsx';
import MapOptionsContent from '../../components/common/MapOptionSheet.tsx';


const { width, height } = Dimensions.get('window');

type FoodDetailsRouteProp = RouteProp<RootStackParamList, 'FoodDetails'>;
type FoodDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FoodDetails'>;

interface FoodDetailsProps {
  route: FoodDetailsRouteProp;
  navigation: FoodDetailsNavigationProp;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({ route }) => {
  const navigation = useNavigation();
  const { id, foodPost } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef<any>(null);

  // Helper function to format price
  const formatPrice = (price: number | null): string => {
    if (price === null) return '$';
    return `$${price.toFixed(2)}`;
  };

  // Helper function to get rating display
  const getRatingDisplay = () => {
    if (foodPost.rating && foodPost.review_count) {
      return {
        rating: foodPost.rating,
        reviewCount: foodPost.review_count,
      };
    }
    return {
      rating: 3.5,
      reviewCount: 0,
    };
  };

  const { rating, reviewCount } = getRatingDisplay();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const openInAppleMaps = () => {
    const { lat, lng } = foodPost;
    const url = `http://maps.apple.com/?daddr=${lat},${lng}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const openInGoogleMaps = () => {
    const { lat, lng } = foodPost;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };


  // Bottom Sheet Content Component
  // const MapOptionsContent = () => (
  //   <View style={bottomSheetStyles.container}>
  //     {/* Address Section */}
  //     <View style={bottomSheetStyles.addressContainer}>
  //       <Text style={bottomSheetStyles.address}>{foodPost.address}</Text>
  //       <Text style={bottomSheetStyles.question}>How are you directing there?</Text>
  //
  //
  //     {/* Dinner Date Section */}
  //     <Text style={bottomSheetStyles.subtitle}>Apple Maps</Text>
  //       <View style={
  //         {
  //           backgroundColor: palette.primary.dark,
  //         }
  //       }></View>
  //
  //       <Text style={bottomSheetStyles.subtitle}>Apple Maps</Text>
  //
  //     </View>
  //
  //     {/* User Info Card */}
  //     <View style={bottomSheetStyles.userCard}>
  //       <Image
  //         source={AppIcons.foodIconDummy} // Update path as needed
  //         style={bottomSheetStyles.userImage}
  //       />
  //       <View style={bottomSheetStyles.userInfo}>
  //         <Text style={bottomSheetStyles.userName}>Kim B.</Text>
  //         <Text style={bottomSheetStyles.userTitle}>Gourmet Guru</Text>
  //         <Text style={bottomSheetStyles.userMeals}>2 meals shared</Text>
  //       </View>
  //       <TouchableOpacity
  //         onPress={handleCloseBottomSheet}
  //         style={bottomSheetStyles.changeButton}
  //       >
  //         <Text style={bottomSheetStyles.changeText}>Change</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.sideContainer}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
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
          <Text style={styles.locationText}>
            {foodPost.restaurantName || 'Unknown Restaurant'}
          </Text>
        </View>

        {/* Dish Title + Icon */}
        <View style={styles.dishRow}>
          <Text style={styles.dishTitle}>
            {foodPost.name}
          </Text>
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
              }}
            />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {foodPost.description || 'Delicious dish with carefully selected ingredients...'}
        </Text>

        {/* Rating and Price */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <RatingBar
              rating={rating}
              maxStars={5}
              emptyStar={AppIcons.emptyStarIcon}
              filledStar={AppIcons.filledStarIcon}
              starSize={14}
            />
            <Text style={styles.ratingText}>
              ({reviewCount > 0 ? reviewCount : '0'})
            </Text>
          </View>
          <Text style={styles.price}>
            {formatPrice(foodPost.dish_price)}
          </Text>
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
            {(() => {
              const allergens = foodPost.allergens;
              if (allergens && String(allergens).trim()) {
                return String(allergens).split(',').map(allergen => allergen.trim()).join(', ');
              }
              return 'No allergen information available';
            })()}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Location Section */}
        <View>
          <View style={styles.sectionHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text style={styles.subText}>
                {foodPost.address  || 'Unknown Restaurant'}
                {/*{foodPost.restaurant_address && ` - ${foodPost.restaurant_address}`}*/}
                {/*{foodPost.restaurant_phone && ` - ${foodPost.restaurant_phone}`}*/}
              </Text>
            </View>
            <View style={styles.mapBox}>
              <MiniMap latitude={foodPost.lat ?? 38.897095} longitude={foodPost.lng ?? -77.006332} />
            </View>

          </View>
        </View>


        <View style={styles.divider} />

        {/* Not for me */}
        <View style={styles.sectionHeader}>
          <Text style={styles.notForMeText}>
            Doesn't sound good? Let us know so we can learn your preferences!
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
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <View style={styles.eatButton}>
              <Text style={styles.eatButtonText}>Let's eat!</Text>
              <Text style={styles.eatButtonTime}>
                {foodPost.walkingTime || '0 min'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <RBSheet
        ref={bottomSheetRef}
        height={340}
        openDuration={250}
        closeDuration={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background like Flutter
          },
          container: {
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: 'transparent', // Let content define color
            overflow: 'visible',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <MapOptionsContent  onClose={handleCloseBottomSheet}
                            onOpenAppleMaps={openInAppleMaps}
                            onOpenGoogleMaps={openInGoogleMaps} />
      </RBSheet>


      {/*<RBSheet*/}
      {/*  ref={bottomSheetRef}*/}
      {/*  height={400}*/}
      {/*  openDuration={250}*/}
      {/*  closeDuration={200}*/}
      {/*  customStyles={{*/}
      {/*    wrapper: {*/}
      {/*      backgroundColor: 'rgba(0, 0, 0, 0.2)',*/}
      {/*    },*/}
      {/*    container: {*/}
      {/*      borderTopLeftRadius: 18,*/}
      {/*      borderTopRightRadius: 18,*/}
      {/*      backgroundColor: 'transparent',*/}
      {/*    },*/}
      {/*    draggableIcon: {*/}
      {/*      backgroundColor: '#000',*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <MapOptionsContent />*/}
      {/*</RBSheet>*/}

    </View>
  );
};

export default FoodDetails;


// Bottom Sheet Styles
const bottomSheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  addressContainer: {
    backgroundColor: 'white',
    borderRadius: 18,
    opacity: 0.80,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  address: {
    color: '#3D3D3D',
    fontSize: 14,
    fontFamily: 'Gabarito',
    textAlign: 'center',
    marginBottom: 4,
  },
  question: {
    color: '#7F7F7F',
    fontSize: 13,
    fontFamily: 'Gabarito',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'EB Garamond',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    color: palette.accent.accentDark,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginBottom: 20,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 18,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userTitle: {
    fontFamily: 'Gabarito',
    fontSize: 14,
    color: palette.accent.accentDark,
    fontWeight: '400',
    lineHeight: 16,
  },
  userMeals: {
    fontFamily: 'Gabarito',
    fontSize: 14,
    color: palette.accent.accentDark,
    fontWeight: '400',
    lineHeight: 16,
  },
  changeButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#262020',
  },
  changeText: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '400',
    color: '#262020',
  },
});

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    backgroundColor: palette.primary.bg,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 55,
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
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'DMSans',

  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
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
    textTransform: 'capitalize',
    color: palette.accent.accentDark,
  },
  dishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  dishTitle: {
    fontFamily: 'EB Garamond',
    fontSize: 32,
    flex: 1,
    lineHeight: 36,
    textTransform: 'capitalize',
    paddingRight: 22,
  },
  foodIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F2',
    height: 64, width: 64,
    borderRadius: 100,
  },
  foodIcon: {
    height: 42,
    width: 42,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Gabarito',
    textTransform: 'capitalize',
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
    alignItems: 'flex-start',
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
    textTransform: 'capitalize',
    paddingTop: 12,
  },
  mapBox: {
    width: 170,
    height: 100,
    borderRadius: 14,
    overflow: 'hidden'
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
    paddingTop: 12,
    paddingBottom: 32,
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
