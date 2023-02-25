import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';

import { SelectCircle } from '../buttons/SelectCircle';
import { ICONS } from '../../constants';
import { Game } from './../../types/Game';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScheduleNavigationProp } from './../../types/Navigation';

type GameProps = {
    /** The data for the game represented by this display */
    game: Game;
};

/**
 * This component displays information about a specific game including the teams and the time the game is played.
 * @example
 * // get game data from server
 * const game = data[0];
 * return <GameDisplay game={game} />
 */
export const GameDisplay: FC<GameProps> = ({ game }) => {
    const { push } = useNavigation<ScheduleNavigationProp>();
    const { colors } = useTheme();

    const awayIconUrl = ICONS.find(
        (icon) => icon.code === game.away_code
    )?.logo;

    const homeIconUrl = ICONS.find(
        (icon) => icon.code === game.home_code
    )?.logo;

    return (
        <Pressable
            style={[styles.gameBlock, { backgroundColor: colors.card }]}
            onPress={() => push('Game', { game })}
        >
            <SelectCircle url={awayIconUrl} size={100} disabled={true} />
            <View style={styles.gameData}>
                <Text style={[styles.gameTime, { color: colors.text }]}>
                    {game.game_time}
                </Text>
            </View>
            <SelectCircle url={homeIconUrl} size={100} disabled={true} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    /** Styles for the View that contains the rest of the component */
    gameBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
