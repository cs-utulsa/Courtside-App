import { PlayerSection } from '@components/data';
import { useRoute } from '@react-navigation/native';
import { PlayersScreenRouteProp } from './../types/Navigation';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { Player } from './../types/Player';

export const TeamPlayers = () => {
    const route = useRoute<PlayersScreenRouteProp>(); //got the string a to send... still lots of errors
    const playahs: Player[] = route.params.p;

    return (
        //could add undefined type to catch the error if no data was sent!e
        <View>
            <Text style={styles.text}>{route.params.n}</Text>
            <Image
                source={{ uri: route.params.u }}
                style={styles.circleImageLayout}
                resizeMode={'cover'}
            />

            <FlatList
                data={playahs} //this now has to be passed data
                numColumns={3} //{Math.ceil(roster.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <PlayerSection
                        fname={item.fname}
                        uri={item.uri}
                        stats={item.stats}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
    circleImageLayout: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: 'grey',
        borderWidth: 2,
    },
});
