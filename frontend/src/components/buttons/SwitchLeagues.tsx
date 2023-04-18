import React from 'react';
import { useLeague } from '@hooks/useLeague';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const SwitchLeagues = () => {
    const { league, setLeague } = useLeague();
    const { colors } = useTheme();

    const handlePress = () => {
        if (league === 'nba') setLeague('nhl');
        else setLeague('nba');
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.button, { borderColor: colors.text }]}
        >
            <Text style={[styles.buttonText, { color: colors.text }]}>
                {league.toUpperCase()}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 20,
        padding: 5,
        borderWidth: 2,
        borderRadius: 15,
    },
    buttonText: {},
});
