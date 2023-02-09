import { PlayerScreenRouteProp } from '../types/Navigation';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from './../types/Player';
import { CircleImage } from '@components/index';

/**
 * This screen shows the data for one player.
 * The player data is passed through a navigation parameter
 */
export const PlayerScreen = () => {
    const route = useRoute<PlayerScreenRouteProp>();
    const player: Player = route.params.player;

    return (
        <View style={styles.container}>
            <CircleImage
                url={player.headshot}
                size={150}
                resizeMode="cover"
                imageRatio={0.9}
            />
             <Text style={styles.text}>{player.name}</Text>
             <Text style={styles.text}>{player.team}</Text>
            
            <View style={styles.leaderboardBlock}>
           <View> 
            <Text style={styles.text}>Position:</Text>
             <Text style={styles.listtext}>{player.position}</Text>
             <Text style={styles.text}>Height:</Text>
            <Text style={styles.listtext}> {player.height}</Text>
            <Text style={styles.text}>Weight:</Text>
            <Text style={styles.listtext}> {player.weight}</Text>
            <Text style={styles.text}>Age:</Text>
            <Text style={styles.listtext}> {player.age}</Text>
            </View>

            <View style={styles.statstwo}>
            <Text style={styles.text}>Jersey No. : </Text>
            <Text style={styles.listtext}> {player.number}</Text>
            <Text style={styles.text}>Career: </Text>
            <Text style={styles.listtext}> {player.experience}</Text>
            <Text style={styles.text}>Draft Pick:</Text>
            <Text style={styles.listtext}> {player.draft}</Text>
            <Text style={styles.text}>Country:</Text>
            <Text style={styles.listtext}> {player.country}</Text>
            
            </View>
           </View>
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
       // textAlign: '',
        fontWeight: 'bold',
        margin: 5,
    }, 
    statstwo: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginLeft: 60,
    }, 
    listtext: {
        fontSize: 20,
       // textAlign: '',
      //  fontWeight: 'bold',
        margin: 5,
    },  
      leaderboardBlock: {
        flexDirection: 'row',
        backgroundColor: '#DEDEDE',
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        width: '90%',
        marginVertical: 15,
    },
});
