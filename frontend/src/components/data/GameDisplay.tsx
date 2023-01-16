import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';

import { SelectCircle } from '../buttons/SelectCircle';
import { ICONS } from '../../constants';
import { Game } from './../../types/Game';

type GameProps = {
    /** The data for the game represented by this display */
    game: Game;
};

/**
 * This component displays information about a specific game including the teams and the time the game is played.
 */
export const GameDisplay: FC<GameProps> = ({ game }) => {
    const awayIconUrl = ICONS.find(
        (icon) => icon.code === game.away_code
    )?.logo;

    const homeIconUrl = ICONS.find(
        (icon) => icon.code === game.home_code
    )?.logo;

    return (
        <View style={styles.gameBlock}>
            <SelectCircle url={awayIconUrl} size={100} disabled={true} />
            <View style={styles.gameData}>
                <Text style={styles.gameTime}>{game.game_time}</Text>
            </View>
            <SelectCircle url={homeIconUrl} size={100} disabled={true} />
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the View that contains the rest of the component */
    gameBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    /** Styles for the column of data between the icons for the two teams */
    gameData: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    /** Styles for the text that displays the game time */
    gameTime: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
