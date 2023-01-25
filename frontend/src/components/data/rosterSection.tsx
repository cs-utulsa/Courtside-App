import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from '../../types/Navigation';
import React, { FC } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Team } from '../../types/Team';
import { CircleImage } from '@components/index';

type RosterSectionProps = {
    team: Team;
};

export const RosterSection: FC<RosterSectionProps> = ({ team }) => {
    const { push } = useNavigation<RosterNavigationProp>();

    function navigateToTeamScreen() {
        push('Team', { team });
    }

    const screenWidth = Dimensions.get('window').width - 20;
    const numColumns = 3;
    const tile = screenWidth / numColumns;

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
                onPress={navigateToTeamScreen}
            >
                <CircleImage url={team.icon} size={tile} />
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
        resizeMode: 'contain',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
    },
});
