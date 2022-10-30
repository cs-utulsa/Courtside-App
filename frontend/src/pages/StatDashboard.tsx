import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../navigation/types';
import { NavButton } from '../components/atoms';

export const StatDashboard = () => {
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Stat Dashboard</Text>
            </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
    },
    headerContainer: {
        flex: 0.85,
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
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
