import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ERROR_TEXT } from '@styles/colors';

type FullErrorProps = {
    /** The error message that will be displayed on the screen */
    text: string;
};

/**
 * A component that displays an error message in the center of a screen.
 * This should be used when a whole page is not able to be utilized due to some error.
 *
 * @component
 * @example
 * const message = "There is an error";
 * return <FullError text={message} />
 */
export const FullError: FC<FullErrorProps> = ({ text }) => {
    return (
        <View style={styles.container}>
            <AntDesign name="exclamationcircle" size={32} color="red" />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the container of the error message */
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
    },
    /** Styles for the text of the error message */
    text: {
        color: ERROR_TEXT,
        fontSize: 16,
        marginTop: 10,
    },
});
