import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SelectCircle } from '../buttons/SelectCircle';
import { playerIcon } from './../../types/player';

type PlayerListProps = {
    /** the title to be displayed above the list */
    title?: string;
    /** the teams within the list */
    players: playerIcon[];
    /** method to add teams to the user's selected stats */
    addTeam: (stat: string) => void;
    /** method to remove teams from the user's selected stats */
    removeTeam: (stat: string) => void;
    /** the list of currently selected teams */
    selected: string[];
};

const screenWidth = Dimensions.get('window').width - 20;
const numColumns = 3;
const tile = screenWidth / numColumns;

export const PlayersList: FC<PlayerListProps> = ({
    title,
    players,
    addTeam,
    removeTeam,
    selected,
}) => {
    return ( 
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.stats}>
                { players && players.map((player) => (
                    <SelectCircle
                        initialState={selected.includes(player.id)}
                        url={player.headshot}
                        size={tile}
                        onSelectChanged={(newStatus: boolean) => {
                            if (newStatus) addTeam(player.id);
                            else removeTeam(player.id);
                        }}
                        key={player.id}
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
