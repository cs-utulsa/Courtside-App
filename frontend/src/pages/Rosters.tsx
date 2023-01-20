import { PrimaryButton } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { TeamNavigationProp } from './../types/Navigation';
import React from 'react';
import { View, StyleSheet } from 'react-native';

/** This component displays the members of teams that the user is following */
export const Rosters = () => {
    const { navigate } = useNavigation<TeamNavigationProp>();

    return (
        <View style={styles.container}>
            <PrimaryButton
                text="Follow Teams"
                onPress={() => navigate('Selection')}
            />
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
