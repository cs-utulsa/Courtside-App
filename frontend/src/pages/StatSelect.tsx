import { StatList } from '@components/data/StatList';
import { SearchBox } from '@components/misc/SearchBox';
import { NEW_STATS } from '@constants/stats';
import { LimitedStat } from './../types/Stat';
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { PrimaryButton } from '@components/buttons';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from './../types/Navigation';

export const StatSelect = () => {
    const { authData, updateStats } = useAuth();
    const { navigate } = useNavigation<StatsNavigationProp>();

    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData?.stats ?? []
    );
    const [result, setResult] = useState<LimitedStat[]>([]);

    const handleSearchQueryChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const query = e.nativeEvent.text;

        if (query === '') {
            setResult([]);
            return;
        }

        const _result = NEW_STATS.filter((stat) =>
            stat.name.toLowerCase().includes(query.toLowerCase())
        );

        setResult(_result);
    };

    const addStat = (stat: string) => {
        setSelectedStats([...selectedStats, stat]);
    };

    const removeStat = (stat: string) => {
        setSelectedStats(
            selectedStats.filter((selectedItem) => selectedItem !== stat)
        );
    };

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
