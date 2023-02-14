import { useRoute } from '@react-navigation/native';
import { GameScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {SelectCircle} from './../components/index';
import { ICONS } from '../constants';

/**
 * This screen shows information for a specific game.
 *
 * The data for the game is passed through a navigation parameter
 */
export const GameScreen = () => {
    const { params } = useRoute<GameScreenRouteProp>();
    // params.game has all the data on the games
    console.log(params.game);

    const awayIconUrl = ICONS.find(
        (icon) => icon.code === params.game.away_code
    )?.logo;

    const homeIconUrl = ICONS.find(
        (icon) => icon.code === params.game.home_code
    )?.logo;

    var date = JSON.stringify(params.game.game_date);
    date = date.substring(2, date.length-1);
    return (
        <View style = {styles.container}>
            <Text style = {styles.arena}>{params.game.arena}</Text>
            <View style = {styles.gameBlock}>
                <View style = {styles.codeGame}>
                    <SelectCircle url = {awayIconUrl} size = {100} disabled = {true} />
                    <Text style = {styles.teamCodeAway}>{params.game.away_code}</Text>
                </View>
                <Text style = {styles.time}>{date}{"\n"}{params.game.game_time}</Text>
                <View style = {styles.codeGame}>
                    <SelectCircle url = {homeIconUrl} size = {100} disabled = {true} />
                    <Text style = {styles.teamCodeHome}>{params.game.home_code}</Text>
                </View>
                
                
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    codeGame: {
        flexDirection: 'column',
        justifyContent:'center',
        alignContent: 'center',
    },
    gameBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 25,
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    },
    arena: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    },
    teamCodeAway: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginLeft: 28,
    },
    teamCodeHome: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginLeft: 28,
    }
});
