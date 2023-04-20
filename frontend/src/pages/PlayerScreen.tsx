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
import { useAuth } from '@hooks/useAuth';
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
    const { authData, updatePlayers } = useAuth();

    const playerIsLiked = authData?.players?.includes(player.id);

    const onPress = async () => {
        if (!authData?.players) return;

        if (!playerIsLiked) {
            updatePlayers([...authData.players, player.id]);
        } else {
            updatePlayers(authData.players.filter(p => p !== player.id));
        }
    }

    const [isToggled, setIsToggled] = useState(true);

    const handleToggle = () => {
      setIsToggled(!isToggled);
    };

    //idk how to comment in the tag view block but some data wasn't transferring for nhl, so I just put some booleans to get rid of the field
    //if continuing to work on the app, could continue to do this!
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
            <ButtonHeart isLiked={!!playerIsLiked} onPress={onPress} />
            </View>
            </View>
            <ThemeText style={styles.text}>{player.name}</ThemeText>
            <ThemeText style={styles.text}>{player.team}</ThemeText>

            <Card>
            <Toggler onPress={handleToggle} isToggled={isToggled}/>
            {isToggled &&
                <View style={styles.leaderboardBlock}>
                    
                    <View>
                        <ThemeText style={styles.text}>Position:</ThemeText>
                        <ThemeText style={styles.listtext}>
                            {player.position} {player.pos_name}
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

                    
                       {player.experience && <ThemeText style={styles.text}>Career: </ThemeText>}
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.experience}
                        </ThemeText>
                       { player.draft && <ThemeText style={styles.text}>Draft Pick:</ThemeText> }
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.draft}
                        </ThemeText>
                      { player.country && <ThemeText style={styles.text}>Country:</ThemeText> }
                        <ThemeText style={styles.listtext}>
                            {' '}
                            {player.country}
                        </ThemeText>
                    </View>
                </View>
}

{!isToggled &&  <View style={styles.leaderboardBlock}>
                    
<View>
                        
                        <ThemeText style={styles.listtext}>
                        Points: {player.pts}
                        </ThemeText>
            
                        <ThemeText style={styles.listtext}>
                            
                           Rebounds: {player.reb}
                        </ThemeText>
                        <ThemeText style={styles.listtext}>
                            
                        Assists:  {player.ast}
                        </ThemeText>
                    
                        <ThemeText style={styles.listtext}>
                       
                        Steals:  {player.stl}
                        </ThemeText>

                        <ThemeText style={styles.listtext}>
                        Turnovers: {player.tov}
                        </ThemeText>
            
                        <ThemeText style={styles.listtext}>
                            
                           Blocks: {player.blk}
                        </ThemeText>
                    
                       
                    </View>

                    <View style={styles.statstwo}>

                    <ThemeText style={styles.listtext}>
                            
                            Games Played:  {player.games_played}
                            </ThemeText>
                        
                            <ThemeText style={styles.listtext}>
                           
                            Plus Minus:  {player.plus_minus}
                            </ThemeText>
                    <ThemeText style={styles.listtext}>
                        3 point %: {player.fg3_pct}
                        </ThemeText>
            
                        <ThemeText style={styles.listtext}>
                            
                        free throw %: {player.ft_pct}
                        </ThemeText>
               
                        <ThemeText style={styles.listtext}>
                       
                       field goal %:  {player.fg_pct}
                        </ThemeText>

                    </View>
                </View>}
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
        fontSize: 18,
        // textAlign: '',
        //  fontWeight: 'bold',
        margin: 8,
    },
    leaderboardBlock: {
        flexDirection: 'row',
    },
});
