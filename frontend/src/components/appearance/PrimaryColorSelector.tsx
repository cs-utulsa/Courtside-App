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
import { ErrorBox } from '../error/ErrorBox';
import { CircleImage } from '../images/CircleImage';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../misc/Card';

export const PrimaryColorSelector = () => {
    const { colors } = useTheme();

    const { primaryColor, updatePrimaryColor } = useSelectedTheme();

    const { authData } = useAuth();
    const { data, isLoading, isError, isSuccess } = useTeams(
        authData?.teams ?? [],
        { allLeagues: true }
    );

    return (
        <Card>
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
                            {item.color === colors.primary && (
                                <View style={[styles.selectedIconContainer]}>
                                    <MaterialIcons
                                        name="check"
                                        size={60}
                                        color={colors.primary}
                                    />
                                </View>
                            )}
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
                <Text style={[{ color: ORANGE }]}>Use Courtside Orange</Text>
            </Pressable>
        </Card>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectContainer: {
        paddingVertical: 10,
        maxHeight: 120,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    selectedIconContainer: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,.8)',
        width: '95%',
        height: '100%',
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedIcon: {},
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
