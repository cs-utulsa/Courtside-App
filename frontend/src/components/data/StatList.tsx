import { LimitedStat } from './../../types/Stat';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type StatListProps = {
    title: string;
    stats: LimitedStat[];
};

export const StatList: FC<StatListProps> = ({ title, stats }) => {
    console.log(stats);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.stats}>
                <Text>Item</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
