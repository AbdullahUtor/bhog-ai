import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import AppIcons from '../../utils/Icons.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import palette from '../../utils/colors.ts';
import baseClient from '../../services/BaseClient.ts';
import {SvgUri} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export interface Dish {
  id: number;
  dish_name: string;
  distance?: string;
  icon_url?: string;
  isSelected?: boolean;
}

// Chip component for individual dish selection
type DishChipProps = {
  dish: Dish;
  selected: boolean;
  onPress: () => void;
};

const DishChip: React.FC<DishChipProps> = ({ dish, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}
  >
    <View style={styles.chipContent}>
      <SvgUri
        uri={dish.icon_url || ''} // Convert undefined to empty string
        width={16}
        height={16}
        style={styles.chipIcon}
      />
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {dish.dish_name}
      </Text>
    </View>
  </Pressable>
);

// @ts-ignore
const FoodQuizScreen = ({ navigation }) =>{
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittingDishes, setSubmittingDishes] = useState(false);

  const loadDishes = async () => {
    setLoading(true);
    try {
      const res = await baseClient.get('/dishes/?page=1&limit=100');

      if (res.status === 200 && res.data?.results && Array.isArray(res.data.results)) {
        const fetchedDishes: Dish[] = res.data.results.map((dish: Dish) => ({
          ...dish,
          isSelected: false,
        }));
        setDishes(fetchedDishes);
      } else {
        console.warn('Unexpected response from server:', res);
        Alert.alert('Error', 'Unexpected response from server. See console for details.');
      }
    } catch (error: any) {
      console.error('Failed to load dishes:', error?.response ?? error);
      Alert.alert('Error', 'Failed to load dishes. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const handleDishSelection = (id: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleContinue = async () => {
    if (selectedItems.length < 5) {
      Alert.alert('Please select at least 5 dishes to continue.');
      return;
    }

    setSubmittingDishes(true);
    try {
      const selectedDishIds = selectedItems.map(id => parseInt(id, 10));

      const requestBody = {
        selectedDishes: selectedDishIds
      };

      console.log('Sending selected dishes:', requestBody);

      const response = await baseClient.post('/user/selected-dishes', requestBody);

      if (response.status === 200 || response.status === 201) {
        console.log('Successfully saved selected dishes:', response.data);
        navigation.reset({
          index: 0,
          routes:[{name: 'MainTabs'}],
        });
      } else {
        console.warn('Unexpected response:', response);
        Alert.alert('Error', 'Failed to save your preferences. Please try again.');
      }
    } catch (error: any) {
      console.error('Failed to save selected dishes:', error?.response ?? error);
      Alert.alert(
        'Error',
        'Failed to save your preferences. Please check your connection and try again.'
      );
    } finally {
      setSubmittingDishes(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size="large" color={palette.accent.dark} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <Text>{error}</Text>
        <OutlineButton title="Retry" onPress={loadDishes} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sideContainer}>
        <TouchableOpacity onPress={() => console.log('GoBack!')} style={styles.backButton}>
          <Image source={AppIcons.arrowLeft} style={styles.arrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.headingAndBodyText}>
        <Text style={styles.textStyle}>Choose at least 5 dishes you like:</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chipContainer}>
        <View style={styles.chipWrap}>
          {dishes.map((dish) => (
            <DishChip
              key={dish.id}
              dish={dish}
              selected={selectedItems.includes(dish.id.toString())}
              onPress={() => handleDishSelection(dish.id.toString())}
            />
          ))}
        </View>
      </ScrollView>
      {submittingDishes ? (
        <View style={{ paddingVertical: 12, alignItems: 'center' }}>
          <ActivityIndicator size="small" color={palette.accent.black} />
        </View>
      ) : (
      <OutlineButton
        title="Continue"
        onPress={handleContinue}
        backgroundColor={selectedItems.length >= 5 ? palette.primary.main : '#ccc'}
        borderColor={selectedItems.length >= 5 ? palette.primary.main : '#ccc'}
        color="#fff"
      />
        )}

      <View style={{ paddingBottom: 22 }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#FAFAF7',
    paddingTop: 32,
    flex: 1,
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
  headingAndBodyText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textStyle: {
    textAlign: 'left',
    fontFamily: 'EB Garamond',
    fontSize: width * 0.09,
    fontWeight: '400',
    paddingTop: height * 0.02,
    paddingRight: width * 0.15,
    paddingBottom: height * 0.014,
    color: palette.primary.dark,
  },
  chipContainer: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    borderColor: palette.accent.dark,
    borderWidth: 1,
    paddingVertical: 11.5,
    paddingHorizontal: 16,
    borderRadius: 40,
    marginRight: 8,
    marginBottom: 8,
    // backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: palette.accent.dark,
    borderColor: palette.accent.dark,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
    resizeMode: 'contain',
  },
  chipText: {
    color: palette.primary.dark,
    fontFamily: 'DM Sans',
    fontSize: width * 0.035,
    fontWeight: '400',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

export default FoodQuizScreen;
