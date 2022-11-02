import { UserContext } from '@contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import {
    RightButton,
    SelectCircle,
    SearchBox,
    Seperator,
} from '../components/atoms';
import { ICONS } from '../constants';
import { OnboardingNavigationProp } from '../navigation/types';

const screenWidth = Dimensions.get('window').width - 20;
const numColumns = 3;
const tile = screenWidth / numColumns;

export const FavoriteTeams = () => {
    const { userTeams, setUserTeams } = useContext(UserContext);

    //const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    const { navigate } = useNavigation<OnboardingNavigationProp>();

    const renderItem = ({ item }: { item: { name: string; logo: string } }) => {
        return (
            <SelectCircle
                url={item.logo}
                size={tile}
                onSelectChanged={(newStatus: boolean) => {
                    if (newStatus) {
                        setUserTeams((old: any) => [...old, item.name]);
                    } else {
                        setUserTeams(
                            userTeams.filter((team: any) => team !== item.name)
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
                ItemSeparatorComponent={Seperator}
                ListHeaderComponent={() => (
                    <>
                        <Text style={styles.header}>
                            Select Your Favorite Teams
                        </Text>
                        <SearchBox placeholder="Search for Your Team" />
                    </>
                )}
                ListHeaderComponentStyle={{ alignItems: 'center' }}
                ListFooterComponent={() => <View style={{ height: 30 }} />}
            />
            <View style={[styles.footer]}>
                <RightButton
                    text={userTeams.length < 1 ? 'Skip' : 'Next'}
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
});
