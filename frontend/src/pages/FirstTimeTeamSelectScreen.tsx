import { useNavigation, useTheme } from '@react-navigation/native';
import { TeamIcon } from './../types/Team';
import React, { useCallback, useEffect, useState } from 'react';
import { AuthNavigationProp } from './../types/Navigation';
import { FullError, SearchBox, TeamsList, FAB } from '@components/index';
import { useAllTeams } from '@hooks/index';
import { NAVY } from '@styles/colors';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export const FirstTimeTeamSelectScreen = () => {
    const { navigate } = useNavigation<AuthNavigationProp>();
    const { colors } = useTheme();

    const { data, isSuccess, isLoading, isError } = useAllTeams();

    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [result, setResult] = useState<TeamIcon[]>([]);
    const [resultStatus, setResultStatus] = useState<
        'empty' | 'not found' | 'found'
    >('empty');

    useEffect(() => {
        (async () => {
            const fromStorage = await SecureStore.getItemAsync('initialTeams');

            if (fromStorage) {
                setSelectedTeams(JSON.parse(fromStorage));
            }
        })();
    }, []);

    const storeTeams = async () => {
        await SecureStore.setItemAsync(
            'initialTeams',
            JSON.stringify(selectedTeams)
        );
    };

    const goPrev = async () => {
        await storeTeams();
        navigate('SportsSelect');
    };

    const goNext = async () => {
        setSubmitting(true);

        await storeTeams();
        navigate('SignUp');

        setSubmitting(false);
    };

    const handleSearchQueryChange = useCallback(
        (query: string) => {
            if (query === '') {
                setResult([]);
                setResultStatus('empty');
                return;
            }

            const _result = data!.filter((team) => {
                if (
                    team.abbr.toLowerCase().includes(query.toLowerCase()) ||
                    team.name.toLowerCase().includes(query.toLowerCase()) ||
                    team.short.toLowerCase().includes(query.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });

            if (_result.length > 0) setResultStatus('found');
            else setResultStatus('not found');

            setResult(_result);
        },
        [data]
    );

    const addTeam = (id: string) => setSelectedTeams((prev) => prev.concat(id));
    const removeTeam = (id: string) =>
        setSelectedTeams((prev) => prev.filter((team) => team !== id));

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (isError) {
        return <FullError text="Cannot retrieve teams data. Try again later" />;
    }

    return (
        <View style={styles.container}>
            {isSuccess && (
                <>
                    <Text style={[styles.heading, { color: colors.text }]}>
                        Follow Your Favorite Teams!
                    </Text>
                    <SearchBox
                        placeholder="Search for teams"
                        onChange={handleSearchQueryChange}
                    />
                    {resultStatus === 'found' && (
                        <TeamsList
                            teams={result}
                            selected={selectedTeams}
                            addTeam={addTeam}
                            removeTeam={removeTeam}
                        />
                    )}
                    {resultStatus === 'empty' && (
                        <Text style={[styles.message, { color: colors.text }]}>
                            Select at least one team to continue!
                        </Text>
                    )}
                    {resultStatus === 'not found' && (
                        <Text style={[styles.message, { color: colors.text }]}>
                            Could not find a team with that query.
                        </Text>
                    )}

                    {selectedTeams.length >= 1 && (
                        <FAB
                            onPress={goNext}
                            position="right"
                            color={colors.primary}
                        >
                            {!submitting ? (
                                <MaterialIcons
                                    name="check"
                                    size={40}
                                    color="black"
                                />
                            ) : (
                                <ActivityIndicator color="black" />
                            )}
                        </FAB>
                    )}
                    <FAB onPress={goPrev} position="left" color={NAVY}>
                        <MaterialIcons
                            name="chevron-left"
                            size={40}
                            color="#d5dcdc"
                        />
                    </FAB>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 15,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 30,
    },
    headerContainer: {
        width: '100%',
    },
    message: {
        fontSize: 20,
        maxWidth: '80%',
        textAlign: 'center',
    },
});
