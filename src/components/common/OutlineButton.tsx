
import React from 'react';
import { ActivityIndicator, Dimensions, GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import palette from '../../utils/colors.ts';

const { width } = Dimensions.get('window');

interface OutlineButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  isLoading?: boolean;
  loadingColor?: string;
  isUnderlined?: boolean; // Add the underline flag
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
                                                       title,
                                                       onPress,
                                                       backgroundColor = '#fff',
                                                       color = palette.primary.main,
                                                       borderColor = palette.primary.main,
                                                       isLoading = false,
                                                       loadingColor,
                                                       isUnderlined = false // Default to no underline
                                                     }) => {
  return (
    <View style={styles.wrapper}>
      <Ripple onPress={onPress}>
        <View style={[styles.container, { backgroundColor, borderColor }]}>
          {
            isLoading ? (
              <ActivityIndicator
                size='small'
                color={loadingColor || color}
              />
            ) : (
              <Text
                style={[
                  styles.text_style,
                  {
                    color,
                    textDecorationLine: isUnderlined ? 'underline' : 'none'
                  }
                ]}
              >
                {title}
              </Text>
            )
          }
        </View>
      </Ripple>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    width: width - 42,
  },
  container: {
    height: 64,
    borderRadius: 18,
    borderColor: '#767676',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text_style: {
    textAlign: 'center',
    fontFamily: 'EB Garamond',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
  }
})

export default OutlineButton;