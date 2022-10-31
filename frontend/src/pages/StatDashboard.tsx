import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StatLeaderboard } from '../components/atoms';

const DATA = [
    {
        title: 'VORP',
        data: [
            { rank: 1, player_id: 'jokicni01', value: 9.8 },
            { rank: 2, player_id: 'antetgi01', value: 7.4 },
            { rank: 3, player_id: 'embiijo01', value: 6.5 },
            { rank: 4, player_id: 'doncilu01', value: 5.9 },
            { rank: 5, player_id: 'jamesle01', value: 5.1 },
        ],
    },
    {
        title: 'PER',
        data: [
            { rank: 1, player_id: 'jokicni01', value: 32.8 },
            { rank: 2, player_id: 'antetgi01', value: 32.1 },
            { rank: 3, player_id: 'embiijo01', value: 31.2 },
            { rank: 4, player_id: 'jamesle01', value: 26.2 },
            { rank: 5, player_id: 'duranke01', value: 25.6 },
        ],
    },
];

export const StatDashboard = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item, index }) => (
                    <StatLeaderboard
                        name={item.title}
                        data={item.data}
                        key={`leaderboard-${index}`}
                    />
                )}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
    },
});
