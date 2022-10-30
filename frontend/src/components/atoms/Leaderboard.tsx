import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { FC } from 'react';

type statProps = {
    rank: number[];
    player_id: string[];
    value: number[];
}

type LeaderBoardProps = {
    title: string;
    data: statProps;
}

export const Leaderboard: FC<LeaderBoardProps> = ({ title, data }) => {
    return (
        <View style={styles.leaderboardBlock}>
            <FlatList 
                style={styles.statItem}
                data={data} // need to fix, change to table
                renderItem={({ item, index }) => (
                    <View style={styles.statItem}>
                        <Text>{item.rank}</Text>
                        <Text>{item.player_id}</Text>
                        <Text>{item.value}</Text>
                    </View>
                )}
                numColumns={3}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => (
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>{title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    leaderboardBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE',
        padding: 10,
        marginHorizontal: 20,
    },
    statTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignContent: 'center',
    },
    statItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContainer: {
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
});
