import { ErrorBox, PrimaryButton } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import { useAuth } from '@hooks/useAuth';
import { RosterSection } from '@components/index';
import { RosterNavigationProp } from './../types/Navigation';
import { Player } from './../types/Player';
import { useRefreshOnFocus, useTeams } from '@hooks/index';
/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    const { navigate } = useNavigation<RosterNavigationProp>();
    const { authData } = useAuth();

    const { isLoading, isSuccess, isError, refetch } = useTeams(
        authData?.teams ?? []
    );
    useRefreshOnFocus(refetch);

    return (
        <View style={styles.container}>
            <PrimaryButton
                text="Follow Teams"
                onPress={() => navigate('Selection')}
            />
            <Text style={styles.text}>Teams</Text>
            {isLoading && <ActivityIndicator />}
            {isError && <ErrorBox error="Error" />}
            {isSuccess &&
                authData?.teams?.map((team) => {
                    return <Text key={team}>{team}</Text>;
                })}
            <FlatList
                data={roster}
                // contentContainerStyle={{alignSelf: 'flex-start'}}
                numColumns={3} //{Math.ceil(roster.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
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
    container: {},
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    text: {},
});

//Fake roster data

//player type
//- position
//- player name
//- player image
//team type
//- team name
//- team image
//- players list
type team = {
    name: string;
    uri: string;
    //  logo: File;
    players: Player[];
};
const giannis: Player = {
    fname: 'giannis',
    lname: 'antetokpumpo',
    uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
    stats: ['52 points'],
    //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
};
const middleton: Player = {
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
