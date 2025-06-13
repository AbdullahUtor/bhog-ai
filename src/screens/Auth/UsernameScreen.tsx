import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import AppIcons from '../../utils/Icons.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import palette from '../../utils/colors.ts';
import BottomBorderInput from '../../components/common/BottomBorderInput.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types.ts';


const { width, height } = Dimensions.get('window');
type UsernameProp = NativeStackNavigationProp<RootStackParamList>;


const UsernameScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigation = useNavigation<UsernameProp>();
  const validateName = (name: string) => {
    // Simple validation: non-empty and maybe no numbers (can be extended)
    return name.trim().length > 0;
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
    const valid = validateName(text);
    setIsInputFilled(valid);
    if (valid) setShowError(false);
  };

  const updateUserName = () => {
    if (!validateName(inputValue)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (inputValue.trim() !== '') {
      navigation.navigate('Contact', { username: inputValue });
    }
  };

  return (
    <View style={styles.screenView}>
      <TouchableOpacity
        style={styles.backButtonStyle}
        onPress={() => {
          // router.back()
        }}
      >
        <Image style={styles.arrowStyle} source={AppIcons.arrowLeft} />
      </TouchableOpacity>

      <View style={styles.headingAndBodyText}>
        <Text style={styles.text_style}>What’s your name?</Text>
        <Text style={styles.bodyTextStyle}>
          This will be the name displayed when other users search for you.
        </Text>
      </View>

      <View style={styles.inputStyle}>
        <BottomBorderInput
          initialValue=""
          hintText="Jonny Applesauce"
          onTextChange={onChangeText}
          onInputStateChange={() => {}}
        />
        <Text
          style={{
            color: showError ? 'red' : 'transparent',
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'DM Sans',
            marginTop: 4,
          }}
        >
          Opps! not a valid name.
        </Text>
      </View>

      <OutlineButton
        title="Continue"
        onPress={updateUserName}
        backgroundColor={isInputFilled ? palette.primary.main : palette.accent.dark}
        borderColor={isInputFilled ? palette.primary.main : palette.accent.dark}
        color="#ffffff"
      />
    </View>
  );
};

export default UsernameScreen;

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
