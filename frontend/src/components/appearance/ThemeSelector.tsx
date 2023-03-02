import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelectedTheme } from '@hooks/useSelectedTheme';
import { useTheme } from '@react-navigation/native';
import { Card } from '@components/misc/Card';
import { ThemeText } from '../misc/ThemeText';

export const ThemeSelector = () => {
    const { theme, updateTheme } = useSelectedTheme();

    const { colors } = useTheme();

    return (
        <Card>
            <ThemeText style={styles.header}>Theme</ThemeText>
            <View style={styles.themesContainer}>
                <Pressable
                    style={[
                        styles.modeButton,
                        styles.lightModeButton,
                        theme === 'light' && { borderColor: colors.primary },
                    ]}
                    onPress={() => updateTheme('light')}
                >
                    <Text style={styles.darkText}>Light</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.modeButton,
                        styles.darkModeButton,
                        theme === 'dark' && { borderColor: colors.primary },
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
                    theme === 'system' && { borderColor: colors.primary },
                ]}
                onPress={() => updateTheme('system')}
            >
                <Text style={[{ color: colors.primary }]}>
                    Use System Default
                </Text>
            </Pressable>
        </Card>
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
    systemDefaultBtn: {
        width: '90%',
        alignItems: 'center',
        padding: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10,
    },
});
