import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export type LeaderboardProps = {
    _id: string;
    name?: string;
    player_id: string[];
    value: number[];
};

export const StatLeaderboard: FC<LeaderboardProps> = ({
    _id,
    player_id,
    value,
    name,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const playersLimitFive = player_id.slice(0, 5);
    const valueLimitFive = value.slice(0, 5);

    if (!open) {
        return (
            <Pressable
                onPress={() => setOpen(true)}
                style={styles.leaderboardBlock}
            >
                <View style={styles.titleBlock}>
                    <Text style={styles.statTitle}>{name ? name : _id}</Text>
                </View>
                <View style={styles.leaderboardList}>
                    <View style={styles.statCol}>
                        <Text>{playersLimitFive[0]}</Text>
                    </View>
                    <View style={styles.statCol}>
                        <Text>{valueLimitFive[0]}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.leaderboardBlock}>
            <Pressable onPress={() => setOpen(false)}>
                <View style={styles.titleBlock}>
                    <Text style={styles.statTitle}>{name ? name : _id}</Text>
                </View>
                <View style={styles.statHeader}>
                    <Text>Rank</Text>
                    <Text>Player</Text>
                    <Text>Value</Text>
                </View>
            </Pressable>
            <View style={styles.leaderboardList}>
                <View style={styles.statCol}>
                    {playersLimitFive.map((item: any, index: number) => (
                        <Text key={`rank-${index}-${item}`}>{index + 1}</Text>
                    ))}
                </View>
                <View style={styles.statCol}>
                    {playersLimitFive.map((id: any, index) => (
                        <Text key={`id-${index}-${id}`}>{id}</Text>
                    ))}
                </View>
                <View style={styles.statCol}>
                    {valueLimitFive.map((valueNum: any, index) => (
                        <Text key={`val-${index}-${valueNum}`}>{valueNum}</Text>
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
