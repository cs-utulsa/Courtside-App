import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type FullErrorProps = {
    /** The error message that will be displayed on the screen */
    text: string;
};

/**
 * A component that displays an error message in the center of a screen.
 * This should be used when a whole page is not able to be utilized due to some error.
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
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
    },
    text: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
});
