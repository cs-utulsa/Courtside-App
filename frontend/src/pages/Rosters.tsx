import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../navigation/types';
import { NavBar } from '../components/atoms';

export const Rosters = () => {
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Rosters</Text>
            </View>
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
