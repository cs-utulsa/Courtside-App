import { LimitedStat } from './../../types/Stat';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ToggleButton } from '@components/buttons';

type StatListProps = {
    title?: string;
    stats: LimitedStat[];
    addStat: (stat: string) => void;
    removeStat: (stat: string) => void;
    selected: string[];
};

export const StatList: FC<StatListProps> = ({
    title,
    stats,
    addStat,
    removeStat,
    selected,
}) => {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.stats}>
                {stats.map((stat, index) => (
                    <ToggleButton
                        initial={selected.includes(stat.id)}
                        text={stat.name}
                        key={`${title}-stat-${index}`}
                        onToggle={(on: boolean) => {
                            if (on) addStat(stat.id);
                            else removeStat(stat.id);
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
