import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

type TextProps = {
    children: string;
    size?: 'heading' | 'subheading' | 'regular' | 'small';
    color?: 'primary' | 'regular';
};

export const Text: FC<TextProps> = ({ children, color = 'regular' }) => {
    const { colors } = useTheme();

    const colorStyle =
        color === 'primary'
            ? { color: colors.primary }
            : { color: colors.text };

    const sizeStyle = { fontSize: 16 };

    return (
        <RNText style={[styles.text, colorStyle, sizeStyle]}>{children}</RNText>
    );
};

const styles = StyleSheet.create({
    text: {},
});
