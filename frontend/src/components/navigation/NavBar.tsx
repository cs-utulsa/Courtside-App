import React, { FC } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import { OnboardingNavigationProp } from '../../navigation/types';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type NavButton = {
    type: 'schedule' | 'teams' | 'stats' | 'settings';
    onPress: () => void;
};

const NavButton: FC<NavButton> = ({ type, onPress }) => {
    if (type === 'schedule') {
        return (
            <Pressable onPress={onPress}>
                <View style={styles.navButton}>
                    <FontAwesome name="calendar-o" color="black" size={45} />
                </View>
            </Pressable>
        );
    } else if (type === 'teams') {
        return (
            <Pressable onPress={onPress}>
                <View style={styles.navButton}>
                    <FontAwesome5
                        name="basketball-ball"
                        color="black"
                        size={45}
                    />
                </View>
            </Pressable>
        );
    } else if (type === 'stats') {
        return (
            <Pressable onPress={onPress}>
                <View style={styles.navButton}>
                    <Ionicons
                        name="stats-chart-sharp"
                        color="black"
                        size={45}
                    />
                </View>
            </Pressable>
        );
    } else if (type === 'settings') {
        return (
            <Pressable onPress={onPress}>
                <View style={styles.navButton}>
                    <Ionicons name="settings-sharp" color="black" size={45} />
                </View>
            </Pressable>
        );
    }
    return null;
};

export const NavBar = () => {
    //const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.navBar}>
            {/* <NavButton type="schedule" onPress={() => navigate('Schedule')} />
            <NavButton type="teams" onPress={() => navigate('Rosters')} />
            <NavButton type="stats" onPress={() => navigate('StatDashboard')} />
            <NavButton
                type="settings"
                onPress={() => navigate('FavoriteTeams')}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        backgroundColor: '#BFF3FF',
        borderTopColor: '#DEDEDE',
        borderTopWidth: 2,
    },
    navButton: {
        width: screenWidth / 4,
        height: screenHeight * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
