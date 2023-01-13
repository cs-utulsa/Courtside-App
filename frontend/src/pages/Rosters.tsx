import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rosters</Text>
            <Text>Coming Soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
    },
});
