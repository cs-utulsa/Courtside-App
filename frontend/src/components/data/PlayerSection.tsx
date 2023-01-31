import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../../types/Navigation';
import React, { FC } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Player } from './../../types/Player';
import { CircleImage } from '@components/images/CircleImage';

type PlayerSectionProps = {
    /** the player to be shown in this component */
    player: Player;
};

/**
 * This component shows a headshot of a player and their name. When clicked it navigates to the specific page for that team.
 * This component is meant to be included in a FlatList with others
 */
export const PlayerSection: FC<PlayerSectionProps> = ({ player }) => {
    const { push } = useNavigation<RosterNavigationProp>();

    function navigateToPlayerScreen() {
        push('Player', { player });
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

    const screenWidth = Dimensions.get('window').width - 20;
    const numColumns = 3;
    const tile = screenWidth / numColumns;

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
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{player.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
    },
    textContainer: {
        height: 50,
    },
});
