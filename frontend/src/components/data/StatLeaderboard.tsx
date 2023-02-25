import { Stat } from './../../types/Stat';
import React, { FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from './../../types/Navigation';
import { Card } from '../misc/Card';
import { ThemeText } from '../misc/ThemeText';

export type LeaderboardProps = {
    /** the stat to be displayed on this leaderboard */
    stat: Stat;
};

/**
 * This component displays the players with the highest value for the specified stat
 */
export const StatLeaderboard: FC<LeaderboardProps> = ({ stat }) => {
    const topFivePlayers = stat.total.players.slice(0, 5);

    const { push } = useNavigation<StatsNavigationProp>();

    return (
        <Pressable onPress={() => push('Stat', { stat })}>
            <Card>
                <View style={styles.titleBlock}>
                    <ThemeText style={[styles.statTitle]} primary>
                        {stat.name}
                    </ThemeText>
                </View>
                <View style={styles.row}>
                    <ThemeText style={[styles.colHeading, styles.rowText]}>
                        Rank
                    </ThemeText>
                    <ThemeText style={[styles.colHeading, styles.nameText]}>
                        Player
                    </ThemeText>
                    <ThemeText style={[styles.colHeading, styles.rowText]}>
                        Value
                    </ThemeText>
                </View>
                <View>
                    {topFivePlayers.map((player, index) => (
                        <View
                            style={styles.row}
                            key={`${player.id}-${stat.id}`}
                        >
                            <ThemeText style={[styles.rowText]}>
                                {index}
                            </ThemeText>
                            <ThemeText style={[styles.nameText]}>
                                {player.name}
                            </ThemeText>
                            <ThemeText style={[styles.rowText]}>
                                {player.value}
                            </ThemeText>
                        </View>
                    ))}
                </View>
            </Card>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    /** Styles for the element containing the rest of the component */
    leaderboardBlock: {},
    /** Styles for the container of the stat title text */
    titleBlock: {
        alignItems: 'center',
    },
    /** Styles for the text displaying the name of the stat */
    statTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    /** Styles for the header which states what each row of the leaderboard is */
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    /** styles for the text that heads each column of data */
    colHeading: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rowText: {
        width: '15%',
        textAlign: 'center',
    },
    nameText: {
        width: '70%',
        textAlign: 'center',
    },
});
