import { Stat } from './../../types/Stat';
import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StatsNavigationProp } from './../../types/Navigation';
import { Card } from '../misc/Card';

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
    const { colors } = useTheme();

    return (
        <Pressable onPress={() => push('Stat', { stat })}>
            <Card>
                <View style={styles.titleBlock}>
                    <Text style={[styles.statTitle, { color: colors.primary }]}>
                        {stat.name}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text
                        style={[
                            styles.colHeading,
                            styles.rowText,
                            { color: colors.text },
                        ]}
                    >
                        Rank
                    </Text>
                    <Text
                        style={[
                            styles.colHeading,
                            styles.nameText,
                            { color: colors.text },
                        ]}
                    >
                        Player
                    </Text>
                    <Text
                        style={[
                            styles.colHeading,
                            styles.rowText,
                            { color: colors.text },
                        ]}
                    >
                        Value
                    </Text>
                </View>
                <View>
                    {topFivePlayers.map((player, index) => (
                        <View
                            style={styles.row}
                            key={`${player.id}-${stat.id}`}
                        >
                            <Text
                                style={[styles.rowText, { color: colors.text }]}
                            >
                                {index}
                            </Text>
                            <Text
                                style={[
                                    styles.nameText,
                                    { color: colors.text },
                                ]}
                            >
                                {player.name}
                            </Text>
                            <Text
                                style={[styles.rowText, { color: colors.text }]}
                            >
                                {player.value}
                            </Text>
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
