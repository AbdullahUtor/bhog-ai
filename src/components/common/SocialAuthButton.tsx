
import React from 'react';
import {
    AccessibilityRole,
    Dimensions,
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import palette from "../../utils/colors.ts";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SocialAuthButtonProps {
    imageSrc?: ImageSourcePropType;
    onPress: (event: GestureResponderEvent) => void;
    width?: number;
    height?: number;
    backgroundColor?: string;
    buttonStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    text?: string;
    textStyle?: TextStyle;
    underlineText?: boolean;
    borderColor?: string;
    accessibilityLabel?: string;
    accessibilityRole?: AccessibilityRole;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
                                                               imageSrc,
                                                               onPress,
                                                               width = SCREEN_WIDTH * 0.9,
                                                               height = SCREEN_WIDTH * 0.16,
                                                               backgroundColor = palette.accent.light,
                                                               buttonStyle,
                                                               imageStyle,
                                                               text,
                                                               textStyle,
                                                               underlineText = false,
                                                               borderColor = 'transparent',
                                                               accessibilityLabel = 'Social Auth Button',
                                                               accessibilityRole = 'button',
                                                           }) => {
    const iconSize = height / 2.5;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={accessibilityRole}
        >
            <View
                style={[
                    styles.buttonContainer,
                    {
                        height,
                        width,
                        backgroundColor,
                        borderColor,
                        borderWidth: borderColor !== 'transparent' ? 1 : 0,
                    },
                    buttonStyle,
                ]}
            >
                <View style={styles.contentWrapper}>
                    {imageSrc ? (
                        <Image
                            source={imageSrc}
                            style={[
                                {
                                    width: iconSize,
                                    height: iconSize,
                                    marginRight: text ? 12 : 0,
                                },
                                imageStyle,
                            ]}
                            resizeMode="contain"
                        />
                    ) : null}
                    {text && (
                        <Text
                            style={[
                                styles.text_style,
                                {
                                    textDecorationLine: underlineText ? 'underline' : 'none',
                                },
                                textStyle,
                            ]}
                        >
                            {text}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_style: {
        textAlign: 'center',
        fontFamily: 'EB Garamond',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        color: palette.accent.black,
    },
});

export default SocialAuthButton;
