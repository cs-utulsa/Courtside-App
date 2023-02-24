import { useNavigation, useTheme } from '@react-navigation/native';
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
import { CircleImage } from '@components/images/CircleImage';

type RosterSectionProps = {
    /** The team to be shown in this component */
    team: Team;
};

/**
 * This component shows a team's icon and when clicked it navigates to the specific page for that team
 * This component is meant to be shown in a FlatList with others
 */
export const RosterSection: FC<RosterSectionProps> = ({ team }) => {
    const { push } = useNavigation<RosterNavigationProp>();
    const { colors } = useTheme();

    function navigateToTeamScreen() {
        push('Team', { team });
    }

    const screenWidth = Dimensions.get('window').width - 20;
    const numColumns = 3;
    const tile = screenWidth / numColumns;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={navigateToTeamScreen}
            >
                <CircleImage url={team.icon} size={tile} />
            </TouchableOpacity>
            <Text style={[styles.text, { color: colors.text }]}>
                {team.abbr}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    /** styles for the component's container */
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    /** styles for the text displayed below the image */
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
    },
});
