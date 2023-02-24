import { ORANGE } from '@styles/colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export const ThemeSelector = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>('light');

    const changeTheme = (newTheme: 'light' | 'dark') => {
        setSelectedTheme(newTheme);
    };

    return (
        <View style={styles.container}>
            <View style={styles.themesContainer}>
                <Pressable
                    style={[
                        styles.modeButton,
                        styles.lightModeButton,
                        selectedTheme === 'light' && styles.btnSelected,
                    ]}
                    onPress={() => changeTheme('light')}
                >
                    <Text style={styles.darkText}>Light</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.modeButton,
                        styles.darkModeButton,
                        selectedTheme === 'dark' && styles.btnSelected,
                    ]}
                    onPress={() => changeTheme('dark')}
                >
                    <Text style={styles.lightText}>Dark</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '80%',
        borderRadius: 10,
        marginVertical: 10,
    },
    themesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modeButton: {
        width: '40%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightModeButton: {
        backgroundColor: '#f8fafc',
    },
    darkModeButton: {
        backgroundColor: '#1e293b',
    },
    lightText: {
        color: '#f8fafc',
        fontSize: 20,
    },
    darkText: {
        color: '#1e293b',
        fontSize: 20,
    },
    btnSelected: {
        borderColor: ORANGE,
    },
});
