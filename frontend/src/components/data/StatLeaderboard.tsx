import { NewStat } from './../../types/Stat';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    const topFivePlayers = stat.total.players.slice(0, 5);

    return (
        <View style={styles.leaderboardBlock}>
            <View style={styles.titleBlock}>
                <Text style={styles.statTitle}>{stat.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.colHeading}>Rank</Text>
                <Text style={styles.colHeading}>Player</Text>
                <Text style={styles.colHeading}>Value</Text>
            </View>
            <View>
                {topFivePlayers.map((player, index) => (
                    <View style={styles.row}>
                        <Text>{index}</Text>
                        <Text>{player.name}</Text>
                        <Text>{player.value}</Text>
                    </View>
                ))}
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colHeading: {
        fontWeight: 'bold',
    },
});
