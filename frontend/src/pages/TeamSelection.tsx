//external imports
import React, { useCallback, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

//custom components
import {
    FullError,
    PrimaryButton,
    SelectCircle,
    Seperator,
} from '@components/index';

// constants
import { useNavigation } from '@react-navigation/native';
import { TeamNavigationProp } from './../types/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useAllTeams } from '@hooks/index';
import { LimitedTeam } from './../types/Team';

const screenWidth = Dimensions.get('window').width - 20;
const numColumns = 3;
const tile = screenWidth / numColumns;

/** This component lets the user choose what teams they want to follow */
export const TeamSelection = () => {
    const { navigate } = useNavigation<TeamNavigationProp>();

    const { authData, updateTeams } = useAuth();
    const [selectedTeams, setSelectedTeams] = useState<string[]>(
        authData?.teams ?? []
    );

    const [submitting, setSubmitting] = useState<boolean>(false);

    const { data, isSuccess, isLoading, isError } = useAllTeams();

    const renderItem = useCallback(
        ({ item }: { item: LimitedTeam }) => {
            const handleSelectChange = (newStatus: boolean) => {
                if (newStatus) setSelectedTeams((prev) => [...prev, item.id]);
                else
                    setSelectedTeams((prev) =>
                        prev.filter((oldListItem) => oldListItem !== item.id)
                    );
            };

            return (
                <SelectCircle
                    initialState={selectedTeams.includes(item.id)}
                    url={item.icon}
                    size={tile}
                    onSelectChanged={handleSelectChange}
                />
            );
        },
        [selectedTeams]
    );

    const submitTeamSelectionUpdates = async () => {
        setSubmitting(true);

        await updateTeams(selectedTeams);
        navigate('Dashboard');

        setSubmitting(false);
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (isError) {
        return <FullError text="Cannot retrieve teams data. Try again later" />;
    }

    if (isSuccess) {
        return (
            <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={3}
                ItemSeparatorComponent={Seperator}
                ListHeaderComponent={
                    <PrimaryButton
                        text="Update Your Teams"
                        onPress={submitTeamSelectionUpdates}
                        loading={submitting}
                    />
                }
                ListFooterComponent={Seperator}
                contentContainerStyle={styles.container}
                ListHeaderComponentStyle={styles.headerContainer}
            />
        );
    }
};

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
    },
});
