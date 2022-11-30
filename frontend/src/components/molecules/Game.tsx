import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';

import { SelectCircle } from '../atoms';
import { ICONS } from '../../constants';

type GameProps = {
    date?: string;
    time: string;
    away: string;
    home: string;
};

export const Game: FC<GameProps> = ({ time, away, home }) => {
    return (
        <View style={styles.gameBlock}>
            <SelectCircle
                url={ICONS.find((icon) => icon.code === away)?.logo}
                size={100}
                disabled={true}
            />
            <View style={styles.gameData}>
                <Text style={styles.gameTime}>{time}</Text>
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
        marginVertical: 10,
    },
    gameData: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameTime: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
