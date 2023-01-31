import { Stat } from './../../types/Stat';
import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from './../../types/Navigation';

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
        <Pressable
            style={styles.leaderboardBlock}
            onPress={() => push('Stat', { stat })}
        >
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
                    <View style={styles.row} key={`${player.id}-${stat.id}`}>
                        <Text>{index}</Text>
                        <Text>{player.name}</Text>
                        <Text>{player.value}</Text>
                    </View>
                ))}
            </View>
        </Pressable>
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
    /** styles for the text that heads each column of data */
    colHeading: {
        fontWeight: 'bold',
    },
});
