//external imports
import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';

//custom components
import { PrimaryButton, SelectCircle, Seperator } from '@components/index';

// constants
import { ICONS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { TeamNavigationProp } from './../types/Navigation';
// import { useAuth } from '@hooks/useAuth';

const screenWidth = Dimensions.get('window').width - 20;
const numColumns = 3;
const tile = screenWidth / numColumns;

const FavoriteTeamsHeader = () => {
    const { navigate } = useNavigation<TeamNavigationProp>();
    return (
        <>
            <PrimaryButton
                text="Update Your Teams"
                onPress={() => navigate('Dashboard')}
            />
        </>
    );
};

/** This component lets the user choose what teams they want to follow */
export const TeamSelection = () => {
    // const { authData } = useAuth();
    // const [selectedTeams, setSelectedTeams] = useState<string[]>(
    //     authData?.teams ?? []
    // );

    const renderItem = useCallback(
        ({ item }: { item: { name: string; logo: string } }) => {
            const handleSelectChange = (newStatus: boolean) => {
                console.log(newStatus);
            };

            return (
                <SelectCircle
                    url={item.logo}
                    size={tile}
                    onSelectChanged={handleSelectChange}
                />
            );
        },
        []
    );

    return (
        <FlatList
            data={ICONS}
            renderItem={renderItem}
            numColumns={3}
            ItemSeparatorComponent={Seperator}
            ListHeaderComponent={<FavoriteTeamsHeader />}
            ListFooterComponent={Seperator}
            contentContainerStyle={styles.container}
            ListHeaderComponentStyle={styles.headerContainer}
        />
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
    },
    headerContainer: {
        width: '100%',
    },
});
