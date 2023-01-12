import {
    Pressable,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    View,
} from 'react-native';
import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from '@navigation/types';
import { StatLeaderboard } from '@molecules/StatLeaderboard';
import { ORANGE } from '../styles/colors';
import useRefreshOnFocus from '@hooks/useRefreshOnFocus';
import useStats from '@hooks/useStats';
import { Stat } from '../types/Stat';

export const StatDashboard = () => {
    const { authData } = useAuth();
    const { push } = useNavigation<StatsNavigationProp>();

    const { data, isError, isLoading, isSuccess, isRefetching, refetch } =
        useStats(authData?.stats);

    useRefreshOnFocus(refetch);

    if (isError) {
        return (
            <View>
                <Text>Cannot load stat data :(</Text>
            </View>
        );
    }

    function navigateToSelectionScreen() {
        push('Selection');
    }

    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>
            <Pressable
                style={styles.followBtn}
                onPress={navigateToSelectionScreen}
            >
                <Text style={styles.followBtnText}>Follow More Stats</Text>
            </Pressable>

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

            {/* if data is loading, display a loading indicator */}
            {(isLoading || isRefetching) && (
                <ActivityIndicator color="black" size="large" />
            )}
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
