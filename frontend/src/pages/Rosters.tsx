import { PrimaryButton } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { TeamNavigationProp } from './../types/Navigation';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useAuth } from '@hooks/useAuth';

/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    const { navigate } = useNavigation<TeamNavigationProp>();
    const { authData } = useAuth();

    return (
        <View style={styles.container}>
            <PrimaryButton
                text="Follow Teams"
                onPress={() => navigate('Selection')}
            />
            {authData?.teams?.map((team) => {
                return <Text key={team}>{team}</Text>;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
    },
});
