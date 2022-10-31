import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type LeaderboardProps = {
    name: string;
    data:{rank:number, player_id:string, value:number}[]
}

export const StatLeaderboard: FC<LeaderboardProps> = ({ name, data }) => {
    return (
        <View style={styles.leaderboardBlock}>
            <View style={styles.titleBlock}>
                <Text style={styles.statTitle}>{name}</Text>
            </View>
            <View style={styles.statHeader}>
                <Text>Rank</Text>
                <Text>Player</Text>
                <Text>Value</Text>
            </View>
            <View style={styles.leaderboardList}>
                <View style={styles.statCol}>
                    {data.map((item:any) => <Text>{item.rank}</Text>)}  
                </View>
                <View style={styles.statCol}>
                    {data.map((item:any) => <Text>{item.player_id}</Text>)}  
                </View>
                <View style={styles.statCol}>
                    {data.map((item:any) =>  <Text>{item.value}</Text>)}  
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
