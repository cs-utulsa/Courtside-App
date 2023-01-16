// external imports
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

//custom hooks
import { useAuth, useRefreshOnFocus, useStats } from '@hooks/index';

// types
import { StatsNavigationProp } from './../types/Navigation';
import { Stat } from './../types/Stat';

// custom components
import { StatLeaderboard } from '@components/data';
import { PrimaryButton } from '@components/buttons';

// constants
import { ORANGE } from '@styles/colors';
import { FullError } from '@components/error';

/**
 * This component allows user to view the leaderboards for the stats that they are following.
 */
export const StatDashboard = () => {
    const { authData } = useAuth();
    const { push } = useNavigation<StatsNavigationProp>();

    const { data, isError, isLoading, isSuccess, isRefetching, refetch } =
        useStats(authData?.stats);

    // refetch the data when user returns to screen (stale data is still displayed during refetch)
    useRefreshOnFocus(refetch);

    if (isError) {
        return <FullError text="Cannot load stat data. Try again later." />;
    }

    // navigates to the stat selection screen, i.e., pushes the Selection screen onto the navigation stack
    function navigateToSelectionScreen() {
        push('Selection');
    }

    const isFetchingData = isLoading || isRefetching;

    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>
            {/* Button that navigates to the stat selection screen */}
            <PrimaryButton
                onPress={navigateToSelectionScreen}
                text="Follow More Stats"
            />

            {/* if data was fetched successfully, create a leaderboard for each stat */}
            {isSuccess &&
                data.map((stat: Stat) => {
                    return (
                        <StatLeaderboard
                            key={stat._id}
                            _id={stat._id}
                            player_id={stat.player_names}
                            value={stat.value}
                            name={stat.name}
                        />
                    );
                })}

            {/* if data is being fetched from the server, display a loading indicator */}
            {isFetchingData && <ActivityIndicator color="black" size="large" />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: ORANGE,
        marginTop: 20,
    },
    followBtn: {
        width: '90%',
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
    },
    followBtnText: {
        textAlign: 'center',
        color: ORANGE,
        fontSize: 16,
    },
    pageContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
});
