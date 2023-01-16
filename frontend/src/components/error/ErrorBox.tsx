import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ErrorBoxProps = {
    /** The error message */
    error: string | undefined;
};

/**
 * This component displays an error message in a red box
 *
 * @component
 * @example
 * const message = "There was an error";
 * return <ErrorBox error={message} />
 */
export const ErrorBox: FC<ErrorBoxProps> = ({ error }) => {
    if (error) {
        return (
            <View style={styles.authErrorBox}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    authErrorBox: {
        backgroundColor: '#ffcfcd',
        width: '75%',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
    },
});
