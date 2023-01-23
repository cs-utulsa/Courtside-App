import { View, StyleSheet, Text, Image } from 'react-native';
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
import { PlayerView } from '@components/data';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { FC } from 'react';
import { useRoute } from '@react-navigation/native';
import { RosterNavigationProp, RosterNavigatorParamList  } from './../types/Navigation';
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
                players={item.players}
                     
                />
            )}
            
        />
          </View>
    );
};




export const PlayerSelection = () => {
    const route = useRoute(); //got the string a to send... still lots of errors
    const playahs:player[] = route.params.p;
    return ( //could add undefined type to catch the error if no data was sent!e
        <View>
               <Text style={styles.text}>{route.params.n}</Text> 
               <Image
          source={{ uri: route.params.u }}
          style={styles.circleImageLayout}
          resizeMode={"cover"}
        />
        
  
        <FlatList
            data={playahs} //this now has to be passed data
           // contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns= {3}//{Math.ceil(roster.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            
            renderItem={({ item, index }) => (
                //need to create my own version of statsection
                
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



export const Player = () => {
    const route = useRoute(); //got the string a to send... still lots of errors

    return ( //could add undefined type to catch the error if no data was sent!e
        <View>
               <Text style={styles.text}>{route.params.fn}</Text> 
               <Text style={styles.text}>{route.params.s[0]}</Text> 
  

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
      },    circleImageLayout: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: 'grey',
        borderWidth: 2,      
      
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
    stats: string[];
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
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    stats: ["52 points"]
 //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
}
const middleton: player = {
    fname:"chris",
    lname: "middelton",
    uri:'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    stats: ["trash af"]
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

