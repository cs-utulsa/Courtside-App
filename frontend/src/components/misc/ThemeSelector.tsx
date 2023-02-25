import React from 'react';
import { ORANGE, PRIMARY } from '@styles/colors';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelectedTheme } from '@hooks/useSelectedTheme';
import { useTheme } from '@react-navigation/native';

export const ThemeSelector = () => {
    const { theme, updateTheme } = useSelectedTheme();

    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Text style={[styles.header, { color: colors.text }]}>Theme</Text>
            <View style={styles.themesContainer}>
                <Pressable
                    style={[
                        styles.modeButton,
                        styles.lightModeButton,
                        theme === 'light' && styles.btnSelected,
                    ]}
                    onPress={() => updateTheme('light')}
                >
                    <Text style={styles.darkText}>Light</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.modeButton,
                        styles.darkModeButton,
                        theme === 'dark' && styles.btnSelected,
                    ]}
                    onPress={() => updateTheme('dark')}
                >
                    <Text style={styles.lightText}>Dark</Text>
                </Pressable>
            </View>

            <Pressable
                style={[
                    styles.systemDefaultBtn,
                    {
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                    },
                    theme === 'system' && styles.btnSelected,
                ]}
                onPress={() => updateTheme('system')}
            >
                <Text style={styles.systemDefaultBtnText}>
                    Use System Default
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        width: '80%',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    themesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
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
    systemDefaultBtn: {
        width: '90%',
        alignItems: 'center',
        padding: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10,
    },
    systemDefaultBtnText: {
        color: PRIMARY,
    },
});
