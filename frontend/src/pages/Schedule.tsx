import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../navigation/types';
import { Game, NavButton } from '../components/atoms';

const DATA = [
    {
        date: '11-21-2022',
        time: '8:00p',
        away: 'NYK',
        home: 'OKC',
    },
    {
        date: '11-21-2022',
        time: '10:30p',
        away: 'UTA',
        home: 'LAC',
    },
    {
        date: '11-21-2022',
        time: '8:00p',
        away: 'GSW',
        home: 'NOP',
    },
];

export const Schedule = () => {
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    // const [data, setData] = useState({
    //     roster: [],
    // });

    // useEffect(() => {
    //     fetch("/roster/OKC").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData({
    //                 roster: data.roster,
    //             })
    //         }
    //     )
    // }, [])

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={DATA}
                renderItem={({ item, index }) => (
                    <Game
                        date={item.date}
                        time={item.time}
                        away={item.away}
                        home={item.home}
                        key={`game-${index}`}
                    />
                )}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => (
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Schedule</Text>
                    </View>
                )}
            />
            <View style={styles.navBar}>                
                <NavButton
                    type='schedule'
                    onPress={() => navigate('Schedule')}
                />
                <NavButton 
                    type='teams'
                    onPress={() => navigate('Rosters')}
                />            
                <NavButton 
                    type='stats'
                    onPress={() => navigate('StatDashboard')}
                />             
                <NavButton 
                    type='settings'
                    onPress={() => navigate('FavoriteTeams')}
                />                    
            </View>

            {/* {(data.roster.length === 0) ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {data.roster.map((player, index) => (
                        <Text key={`player-${index}`}>{player}</Text>
                    ))}
                </View>
            )} */}
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
    list: {
        flex: 0.85,
    },
    navBar: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#BFF3FF',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 10,
        borderTopColor: '#DEDEDE',
        borderTopWidth: 2,
    },
});
