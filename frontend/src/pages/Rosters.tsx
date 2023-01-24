import { PrimaryButton } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import { useAuth } from '@hooks/useAuth';
import { RosterSection } from '@components/data';
import { RosterNavigationProp } from './../types/Navigation';
/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    const { navigate } = useNavigation<RosterNavigationProp>();
    const { authData } = useAuth();

    return (
        <View style={styles.container}>
            <PrimaryButton
                text="Follow Teams"
                onPress={() => navigate('Selection')}
            />
            <Text style={styles.text}>Teams</Text>
            {authData?.teams?.map((team) => {
                return <Text key={team}>{team}</Text>;
            })}
            <FlatList
                data={roster}
                // contentContainerStyle={{alignSelf: 'flex-start'}}
                numColumns={3} //{Math.ceil(roster.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
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

// export const RosterSelection = () => {
//     <Text style={styles.text}>Favorites:</Text>;

//     return (
//         <View>
//             <Text style={styles.header}>Select A Team to View Rosters</Text>
//             <Text style={styles.text}>Favorites:</Text>
//             <Text style={styles.text}>Other Teams:</Text>

//             <FlatList
//                 data={roster}
//                 // contentContainerStyle={{alignSelf: 'flex-start'}}
//                 numColumns={3} //{Math.ceil(roster.length / 2)}
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item }) => (
//                     //need to create my own version of statsection

//                     <RosterSection
//                         name={item.name}
//                         uri={item.uri}
//                         players={item.players}
//                     />
//                 )}
//             />
//         </View>
//     );
// };

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
};
//team type
//- team name
//- team image
//- players list
type team = {
    name: string;
    uri: string;
    //  logo: File;
    players: player[];
};
const giannis: player = {
    fname: 'giannis',
    lname: 'antetokpumpo',
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    stats: ['52 points'],
    //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
};
const middleton: player = {
    fname: 'chris',
    lname: 'middelton',
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    stats: ['trash af'],
    //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
};
const bucks: team = {
    name: 'bucks',
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    players: [giannis, middleton],
};

const nets: team = {
    name: 'nets',
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    players: [giannis, middleton],
};

const roster: team[] = [nets, bucks, nets, bucks, nets, bucks];
