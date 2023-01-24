import { CircleImage, PlayerSection } from '@components/index';
import { useRoute } from '@react-navigation/native';
import { PlayersScreenRouteProp } from '../types/Navigation';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { FullPlayer } from '../types/Player';

export const TeamScreen = () => {
    const route = useRoute<PlayersScreenRouteProp>();
    const players: FullPlayer[] = route.params.p;

    return (
        <View>
            <FlatList
                data={players} //this now has to be passed data
                numColumns={3} //{Math.ceil(roster.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <PlayerSection player={item} />}
                ListHeaderComponent={
                    <>
                        <CircleImage url={route.params.u} size={150} />
                        <Text style={styles.headerText}>{route.params.n}</Text>
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
