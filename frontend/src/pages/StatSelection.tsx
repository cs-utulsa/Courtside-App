import { STATS } from '@constants/stats';
import { LimitedStat } from '../types/Stat';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { PrimaryButton, StatList, SearchBox } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from '../types/Navigation';

export const StatSelection = () => {
    // get user data and the method to update user stats
    const { authData, updateStats } = useAuth();

    // get the navigate method
    const { navigate } = useNavigation<StatsNavigationProp>();

    // create state for the stats that the user currently has selected
    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData?.stats ?? []
    );

    // create state for the result of the user's search
    const [result, setResult] = useState<LimitedStat[]>([]);

    // method which updates the search results when the query changes
    const handleSearchQueryChange = useCallback((query: string) => {
        if (query === '') {
            setResult([]);
            return;
        }

        const _result = STATS.filter((stat) =>
            stat.name.toLowerCase().includes(query.toLowerCase())
        );

        setResult(_result);
    }, []);

    // method to add a stat
    const addStat = (stat: string) => {
        setSelectedStats([...selectedStats, stat]);
    };

    // method to remove a stat
    const removeStat = (stat: string) => {
        setSelectedStats(
            selectedStats.filter((selectedItem) => selectedItem !== stat)
        );
    };

    // method to update stats on server when user updates
    const handleSubmit = async () => {
        await updateStats(selectedStats);
        navigate('Dashboard');
    };

    return (
        <View style={styles.container}>
            <PrimaryButton onPress={handleSubmit} text="Update Stats" />
            <SearchBox
                placeholder="Search for stats"
                onChange={handleSearchQueryChange}
            />
            <StatList
                stats={result}
                selected={selectedStats}
                addStat={addStat}
                removeStat={removeStat}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});
