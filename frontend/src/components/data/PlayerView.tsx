import { FullPlayer } from './../../types/Player';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PlayerViewProps = {
    player: FullPlayer;
};

export const PlayerView: FC<PlayerViewProps> = ({ player }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{player.name}</Text>

            <Text style={styles.text}>{player.age}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    circleImageLayout: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: 'grey',
        borderWidth: 2,
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        margin: 5,
    },
});
