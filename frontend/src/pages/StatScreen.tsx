import { useRoute } from '@react-navigation/native';
import { StatScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeText } from '@components/index';

/**
 * This screen shows the full leaderboard for a specific stat for each of the three modes: per48, per game, and total
 * The stat data is passed through a navigation parameter.
 */
export const StatScreen = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { params } = useRoute<StatScreenRouteProp>();
    // params.stat includes all of the stat data

    return (
        <View style={styles.container}>
            <ThemeText style={styles.heading}>Stat Screen</ThemeText>
            <ThemeText>Stat Data</ThemeText>
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
