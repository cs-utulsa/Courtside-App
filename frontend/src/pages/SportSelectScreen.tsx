import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FAB, LogoHeader } from '@components/index';
import { ORANGE } from '@styles/colors';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from './../types/Navigation';

export const SportSelectScreen = () => {
    const { navigate } = useNavigation<AuthNavigationProp>();

    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const toggleSport = (name: string) => {
        if (selectedSports.includes(name))
            setSelectedSports((prev) => prev.filter((sport) => sport !== name));
        else {
            setSelectedSports((prev) => prev.concat(name));
        }
    };

    const submitSports = async () => {
        setSubmitting(true);

        await SecureStore.setItemAsync(
            'initialSports',
            JSON.stringify(selectedSports)
        );
        navigate('TeamSelect');

        setSubmitting(false);
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
                <FAB onPress={submitSports} position="right" color={ORANGE}>
                    {!submitting ? (
                        <MaterialIcons
                            name="navigate-next"
                            size={50}
                            color="black"
                        />
                    ) : (
                        <ActivityIndicator color="black" />
                    )}
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
