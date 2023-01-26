import { useRoute } from '@react-navigation/native';
import { GameScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GameScreen = () => {
    const { params } = useRoute<GameScreenRouteProp>();
    // params.game has all the data on the games
    console.log(params.game);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Game Screen</Text>
            <Text>Game Data</Text>
            <Text>{JSON.stringify(params.game)}</Text>
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
