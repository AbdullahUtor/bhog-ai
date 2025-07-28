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
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import baseClient from '../../services/BaseClient';
import { fetchUserProfile } from '../../services/UserService';
import AppIcons from '../../utils/Icons';
import palette from '../../utils/colors';
import OutlineButton from '../../components/common/OutlineButton';

const { width, height } = Dimensions.get('window');

interface Dish {
  id: number;
  dish_name: string;
  icon_url?: string;
}

const EditFoodQuizScreen = () => {
  const navigation = useNavigation();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDishesAndUserSelection = async () => {
    setLoading(true);
    try {
      const [dishesRes, userProfile] = await Promise.all([
        baseClient.get('/dishes/?page=1&limit=100'),
        fetchUserProfile(),
      ]);

      const allDishes: Dish[] = dishesRes.data.results;
      const selectedIds = (userProfile.selectedDishes || []).map((d) => d.dish_id);

      setDishes(allDishes);
      setSelectedItems(selectedIds);
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      Alert.alert('Error', 'Failed to load dishes or user preferences.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishesAndUserSelection();
  }, []);

  const toggleDishSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (selectedItems.length < 5) {
      Alert.alert('Please select at least 5 dishes to continue.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await baseClient.post('/user/selected-dishes', {
        selectedDishes: selectedItems,
      });

      if (response.status === 200 || response.status === 201) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update dishes.');
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      Alert.alert('Error', 'Something went wrong while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderDishChip = (dish: Dish) => {
    const selected = selectedItems.includes(dish.id);
    return (
      <Pressable
        key={dish.id}
        onPress={() => toggleDishSelection(dish.id)}
        style={[styles.chip, selected && styles.chipSelected]}
      >
        <View style={styles.chipContent}>
          <SvgUri
            uri={dish.icon_url || ''}
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={AppIcons.arrowLeft} style={styles.arrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.headingAndBodyText}>
        <Text style={styles.textStyle}>Update your favorite dishes:</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chipContainer}>
        <View style={styles.chipWrap}>
          {dishes.map(renderDishChip)}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' }}>
        {submitting ? (
          <ActivityIndicator size="small" color={palette.accent.black} />
        ) : (
          <OutlineButton
            title="Save"
            onPress={handleSave}
            backgroundColor={selectedItems.length >= 5 ? palette.primary.main : '#ccc'}
            borderColor={selectedItems.length >= 5 ? palette.primary.main : '#ccc'}
            color="#fff"
          />
        )}
      </View>
      <View style={{ paddingBottom: 15 }} />

    </SafeAreaView>
  );
};

export default EditFoodQuizScreen;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#FAFAF7',
    paddingTop: 32,
    flex: 1,
    paddingLeft: 20, paddingRight: 18,
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
    paddingTop: height * 0.02,
    paddingLeft: 20,
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
