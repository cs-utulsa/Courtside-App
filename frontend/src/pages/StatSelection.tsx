import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { STATS } from './../constants';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from './../types/Navigation';
import { StatSection } from '@components/data';
import { PrimaryButton } from '@components/buttons/PrimaryButton';

export const StatSelection = () => {
    const { navigate } = useNavigation<StatsNavigationProp>();
    const { authData, updateStats } = useAuth();
    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData!.stats!
    );

    const onSubmit = async () => {
        await updateStats(selectedStats);
        navigate('Dashboard');
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
        <FlatList
            data={STATS}
            ListHeaderComponent={<PrimaryButton onPress={onSubmit} />}
            renderItem={({ item, index }) => (
                <StatSection
                    title={item.title}
                    data={item.data}
                    selectedStats={selectedStats}
                    addStat={addStat}
                    removeStat={removeStat}
                    key={`stat-section-${index}`}
                />
            )}
        />
    );
};
