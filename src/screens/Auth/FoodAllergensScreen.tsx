
import AppIcons from '../../utils/Icons.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import palette from '../../utils/colors.ts';
import baseClient from '../../services/BaseClient.ts';

import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Allergen = {
  id: number | string;
  allergen_name: string;
  allergen_description?: string;
  icon_url?: string;
  exclusive_allowed?: boolean;
  inclusive_allowed?: boolean;
};

const FoodAllergensScreen  = ({ navigation }) =>{
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  // allergenTypeMap stores 'exclusive' or 'inclusive' for each allergen ID
  const [allergenTypeMap, setAllergenTypeMap] = useState<
    Record<number, 'exclusive' | 'inclusive'>
  >({});
  const [loading, setLoading] = useState(false);
  const [submittingAllergens, setSubmittingAllergens] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isContinueEnabled = selectedItems.length > 0 && !submittingAllergens;

  const fetchAllergensFromAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await baseClient.get('/allergens/?page=1&limit=300');
      if (response.status === 200 && response.data?.data) {
        const data = response.data.data as Allergen[];
        setAllergens([
          ...data,
          {
            id: 'no_sensitivity',
            allergen_name: "I don't have any sensitivities",
          },
        ]);
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError('Failed to fetch allergens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitSelectedAllergens = async (
    selectedItems: (number | string)[],
    allergenTypeMap: Record<number, 'exclusive' | 'inclusive'>
  ) => {
    setSubmittingAllergens(true);
    try {
      let payload;

      if (selectedItems.includes('no_sensitivity')) {
        // Empty allergens list if no sensitivities selected
        payload = { allergens: [] };
      } else {
        const validAllergens = selectedItems.filter(
          (id) => typeof id === 'number'
        ) as number[];

        payload = {
          allergens: validAllergens.map((id) => ({
            allergen_id: id,
            type: allergenTypeMap[id] || 'inclusive', // default to inclusive if missing
          })),
        };
      }

      const response = await baseClient.post('/user/allergens', payload);

      if (response.status >= 200 && response.status < 300) {
        console.log('Allergens submitted successfully:', response.data);
        navigation.reset({
          index: 0,
          routes:[{name: 'FoodQuiz'}],
        });
      } else {
        console.warn('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error submitting allergens:', error);
    } finally {
      setSubmittingAllergens(false);
    }
  };

  useEffect(() => {
    fetchAllergensFromAPI();
  }, []);

  // Toggle selection and update allergenTypeMap accordingly
  const toggleSelection = (item: Allergen) => {
    const id = item.id;
    if (id === 'no_sensitivity') {
      setSelectedItems(['no_sensitivity']);
      setAllergenTypeMap({}); // Clear allergenTypeMap
    } else {
      setSelectedItems((prev) => {
        // Remove "no_sensitivity" if present
        const withoutNoSensitivity = prev.filter((i) => i !== 'no_sensitivity');
        if (prev.includes(id)) {
          // Deselect allergen
          const newSelected = withoutNoSensitivity.filter((i) => i !== id);
          // Remove from allergenTypeMap
          setAllergenTypeMap((prevMap) => {
            const copy = { ...prevMap };
            delete copy[id as number];
            return copy;
          });
          return newSelected;
        } else {
          // Select allergen
          setAllergenTypeMap((prevMap) => ({
            ...prevMap,
            [id as number]: item.exclusive_allowed ? 'exclusive' : 'inclusive',
          }));
          return [...withoutNoSensitivity, id];
        }
      });
    }
  };

  const renderItem = ({ item }: { item: Allergen }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() => {
          if (!submittingAllergens) toggleSelection(item);
        }}
        style={[
          styles.optionContainer,
          isSelected ? styles.selected : styles.unselected,
        ]}
      >
        <View style={styles.optionContent}>
          {item.icon_url && (
            <Image source={{ uri: item.icon_url }} style={styles.iconStyle} />
          )}
          <Text style={styles.optionText}>{item.allergen_name}</Text>
        </View>
        {isSelected && <Image source={AppIcons.circleFill} style={styles.checkmarkStyle} />}
      </TouchableOpacity>
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

  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <Text>{error}</Text>
        <OutlineButton title="Retry" onPress={fetchAllergensFromAPI} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.backButtonStyle}
          onPress={() => {
            console.log('Go Back!!');
          }}
        >
          <Image style={styles.arrowStyle} source={AppIcons.arrowLeft} />
        </TouchableOpacity>

        <View style={styles.headingAndBodyText}>
          <Text style={styles.textStyle}>Do you have any food sensitivities?</Text>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={allergens}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        {submittingAllergens ? (
          <View style={{ paddingVertical: 12, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={palette.accent.black} />
          </View>
        ) : (
          <OutlineButton
            title="Continue"
            onPress={() => {
              if (isContinueEnabled) {
                console.log('Submitting allergens...');
                submitSelectedAllergens(selectedItems, allergenTypeMap);
              }
            }}
            backgroundColor={isContinueEnabled ? palette.accent.black : palette.accent.dark}
            borderColor={isContinueEnabled ? palette.accent.black : palette.accent.dark}
            color={isContinueEnabled ? '#ffffff' : '#cccccc'}
            disabled={!isContinueEnabled}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FoodAllergensScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headingAndBodyText: {
    marginVertical: height * 0.02,
  },
  backButtonStyle: {
    backgroundColor: palette.accent.light,
    height: height * 0.045,
    width: height * 0.045,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.015,
  },
  arrowStyle: {
    height: height * 0.025,
    width: height * 0.025,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: width * 0.07,
    fontWeight: '400',
    fontFamily: 'EB Garamond',
    color: palette.primary.dark,
    paddingRight: width * 0.1,
  },
  listContainer: {
    paddingBottom: height * 0.02,
    gap: 12,
  },
  optionContainer: {
    width: '100%',
    height: height * 0.07,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  unselected: {
    borderWidth: 1,
    borderColor: '#AFAFA0',
    justifyContent: 'flex-start',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#262020',
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: width * 0.045,
    color: '#000',
  },
  checkmarkStyle: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
