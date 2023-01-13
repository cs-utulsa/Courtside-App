//external imports
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';

// types
import { OnboardingNavigationProp } from '../types/Navigation';

//custom components
import { RightButton, SelectCircle } from '@components/buttons';
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
export const FavoriteTeams = () => {
    //const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    const { navigate } = useNavigation<OnboardingNavigationProp>();

    const renderItem = ({ item }: { item: { name: string; logo: string } }) => {
        return (
            <SelectCircle
                url={item.logo}
                size={tile}
                onSelectChanged={(newStatus: boolean) => {
                    console.log(newStatus);
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={ICONS}
                renderItem={renderItem}
                numColumns={3}
                ItemSeparatorComponent={Seperator}
                ListHeaderComponent={<FavoriteTeamsHeader />}
                ListHeaderComponentStyle={styles.headerContainer}
                ListFooterComponent={Seperator}
            />
            <View style={[styles.footer]}>
                <RightButton
                    //text={userTeams.length < 1 ? 'Skip' : 'Next'}
                    text="Next"
                    onPress={() => navigate('StatSelection')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginHorizontal: 10,
        flex: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    list: {
        flex: 0.9,
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: -10,
        backgroundColor: 'white',
    },
    headerContainer: {
        alignItems: 'center',
    },
});
