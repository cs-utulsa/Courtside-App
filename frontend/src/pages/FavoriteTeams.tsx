import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import { RightButton, SelectCircle, SearchBox } from '../components/atoms';
import { ICONS } from '../constants';
import { OnboardingNavigationProp } from '../navigation/types';

const screenWidth = Dimensions.get('window').width - 20;
const numColumns = 3;
const tile = screenWidth / numColumns;

export const FavoriteTeams = () => {
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    const { navigate } = useNavigation<OnboardingNavigationProp>();

    const renderItem = ({ item }: { item: { name: string; logo: string } }) => {
        return (
            <SelectCircle
                url={item.logo}
                size={tile}
                onSelectChanged={(newStatus: boolean) => {
                    if (newStatus) {
                        setSelectedTeams((old) => [...old, item.name]);
                    } else {
                        setSelectedTeams(
                            selectedTeams.filter((team) => team !== item.name)
                        );
                    }
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
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => (
                    <>
                        <Text style={styles.heading}>
                            Select Your Favorite Teams!
                        </Text>
                        <SearchBox placeholder="Search for Your Team" />
                    </>
                )}
                ListHeaderComponentStyle={{ alignItems: 'center' }}
                ListFooterComponent={() => <View style={{ height: 30 }} />}
            />
            <View style={[styles.footer]}>
                <RightButton
                    text={selectedTeams.length < 1 ? 'Skip' : 'Next'}
                    onPress={() => navigate('StatSelection')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 10,
        flex: 1,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    center: {
        marginVertical: 15,
        alignItems: 'center',
    },
    footer: {
        marginHorizontal: -10,
        flex: 0.1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    list: {
        flex: 0.9,
    },
});
