import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type SmallLinkProps = {
    /** This function is called when the link is clicked on */
    onPress: () => void;
    /** The link text */
    text: string;
};

/**
 * A small link which displays the given text with an underline.
 * @example
 * const text = "Account Page";
 * const onPress = () => navigate("Account Page");
 * return <SmallLink text={text} onPress={onPress} />
 */
export const SmallLink: FC<SmallLinkProps> = ({ onPress, text }) => {
    const { colors } = useTheme();

    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    /** Styles for the button component */
    pressable: {
        marginTop: 20,
        padding: 15,
    },
    /** Styles for the text of the link */
    text: {
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});
