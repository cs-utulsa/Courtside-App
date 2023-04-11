import React from 'react';
import { useLeague } from '@hooks/useLeague';
import { Pressable, StyleSheet, Text } from 'react-native';

export const SwitchLeagues = () => {
    const { league, setLeague } = useLeague();

    const handlePress = () => {
        if (league === 'nba') setLeague('nhl');
        else setLeague('nba');
    };

    return (
        <Pressable onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>{league.toUpperCase()}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 20,
        padding: 5,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
    },
    buttonText: {},
});
