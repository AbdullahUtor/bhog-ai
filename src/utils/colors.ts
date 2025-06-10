const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};




const palette = {
  primary: {
    light: '#7986CB',
    main: '#525147',
    dark: '#262020',
    bg: '#FAFAF7'
  },
  secondary: {
    light: '#FF4081',
    main: '#AFAFA0',
    dark: '#C51162',
  },
  neutral: {
    white: '#FFFFFF',
    lighterGray: '#F5F5F5',
    lightGray: '#E0E0E0',
    gray: '#9E9E9E',
    darkGray: '#616161',
    darkerGray: '#212121',
    black: '#000000',
  },
  semantic: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
  accent: {
    light: '#F5F4EE',
    dark: '#AFAFA0',
    black: '#525147',
    accentDark: '#AFAFA0'
  }

};

// Export individual color groups for flexibility
export const { primary, secondary, neutral, semantic, accent } = palette;

// Export the entire palette
export default palette;