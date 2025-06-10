
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import palette from "../../utils/colors.ts";


interface BottomBorderInputProps extends TextInputProps {
    initialValue?: string;
    onTextChange?: (text: string) => void;
    onInputStateChange?: (isFilled: boolean) => void;
    hintText?: string;
}

const BottomBorderInput: React.FC<BottomBorderInputProps> = ({
                                                                 initialValue = '',
                                                                 onTextChange,
                                                                 onInputStateChange,
                                                                 hintText,
                                                                 ...restProps
                                                             }) => {
    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>(initialValue);

    useEffect(() => {
        const focusTimeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(focusTimeout);
    }, []);

    useEffect(() => {
        const isFilled = value.trim().length > 0;
        onInputStateChange?.(isFilled);
    }, [value, onInputStateChange]);

    const handleTextChange = (text: string) => {
        setValue(text);
        onTextChange?.(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={[styles.input, value ? styles.filledInput : null]}
                placeholder={hintText}
                placeholderTextColor={palette.accent.dark}
                value={value}
                onChangeText={handleTextChange}
                selectionColor="#007BFF"
                {...restProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 5,
    },
    input: {
        height: 40,
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: palette.primary.dark,
        color: palette.accent.dark,
        fontFamily: 'EB Garamond',
    },
    filledInput: {
        color: '#59594C',
        fontWeight: '400',
        fontFamily: 'EB Garamond',
    },
});

export default BottomBorderInput;
