import { NBA_STATS, NHL_STATS } from '@constants/stats';
import { LimitedStat } from '../types/Stat';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { StatList, SearchBox, FAB } from '@components/index';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StatsNavigationProp } from '../types/Navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { useLeague } from '@hooks/useLeague';

export const StatSelection = () => {
    // get user data and the method to update user stats
    const { authData, updateStats } = useAuth();
    const { colors } = useTheme();
    const { league } = useLeague();

    const statsList = league === 'nba' ? NBA_STATS : NHL_STATS;

    // get the navigate method
    const { navigate } = useNavigation<StatsNavigationProp>();

    const [submitting, setSubmitting] = useState<boolean>(false);

    // create state for the stats that the user currently has selected
    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData?.stats ?? []
    );

    // create state for the result of the user's search
    const [result, setResult] = useState<LimitedStat[]>([]);

    // method which updates the search results when the query changes
    const handleSearchQueryChange = useCallback(
        (query: string) => {
            if (query === '') {
                setResult([]);
                return;
            }

            const _result = statsList.filter((stat) =>
                stat.name.toLowerCase().includes(query.toLowerCase())
            );

            setResult(_result);
        },
        [statsList]
    );

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
        setSubmitting(true);

        await updateStats(selectedStats);
        navigate('Dashboard');

        setSubmitting(false);
    };

    return (
        <View style={styles.container}>
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
            {selectedStats.length >= 1 && (
                <FAB
                    onPress={handleSubmit}
                    position="right"
                    color={colors.primary}
                >
                    {!submitting ? (
                        <MaterialIcons
                            name="check"
                            size={40}
                            color={colors.text}
                        />
                    ) : (
                        <ActivityIndicator color={colors.text} />
                    )}
                </FAB>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 30,
    },
});
