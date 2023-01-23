import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { STATS } from './../constants';
import { useAuth } from '@hooks/useAuth';
import { StatsStack } from '../Navigation/StatsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatsNavigationProp } from './../types/Navigation';
import { useNavigation } from '@react-navigation/native';
import { RosterSection } from '@components/data';
import { PlayerSection } from '@components/data';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { FC } from 'react';
import { useRoute } from '@react-navigation/native';
/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rosters</Text>
            <Text>Coming Soon</Text>
        </View>
    );
};

export const RosterSelection = () => {
    <Text style={styles.text}>Favorites:</Text>
    
    return (
        <View>
        <Text style={styles.header}>Select A Team to View Rosters</Text>
        <Text style={styles.text}>Favorites:</Text>
        <Text style={styles.text}>Other Teams:</Text>
  
        <FlatList
            data={roster}
           // contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns= {3}//{Math.ceil(roster.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            
            renderItem={({ item, index }) => (
                //need to create my own version of statsection
                
                <RosterSection
                name={item.name}
                uri={item.uri}
                     
                />
            )}
            
        />
          </View>
    );
};




export const PlayerSelection = () => {
    const route = useRoute(); //got the string a to send... still lots of errors
    return (
        <View>
               <Text style={styles.text}>{route.params.foo[0].fname}</Text>
        
  
        <FlatList
            data={roster} //this now has to be passed data
           // contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns= {3}//{Math.ceil(roster.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            
            renderItem={({ item, index }) => (
                //need to create my own version of statsection
                
                <PlayerSection
                name={item.name}
                uri={item.uri}
                     
                />
            )}
            
        />
          </View>
    );
};





const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
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
        margin: 5
      }
});

//Fake roster data

//player type
//- position
//- player name
//- player image
type player = {
    fname: string;
    lname: string;
    uri: string;
 //   playerimage: String;
}
//team type
//- team name
//- team image
//- players list 
type team = {
    name: string;
    uri: string;
  //  logo: File;
    players: player[];

}
const giannis: player = {
    fname:"giannis",
    lname: "antetokpumpo",
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg'
 //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
}
const middleton: player = {
    fname:"chris",
    lname: "middelton",
    uri:'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg'
 //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
}
const bucks: team = {
    name: "bucks",
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    players: [giannis, middleton]
}

const nets: team = {
    name:"nets",
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    players: [giannis, middleton]
}

const roster: team[] = [nets, bucks,nets,bucks,nets,bucks];

