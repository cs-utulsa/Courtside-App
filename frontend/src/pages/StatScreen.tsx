import { useRoute } from '@react-navigation/native';
import { StatScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * This screen shows the full leaderboard for a specific stat for each of the three modes: per48, per game, and total
 * The stat data is passed through a navigation parameter.
 */
export const StatScreen = () => {
    const { params } = useRoute<StatScreenRouteProp>();
    // params.stat includes all of the stat data
    console.log(params.stat);

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
