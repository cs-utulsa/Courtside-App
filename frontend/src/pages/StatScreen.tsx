import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Stat Screen</Text>
            <Text>Stat Data</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 100,
    },
});
