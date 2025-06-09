import { StyleSheet, Image, View, ImageSourcePropType, ImageStyle } from 'react-native';
import React from 'react';
import AppIcons from "../../utils/Icons.ts";

interface BhogiLogoProps {
    logo?: ImageSourcePropType;
    width?: number;
    height?: number;
}

const BhogiLogo: React.FC<BhogiLogoProps> = ({
                                                 logo = AppIcons.bhogiLogo,
                                                 width = 136.83,
                                                 height = 93,
                                             }) => {
    return (
        <View>
            <Image
                style={[
                    styles.logoStyle,
                    { width, height }
                ]}
                source={logo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        resizeMode: 'contain'
    }
})

export default BhogiLogo;