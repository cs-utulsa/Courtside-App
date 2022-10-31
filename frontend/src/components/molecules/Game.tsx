import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';

import { SelectCircle } from '../atoms';
import { ICONS } from '../../constants';

type GameProps = {
    date: string;
    time: string;
    away: string;
    home: string;
};

export const Game: FC<GameProps> = ({ date, time, away, home }) => {
    return (
        <View style={styles.gameBlock}>
            <SelectCircle
                url={ICONS.find((icon) => icon.code === away)?.logo}
                size={100}
                disabled={true}
            />
            <View style={styles.gameData}>
                <Text>{date}</Text>
                <Text>{time}</Text>
                <Text>{away}</Text>
                <Text>{home}</Text>
            </View>
            <SelectCircle
                url={ICONS.find((icon) => icon.code === home)?.logo}
                size={100}
                disabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gameBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 20,
    },
    gameData: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
