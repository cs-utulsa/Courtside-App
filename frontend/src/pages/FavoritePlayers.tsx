import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RightButton, LeftButton, Seperator } from '../components/atoms';
import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../navigation/types';

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
                // ListHeaderComponent={() => (
                //     <>
                //         <Text style={styles.header}>
                //             Follow Your Favorite Players
                //         </Text>
                //     </>
                // )}
                // ListHeaderComponentStyle={{ alignItems: 'center' }}
                // ListFooterComponent={() => <View style={{ height: 30 }} />}
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
