import { CircleImage, PlayerSection } from '@components/index';
import { useRoute } from '@react-navigation/native';
import { TeamScreenRouteProp } from '../types/Navigation';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';

/**
 * This screen shows the data for a specific team as well as a roster of the players.
 * The team data is passed through a navigation parameter.
 */
export const TeamScreen = () => {
    const route = useRoute<TeamScreenRouteProp>();
    const team = route.params.team;

    return (
        <View>
            <FlatList
                data={team.players}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <PlayerSection player={item} />}
                ListHeaderComponent={
                    <>
                        <CircleImage url={team.icon} size={150} />
                        <Text style={styles.headerText}>{team.name}</Text>
                    </>
                }
                ListHeaderComponentStyle={styles.headerContainer}
                contentContainerStyle={styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
});
