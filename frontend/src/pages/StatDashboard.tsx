import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Leaderboard, NavBar } from '../components/atoms';

const DATA = [
    {
        title: 'VORP',
        data: {
            rank: [1, 2, 3, 4, 5],
            player_id: ['jokicni01', 'antetgi01', 'embiijo01', 'doncilu01', 'jamesle01'],
            value: [9.8, 7.4, 6.5, 5.9, 5.1],
        }
    },
    {
        title: 'eFG%',
        data: {
            rank: [1, 2, 3, 4, 5],
            player_id: ['goberru01', 'allenja01', 'harremo01', 'aytonde01', 'zubaciv01'],
            value: [0.713, 0.678, 0.649, 0.639, 0.626],
        }
    }
]

export const StatDashboard = () => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={DATA}
                renderItem={({ item, index }) => (
                    <Leaderboard
                        title={item.title}
                        data={item.data}
                        key={`leaderboard-${index}`}
                    />
                )}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => (
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Stat Dashboard</Text>
                    </View>
                )}
            />
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
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
