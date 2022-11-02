import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Settings = () => {
    return (
        <View style={styles.center}>
            <Text style={styles.header}>Settings</Text>
            <Text>Coming Soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});
