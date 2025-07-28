import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import baseClient from '../../services/BaseClient.ts';
import {fetchUserProfile} from '../../services/UserService.ts';
import AppIcons from '../../utils/Icons.ts';
import palette from '../../utils/colors.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';


const { width, height } = Dimensions.get('window');

type Allergen = {
  id: number | string;
  allergen_name: string;
  icon_url?: string;
  exclusive_allowed?: boolean;
  inclusive_allowed?: boolean;
};

const FoodSensitivitiesScreen = ({ navigation }) => {
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [allergenTypeMap, setAllergenTypeMap] = useState<Record<number, 'exclusive' | 'inclusive'>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    console.log('👀 fetchData called');
    setLoading(true);
    try {
      const [allergensRes, userProfile] = await Promise.all([
        baseClient.get('/allergens/?page=1&limit=300'),
        fetchUserProfile(),
      ]);
      console.log('✅ API responses:', allergensRes.data, userProfile);

      const allAllergens = allergensRes.data.data as Allergen[];
      const userSelected = userProfile.allergens || [];

      const selected = userSelected.map((a) => a.allergen_id);
      const typeMap = userSelected.reduce((acc, curr) => {
        acc[curr.allergen_id] = curr.type;
        return acc;
      }, {});

      setAllergens(allAllergens);
      setSelectedItems(selected);
      setAllergenTypeMap(typeMap);
    } catch (err) {
      Alert.alert('Error', 'Failed to load sensitivities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const toggleSelection = (item: Allergen) => {
    const id = item.id;
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        const newSelected = prev.filter((i) => i !== id);
        setAllergenTypeMap((prevMap) => {
          const copy = { ...prevMap };
          delete copy[id as number];
          return copy;
        });
        return newSelected;
      } else {
        setAllergenTypeMap((prevMap) => ({
          ...prevMap,
          [id as number]: item.exclusive_allowed ? 'exclusive' : 'inclusive',
        }));
        return [...prev, id];
      }
    });
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const validAllergens = selectedItems.filter((id) => typeof id === 'number') as number[];
      const payload = {
        allergens: validAllergens.map((id) => ({
          allergen_id: id,
          type: allergenTypeMap[id] || 'inclusive',
        })),
      };
      await baseClient.post('/user/allergens', payload);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderItem = ({ item }: { item: Allergen }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        onPress={() => !submitting && toggleSelection(item)}
        style={[
          styles.optionContainer,
          isSelected ? styles.selected : styles.unselected,
        ]}
      >
        <View style={styles.optionContent}>
          {item.icon_url && <Image source={{ uri: item.icon_url }} style={styles.iconStyle} />}
          <Text style={styles.optionText}>{item.allergen_name}</Text>
        </View>
        {isSelected && <Image source={AppIcons.circleFill} style={styles.checkmarkStyle} />}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={palette.accent.dark} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.backButtonStyle}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.arrowStyle} source={AppIcons.arrowLeft} />
        </TouchableOpacity>

        <View style={styles.headingAndBodyText}>
          <Text style={styles.textStyle}>Your food sensitivities</Text>
        </View>

        <FlatList
          data={allergens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <OutlineButton
          title={submitting ? 'Saving...' : 'Save'}
          onPress={handleSave}
          backgroundColor={palette.accent.black}
          borderColor={palette.accent.black}
          color="#ffffff"
          disabled={submitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default FoodSensitivitiesScreen;

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
