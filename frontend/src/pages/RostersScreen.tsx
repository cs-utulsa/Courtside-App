import { ErrorBox, PrimaryButton } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { useAuth } from '@hooks/useAuth';
import { RosterSection } from '@components/index';
import { RosterNavigationProp } from '../types/Navigation';
import { useRefreshOnFocus, useTeams } from '@hooks/index';
/** This component displays the members of teams that the user is following */
export const RostersScreen = () => {
    const { navigate } = useNavigation<RosterNavigationProp>();
    const { authData } = useAuth();

    const { data, isLoading, isError, refetch } = useTeams(
        authData?.teams ?? []
    );

    useRefreshOnFocus(refetch);

    return (
        <FlatList
            data={data}
            // contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns={3} //{Math.ceil(roster.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <RosterSection team={item} />}
            ListHeaderComponent={
                <>
                    <PrimaryButton
                        text="Follow Teams"
                        onPress={() => navigate('Selection')}
                    />
                    {isLoading && <ActivityIndicator />}
                    {isError && <ErrorBox error="Error" />}
                </>
            }
            ListHeaderComponentStyle={styles.headerContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
});