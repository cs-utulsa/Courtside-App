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
import { RosterNavigationProp } from '../types/Navigation';
import { useRefreshOnFocus, useTeams } from '@hooks/index';
/** This component displays the members of teams that the user is following */
export const RostersScreen = () => {
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
