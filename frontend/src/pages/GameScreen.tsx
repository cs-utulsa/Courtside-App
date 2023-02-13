import { useRoute } from '@react-navigation/native';
import { GameScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectCircle } from '@components/index';

/**
 * This screen shows information for a specific game.
 *
 * The data for the game is passed through a navigation parameter
 */
export const GameScreen = () => {
    const { params } = useRoute<GameScreenRouteProp>();
    // params.game has all the data on the games
    console.log(params.game)
    return (
        <View style={styles.container}>
            <SelectCircle url={params.game.away_link} size={100} disabled={true} />
            <Text style = {styles.gameInfo}>{params.game.game_time}\n{params.game.arena} </Text>
            <SelectCircle url={params.game.home_link} size={100} disabled = {true} />
            <Text style={styles.heading}>Game Screen</Text>
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
    gameInfo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
