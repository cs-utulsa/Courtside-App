import { ErrorBox, PrimaryButton, RosterSection } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';

import { useAuth } from '@hooks/useAuth';
import { RosterNavigationProp } from '../types/Navigation';
import { useRefreshOnFocus, useTeams } from '@hooks/index';

/** This component displays the members of teams that the user is following */
export const RostersScreen = () => {
    const { navigate } = useNavigation<RosterNavigationProp>();
    const { authData } = useAuth();

    const { data, isLoading, isError, isRefetching, refetch } = useTeams(
        authData?.teams ?? []
    );

    useRefreshOnFocus(refetch);

    return (
        <View>
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
                   { false && <PrimaryButton
                        text="Follow Players"
                        onPress={() => navigate('Pselection')}
                    /> }
                    {(isLoading || isRefetching) && <ActivityIndicator />}
                    {isError && <ErrorBox error="Error" />}
                </>
            }
            ListHeaderComponentStyle={styles.headerContainer}
        />
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
});
