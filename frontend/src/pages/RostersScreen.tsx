import { ErrorBox, PrimaryButton, RosterSection } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { useAuth } from '@hooks/useAuth';
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
            numColumns={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <RosterSection team={item} />}
            ListHeaderComponent={
                <>
                    <PrimaryButton
                        text="Follow Teams"
                        onPress={() => navigate('Tselection')}
                    />
                    {isLoading && <ActivityIndicator />}
                    {isError && <ErrorBox error="Error" />}
                    <PrimaryButton
                        text="Follow Players"
                        onPress={() => navigate('Pselection')}
                    />
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
