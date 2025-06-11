import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import BottomBorderInput from '../../components/common/BottomBorderInput.tsx';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import palette from '../../utils/colors.ts';
import AppIcons from '../../utils/Icons.ts';
import baseClient from '../../services/BaseClient.ts';

const { width, height } = Dimensions.get('window');

type ContactScreenProps = {
  route: {
    params: {
      username: string;
    };
  };
};

const ContactScreen = ({ route }: ContactScreenProps) => {
  const { username } = route.params;
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setIsButtonActive(phone.trim().length > 0);
    if (phone.trim().length > 0) setIsValid(true);
  }, [phone]);

  const handleSubmit = async () => {
    if (phone.trim() === '') {
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await baseClient.put('/user/profile', {
        name: username,
        phone: phone.trim(),
      });

      if (response.status === 200) {
        navigation.navigate('FoodQuiz');
      } else if (response.status === 400) {
        Alert.alert('Validation Error', JSON.stringify(response.data));
      } else if (response.status === 401 || response.status === 403) {
        Alert.alert('Unauthorized', 'Please log in again');
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Check your internet connection');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity
        style={styles.backButtonStyle}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.arrowStyle} source={AppIcons.arrowLeft} />
      </TouchableOpacity>

      <View style={styles.headingAndBodyText}>
        <Text style={styles.text_style}>What’s your number?</Text>
        <Text style={styles.bodyTextStyle}>
          This will be how your friends can search for you when you want to eat together.
        </Text>
      </View>

      <View style={styles.inputStyle}>
        <BottomBorderInput
          initialValue=""
          hintText="+1 (202) 5555-4321"
          onTextChange={setPhone}
          onInputStateChange={() => {}}
        />
        <Text
          style={{
            color: isValid ? 'transparent' : 'red',
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'DM Sans',
            marginTop: 4,
          }}
        >
          Oops! Not a valid number.
        </Text>
      </View>

      <OutlineButton
        title={isLoading ? '' : 'Continue'}
        onPress={handleSubmit}
        backgroundColor={isButtonActive ? palette.primary.main : palette.accent.dark}
        borderColor={isButtonActive ? palette.primary.main : palette.accent.dark}
        color="#ffffff"
        customChild={
          isLoading ? <ActivityIndicator color="#fff" /> : undefined
        }
        disabled={!isButtonActive || isLoading}
      />
    </KeyboardAvoidingView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: palette.primary.bg,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
  },

  headingAndBodyText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  backButtonStyle: {
    backgroundColor: palette.accent.light,
    height: height * 0.04,
    width: height * 0.04,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowStyle: {
    height: height * 0.025,
    width: height * 0.025,
  },

  text_style: {
    textAlign: 'left',
    fontFamily: 'EB Garamond',
    fontSize: width * 0.09,
    fontWeight: '400',
    paddingTop: height * 0.05,
    color: palette.primary.dark,
  },

  bodyTextStyle: {
    fontFamily: 'DM Sans',
    fontSize: width * 0.038,
    fontWeight: '500',
    color: palette.accent.accentDark,
    paddingTop: height * 0.01,
    paddingRight: width * 0.03,
  },

  inputStyle: {
    paddingTop: height * 0.14,
    paddingBottom: height * 0.09,
    width: '100%',
  },
});
