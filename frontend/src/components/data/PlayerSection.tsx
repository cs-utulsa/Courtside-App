import { useNavigation, useTheme } from '@react-navigation/native';
import { RosterNavigationProp } from './../../types/Navigation';
import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Player } from './../../types/Player';
import { Team } from './../../types/Team';
import { CircleImage } from '../images/CircleImage';
import { ThemeText } from '../misc/ThemeText';

type PlayerSectionProps = {
    /** the player to be shown in this component */
    player: Player;
    team: Team;
};

/**
 * This component shows a headshot of a player and their name. When clicked it navigates to the specific page for that team.
 * This component is meant to be included in a FlatList with others
 */
export const PlayerSection: FC<PlayerSectionProps> = ({ player, team }) => {
    const { push } = useNavigation<RosterNavigationProp>();
    function navigateToPlayerScreen() {
        push('Player', { player, team });
    }

    const screenWidth = Dimensions.get('window').width - 20;
    const numColumns = 3;
    const tile = screenWidth / numColumns;
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={navigateToPlayerScreen}
            >
                <CircleImage
                    url={player.headshot}
                    size={tile}
                    imageRatio={0.9}
                    resizeMode="cover"
                    borderColor={colors.border}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <ThemeText style={styles.text}>{player.name}</ThemeText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
        width: 100,
    },
    textContainer: {
        height: 50,
    },
});
