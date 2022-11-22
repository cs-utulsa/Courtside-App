import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// type LeaderboardProps = {
//     name: string;
//     data: { rank: number; player_id: string; value: number }[];
// };

export type LeaderboardProps = {
    _id: string;
    player_id: string[];
    value: number[];
};

export const StatLeaderboard: FC<LeaderboardProps> = ({
    _id,
    player_id,
    value,
}) => {
    return (
        <View style={styles.leaderboardBlock}>
            <View style={styles.titleBlock}>
                <Text style={styles.statTitle}>{_id}</Text>
            </View>
            <View style={styles.statHeader}>
                {/* <Text>Rank</Text> */}
                <Text>Player</Text>
                <Text>Value</Text>
            </View>
            <View style={styles.leaderboardList}>
                {/* <View style={styles.statCol}>
                    {data.map((item: any, index: number) => (
                        <Text key={`rank-${index}-${item.player_id}`}>
                            {item.rank}
                        </Text>
                    ))}
                </View> */}
                <View style={styles.statCol}>
                    {player_id.map((item: any, index) => (
                        <Text key={`id-${index}-${item.player_id}`}>
                            {item}
                        </Text>
                    ))}
                </View>
                <View style={styles.statCol}>
                    {value.map((item: any, index) => (
                        <Text key={`val-${index}-${item.player_id}`}>
                            {item}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    leaderboardBlock: {
        backgroundColor: '#DEDEDE',
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        width: '80%',
        marginVertical: 15,
    },
    titleBlock: {
        alignItems: 'center',
    },
    statTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leaderboardList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCol: {
        flexDirection: 'column',
    },
});
