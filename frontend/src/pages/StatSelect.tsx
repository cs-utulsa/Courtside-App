import { StatList } from '@components/data/StatList';
import { SearchBox } from '@components/misc/SearchBox';
import { NEW_STATS } from '@constants/stats';
import { LimitedStat } from './../types/Stat';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import { useAuth } from '@hooks/useAuth';

export const StatSelect = () => {
    const { authData } = useAuth();

    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData?.stats ?? []
    );
    const [result, setResult] = useState<LimitedStat[]>([]);

    const handleSearchQueryChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const query = e.nativeEvent.text;

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

    return (
        <View style={styles.container}>
            <Text>Choose Stats</Text>
            <SearchBox
                placeholder="Search for stats"
                onChange={handleSearchQueryChange}
            />
            <StatList
                title="Results"
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
