
import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView, StyleSheet,
  Text,
  View,
} from 'react-native';
import AppIcons from '../../utils/Icons.ts';
import palette from '../../utils/colors.ts';
import {useLocation} from '../../hooks/UseLocation.tsx';



const AppBarWithLeading = () => {
 const {location, loading} = useLocation();

  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Image style={styles.iconStyle} source={AppIcons.goldenLogo} />
        <View style={styles.locationContainer}>
          <Image style={styles.locationMarker} source={AppIcons.markerPin} />
          {loading ? (
            <ActivityIndicator size="small" color="#76766A" />
          ) : (
            <Text style={styles.locationTextStyle}>{location?.city}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AppBarWithLeading

const styles = StyleSheet.create({

  appBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 21,
    paddingRight: 19,
  },

  locationMarker: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
    paddingRight: 2,
    paddingLeft: 6,
  },

  locationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    backgroundColor: palette.accent.light,
    borderRadius: 18,
    paddingTop: 9,
    paddingRight: 11,
    paddingBottom: 10,
    paddingLeft: 2,
  },

  locationTextStyle: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    color: palette.accent.accentDark,
    paddingLeft: 2,
  },


  square1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    // width: 24,
    backgroundColor: '#2c2c2c',
    borderRadius: 90,
  },

  iconStyle: {
    width: 47,
    height: 28,
    resizeMode: 'contain'
  },
  nameInitial: {
    color: '#F5F5F5',
    paddingLeft: 7,
    paddingRight: 6,

  },

  trailingIcon: {
    height: 24,
    width: 24,
  }

});
