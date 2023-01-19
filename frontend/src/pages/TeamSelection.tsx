//external imports
import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Dimensions, Text } from 'react-native';

//custom components
import { SelectCircle } from '@components/buttons';
import { SearchBox } from '@components/misc/SearchBox';
import { Seperator } from '@components/misc/Seperator';

// constants
import { ICONS } from '../constants';

const screenWidth = Dimensions.get('window').width - 20;
const numColumns = 3;
const tile = screenWidth / numColumns;

const FavoriteTeamsHeader = () => {
    return (
        <>
            <Text style={styles.header}>Select Your Favorite Teams</Text>
            <SearchBox placeholder="Search for Your Team" />
        </>
    );
};

/** This component lets the user choose what teams they want to follow */
export const TeamSelection = () => {
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
            ListHeaderComponentStyle={styles.headerContainer}
            ListFooterComponent={Seperator}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    headerContainer: {
        alignItems: 'center',
    },
});
