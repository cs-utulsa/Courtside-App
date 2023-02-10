//external imports
import React, { useCallback, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

//custom components
import { FAB, FullError, SearchBox, TeamsList } from '@components/index';

// constants
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from '../types/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useAllTeams } from '@hooks/index';
import { TeamIcon } from '../types/Team';
import { ORANGE } from '@styles/colors';

/** This component lets the user choose what teams they want to follow */
export const TeamSelectionScreen = () => {
    const rosterNavigation = useNavigation<RosterNavigationProp>();

    const { authData, updateTeams } = useAuth();
    const [selectedTeams, setSelectedTeams] = useState<string[]>(
        authData?.teams ?? []
    );

    const [submitting, setSubmitting] = useState<boolean>(false);

    const { data, isSuccess, isLoading, isError } = useAllTeams();

    const [result, setResult] = useState<TeamIcon[]>([]);

    const submitTeamSelectionUpdates = async () => {
        setSubmitting(true);

        await updateTeams(selectedTeams);
        rosterNavigation.navigate('Dashboard');

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
