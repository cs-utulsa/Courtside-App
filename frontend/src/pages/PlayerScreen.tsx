import { PlayerScreenRouteProp } from '../types/Navigation';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from './../types/Player';

export const PlayerScreen = () => {
    const route = useRoute<PlayerScreenRouteProp>();
    const player: Player = route.params.player;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{player.name}</Text>
            <Text style={styles.text}>{player.age}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
});
