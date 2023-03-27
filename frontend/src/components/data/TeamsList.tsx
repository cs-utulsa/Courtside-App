import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SelectCircle } from '../buttons/SelectCircle';
import { TeamIcon } from './../../types/Team';

type TeamListProps = {
    /** the title to be displayed above the list */
    title?: string;
    /** the teams within the list */
    teams: TeamIcon[];
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

export const TeamsList: FC<TeamListProps> = ({
    title,
    teams,
    addTeam,
    removeTeam,
    selected,
}) => {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.stats}>
                {teams.map((team) => (
                    <SelectCircle
                        initialState={selected.includes(team.id)}
                        url={team.icon}
                        size={tile}
                        onSelectChanged={(newStatus: boolean) => {
                            if (newStatus) addTeam(team.id);
                            else removeTeam(team.id);
                        }}
                        key={team.id}
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
