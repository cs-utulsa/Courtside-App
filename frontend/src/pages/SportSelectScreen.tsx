import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FAB, LogoHeader } from '@components/index';
import { ORANGE } from '@styles/colors';

export const SportSelectScreen = () => {
    const [selectedSports, setSelectedSports] = useState<string[]>([]);

    const toggleSport = (name: string) => {
        if (selectedSports.includes(name))
            setSelectedSports((prev) => prev.filter((sport) => sport !== name));
        else {
            setSelectedSports((prev) => prev.concat(name));
        }
    };

    return (
        <View style={styles.container}>
            <LogoHeader />
            <Text style={styles.heading}>Follow Your Favorite Sports</Text>
            <View style={styles.sportsContainer}>
                <Pressable onPress={() => toggleSport('basketball')}>
                    <MaterialCommunityIcons
                        name="basketball-hoop"
                        size={100}
                        color={
                            selectedSports.includes('basketball')
                                ? ORANGE
                                : 'black'
                        }
                    />
                </Pressable>
            </View>
            {selectedSports.length >= 1 && (
                <FAB
                    onPress={() => console.log('Press')}
                    position="right"
                    color={ORANGE}
                >
                    <MaterialIcons
                        name="navigate-next"
                        size={50}
                        color="black"
                    />
                </FAB>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 15,
    },
    sportsContainer: {},
});
