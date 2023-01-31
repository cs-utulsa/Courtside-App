import { LimitedStat } from './../../types/Stat';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ToggleButton } from './../buttons/ToggleButton';

type StatListProps = {
    /** the title to be displayed above the list */
    title?: string;
    /** the stats within the list */
    stats: LimitedStat[];
    /** method to add stats to the user's selected stats */
    addStat: (stat: string) => void;
    /** method to remove stats from the user's selected stats */
    removeStat: (stat: string) => void;
    /** the list of currently selected stats */
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
                {stats.map((stat) => (
                    <ToggleButton
                        initial={selected.includes(stat.id)}
                        text={stat.name}
                        key={`${title}-${stat.id}`}
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
    /** styles for the list container */
    container: {
        marginHorizontal: 10,
    },
    /** styles for the title text */
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    /** styles for the lists of stats themselves */
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
