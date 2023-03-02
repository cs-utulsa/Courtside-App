import { useRoute } from '@react-navigation/native';
import { GameScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectCircle, ThemeText } from '@components/index';
import { ICONS } from '../constants';
import { GameScorePrediction } from '@components/data/GameScorePrediction';

/**
 * This screen shows information for a specific game.
 *
 * The data for the game is passed through a navigation parameter
 */
export const GameScreen = () => {
    const { params } = useRoute<GameScreenRouteProp>();
    // params.game has all the data on the games

    const awayIconUrl = ICONS.find(
        (icon) => icon.code === params.game.away_code
    )?.logo;

    const homeIconUrl = ICONS.find(
        (icon) => icon.code === params.game.home_code
    )?.logo;

    const date = params.game.game_date as string;

    return (
        <View style={styles.container}>
            <ThemeText style={styles.arena}>{params.game.arena}</ThemeText>
            <View style={styles.gameBlock}>
                <View style={styles.codeGame}>
                    <SelectCircle
                        url={awayIconUrl}
                        size={100}
                        disabled={true}
                    />
                    <ThemeText style={styles.teamCodeAway}>
                        {params.game.away_code}
                    </ThemeText>
                </View>
                <ThemeText style={styles.time}>
                    {date.replace(/[=]/g, '')}
                    {'\n'}
                    {params.game.game_time}
                </ThemeText>
                <View style={styles.codeGame}>
                    <SelectCircle
                        url={homeIconUrl}
                        size={100}
                        disabled={true}
                    />
                    <ThemeText style={styles.teamCodeHome}>
                        {params.game.home_code}
                    </ThemeText>
                </View>
            </View>
            <GameScorePrediction
                teams={[params.game.home_code, params.game.away_code]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    codeGame: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    gameBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
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
    },
});
