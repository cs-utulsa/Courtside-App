import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ErrorBoxProps = {
    error: string | undefined;
};

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
