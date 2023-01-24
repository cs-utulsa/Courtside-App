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
import { useRefreshOnFocus, useTeams } from '@hooks/index';
/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    const { navigate } = useNavigation<RosterNavigationProp>();
    const { authData } = useAuth();

    const { data, isLoading, isSuccess, isError, refetch } = useTeams(
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
            {isSuccess && (
                <FlatList
                    data={data}
                    // contentContainerStyle={{alignSelf: 'flex-start'}}
                    numColumns={3} //{Math.ceil(roster.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <RosterSection team={item} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    text: {},
});

// type team = {
//     name: string;
//     uri: string;
//     //  logo: File;
//     players: Player[];
// };
// const giannis: Player = {
//     fname: 'giannis',
//     lname: 'antetokpumpo',
//     uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
//     stats: ['52 points'],
//     //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
// };
// const middleton: Player = {
//     fname: 'chris',
//     lname: 'middelton',
//     uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
//     stats: ['trash af'],
//     //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
// };
// const bucks: team = {
//     name: 'bucks',
//     uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
//     players: [giannis, middleton],
// };

// const nets: team = {
//     name: 'nets',
//     uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg',
//     players: [giannis, middleton],
// };

// const roster: team[] = [nets, bucks, nets, bucks, nets, bucks];
