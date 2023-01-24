import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RightButton, LeftButton, Seperator } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../types/Navigation';

/** This component allows users to choose what players they want to follow */
export const FavoritePlayers = () => {
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ item }) => <Text>{item}</Text>}
                numColumns={3}
                ItemSeparatorComponent={Seperator}
            />
            <View style={[styles.footer]}>
                <LeftButton
                    onPress={() => navigate('FavoriteTeams')}
                    text="Back"
                />
                <RightButton
                    text="Next"
                    onPress={() => navigate('StatSelection')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginHorizontal: 10,
        flex: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    list: {
        flex: 0.9,
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -10,
        backgroundColor: 'white',
    },
});
