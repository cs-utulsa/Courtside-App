import { useNavigation } from '@react-navigation/native';
import { TeamIcon } from './../types/Team';
import React, { useCallback, useState } from 'react';
import { AuthNavigationProp } from './../types/Navigation';
import { FullError, SearchBox, TeamsList, FAB } from '@components/index';
import { useAllTeams } from '@hooks/index';
import { ORANGE } from '@styles/colors';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const FirstTimeTeamSelectScreen = () => {
    const { navigate } = useNavigation<AuthNavigationProp>();

    const { data, isSuccess, isLoading, isError } = useAllTeams();

    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [result, setResult] = useState<TeamIcon[]>([]);

    const submitTeamSelectionUpdates = async () => {
        setSubmitting(true);

        navigate('SignUp');

        setSubmitting(false);
    };

    const handleSearchQueryChange = useCallback(
        (query: string) => {
            if (query === '') {
                setResult([]);
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
                    <Text>Follow Your Favorite Teams!</Text>
                    <SearchBox
                        placeholder="Search for teams"
                        onChange={handleSearchQueryChange}
                    />
                    <TeamsList
                        teams={result}
                        selected={selectedTeams}
                        addTeam={addTeam}
                        removeTeam={removeTeam}
                    />
                    {selectedTeams.length >= 1 && (
                        <FAB
                            onPress={submitTeamSelectionUpdates}
                            position="right"
                            color={ORANGE}
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
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 30,
    },
    headerContainer: {
        width: '100%',
    },
});
