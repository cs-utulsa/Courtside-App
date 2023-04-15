import { PlayerScreenRouteProp } from '../types/Navigation';
import React, { useState } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { Player } from './../types/Player';
import { Team } from './../types/Team';
import { Card, CircleImage, ThemeText } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../types/Navigation';
import { MaterialIcons } from '@expo/vector-icons'; 
import { PrimaryButton } from '@components/index';
import { ButtonHeart } from '../animations/transition';
import { Toggler } from '../animations/transition';
/**
 * This screen shows the data for one player.
 * The player data is passed through a navigation parameter
 */

export const PlayerScreen = () => {
    const { push } = useNavigation<RosterNavigationProp>();
    const route = useRoute<PlayerScreenRouteProp>();
    const player: Player = route.params.player;
    const teamback: Team = route.params.team;
    function navigateToSelectionScreen() {
        // const navigation = useNavigation();

            push('Team', { team: teamback });

    }

    const { colors } = useTheme();

    const [isToggled, setIsToggled] = useState(true);

    const handleToggle = () => {
      setIsToggled(!isToggled);
    };
    return (
        
        <ScrollView contentContainerStyle={styles.container}>
            
            <PrimaryButton onPress={navigateToSelectionScreen} text="Back" />
            <View style={{flexDirection: 'row', marginLeft:60}}> 
        
           <CircleImage
                url={player.headshot}
                size={150}
                resizeMode="cover"
                imageRatio={0.9}
                borderColor={colors.border}
            />
            <View style={{marginLeft:-35, marginTop:-20}}>
            <ButtonHeart/>
            </View>
            </View>
            <ThemeText style={styles.text}>{player.name}</ThemeText>
            <ThemeText style={styles.text}>{player.team}</ThemeText>

            <Card>
            <Toggler onPress={handleToggle}/>
            {isToggled &&
                <View style={styles.leaderboardBlock}>
                    
                    <View>
                        <ThemeText style={styles.text}>Position:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {player.position}
                        </ThemeText>
                        <ThemeText style={styles.text}>Height:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.height}
                        </ThemeText>
                        <ThemeText style={styles.text}>Weight:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.weight}
                        </ThemeText>
                        <ThemeText style={styles.text}>Age:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.age}
                        </ThemeText>
                    </View>

                    <View style={styles.statstwo}>
                        <ThemeText style={styles.text}>Jersey No. : </ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.number}
                        </ThemeText>
                        <ThemeText style={styles.text}>Career: </ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.experience}
                        </ThemeText>
                        <ThemeText style={styles.text}>Draft Pick:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.draft}
                        </ThemeText>
                        <ThemeText style={styles.text}>Country:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.country}
                        </ThemeText>
                    </View>
                </View>
}
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        // textAlign: '',
        fontWeight: 'bold',
        margin: 3,
    },
    statstwo: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginLeft: 40,
    },
    listtext: {
        fontSize: 20,
        // textAlign: '',
        //  fontWeight: 'bold',
        margin: 5,
    },
    leaderboardBlock: {
        flexDirection: 'row',
    },
});
