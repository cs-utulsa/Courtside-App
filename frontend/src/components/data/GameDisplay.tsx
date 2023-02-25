import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';

import { SelectCircle } from '../buttons/SelectCircle';
import { ICONS } from '../../constants';
import { Game } from './../../types/Game';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScheduleNavigationProp } from './../../types/Navigation';
import { Card } from '../misc/Card';

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
        <Pressable onPress={() => push('Game', { game })}>
            <Card>
                <View style={styles.gameBlock}>
                    <SelectCircle
                        url={awayIconUrl}
                        size={100}
                        disabled={true}
                    />
                    <View style={styles.gameData}>
                        <Text style={[styles.gameTime, { color: colors.text }]}>
                            {game.game_time}
                        </Text>
                    </View>
                    <SelectCircle
                        url={homeIconUrl}
                        size={100}
                        disabled={true}
                    />
                </View>
            </Card>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    /** Styles for the View that contains the rest of the component */
    gameBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
