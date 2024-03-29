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
import {
    StatLeaderboard,
    PrimaryButton,
    FullError,
    Seperator,
} from '@components/index';

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
                    return <StatLeaderboard key={stat.id} stat={stat} />;
                })}

            {/* if data is being fetched from the server, display a loading indicator */}
            {isFetchingData && <ActivityIndicator color="black" size="large" />}
            <Seperator />
            <Seperator />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
});
