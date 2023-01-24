import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../../types/Navigation';
import React, { FC } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Team } from './../../types/Team';

type RosterSectionProps = {
    team: Team;
};

export const RosterSection: FC<RosterSectionProps> = ({ team }) => {
    const { push } = useNavigation<RosterNavigationProp>();
    function navigateToSelectionScreen() {
        push('Players', { p: team.players, u: team.icon, n: team.name });
    }
    /*
    
    const rotate = new Animated.Value(0);
    const ExpandOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(rotate, {
            toValue: 500,
            duration: 3000,
            useNativeDriver: true,
        }).start();
        };
      */
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={navigateToSelectionScreen}
            >
                <Image
                    source={{ uri: team.icon }}
                    style={styles.circleImageLayout}
                    resizeMode={'cover'}
                />
            </TouchableOpacity>
            <Text style={styles.text}>{team.abbr}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    circleImageLayout: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: 'grey',
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
    },
});
