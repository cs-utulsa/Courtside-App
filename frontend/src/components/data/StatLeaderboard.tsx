import { NewStat } from './../../types/Stat';
import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export type LeaderboardProps = {
    stat: NewStat;
};

/**
 * This component displays the players with the highest value for the specified stat
 * @example
 * const _id = "statId";
 * const name = "Stat";
 * const player_id = ["Player 1", "Player 2", "Player 3"];
 * const value = [5, 3, 1]; //5 is the stat value for Player 1, 3 for Player 2, etc.
 * return <StatLeaderboard _id={_id} name={name} player_id={player_id} value={value} />
 */
export const StatLeaderboard: FC<LeaderboardProps> = ({ stat }) => {
    return (
        <View style={styles.leaderboardBlock}>
            <View style={styles.titleBlock}>
                <Text style={styles.statTitle}>{name ? name : _id}</Text>
            </View>
            <View style={styles.statHeader}>
                <Text>Rank</Text>
                <Text>Player</Text>
                <Text>Value</Text>
            </View>
            <View style={styles.leaderboardList}>
                <View style={styles.statCol}>
                    {player_id.map((item: any, index: number) => (
                        <Text key={`rank-${index}-${item}`}>{index + 1}</Text>
                    ))}
                </View>
                <View style={styles.statCol}>
                    {player_id.map((id: any, index) => (
                        <Text key={`id-${index}-${id}`}>{id}</Text>
                    ))}
                </View>
                <View style={styles.statCol}>
                    {value.map((valueNum: any, index) => (
                        <Text key={`val-${index}-${valueNum}`}>{valueNum}</Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the element containing the rest of the component */
    leaderboardBlock: {
        backgroundColor: '#DEDEDE',
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        width: '80%',
        marginVertical: 15,
    },
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
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    /** Styles for the container of the player data */
    leaderboardList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    /** Styles for the columns that display player names and the stat values of the players */
    statCol: {
        flexDirection: 'column',
    },
});
