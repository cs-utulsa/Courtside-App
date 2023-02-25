import { useSelectedTheme, useTeams } from '@hooks/index';
import { useAuth } from '@hooks/useAuth';
import { useTheme } from '@react-navigation/native';
import { ORANGE } from '@styles/colors';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { ErrorBox } from '..';
import { CircleImage } from '../images/CircleImage';

export const PrimaryColorSelector = () => {
    const { colors } = useTheme();

    const { primaryColor, updatePrimaryColor } = useSelectedTheme();

    const { authData } = useAuth();
    const { data, isLoading, isError, isSuccess } = useTeams(
        authData?.teams ?? []
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Text style={[styles.heading, { color: colors.text }]}>
                Primary Color
            </Text>
            {isLoading && (
                <View style={styles.selectContainer}>
                    <ActivityIndicator color={colors.primary} />
                </View>
            )}

            {isError && (
                <View style={styles.selectContainer}>
                    <ErrorBox error="Cannot load teams" />
                </View>
            )}

            {isSuccess && (
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.teamBox}
                            onPress={() => updatePrimaryColor(item.color)}
                        >
                            <CircleImage
                                url={item.icon}
                                size={100}
                                borderColor={item.color}
                            />
                        </Pressable>
                    )}
                    contentContainerStyle={styles.selectContainer}
                />
            )}

            <Pressable
                style={[
                    styles.systemDefaultBtn,
                    {
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                    },
                    primaryColor === ORANGE && { borderColor: ORANGE },
                ]}
                onPress={() => updatePrimaryColor(ORANGE)}
            >
                <Text style={[{ color: colors.primary }]}>
                    Use Courtside Orange
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
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectContainer: {
        paddingVertical: 10,
        height: 120,
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
    teamBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
