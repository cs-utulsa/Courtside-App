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
import renderIf from '../hooks/renderIf';
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

    const playerIsLiked = authData?.players?.includes(player._id);

    const onPress = async () => {
        if (!authData?.players) return;
        if (!playerIsLiked) {
            await updatePlayers([...authData.players, player._id]);
        } else {
            await updatePlayers(
                authData.players.filter((p) => p !== player._id)
            );
        }
    };

    const [isToggled, setIsToggled] = useState(true);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    //idk how to comment in the tag view block but some data wasn't transferring for nhl, so I just put some booleans to get rid of the field
    //if continuing to work on the app, could continue to do this!
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <PrimaryButton onPress={navigateToSelectionScreen} text="Back" />
            <View style={{ flexDirection: 'row', marginLeft: 60 }}>
                <CircleImage
                    url={player.headshot}
                    size={150}
                    resizeMode="cover"
                    imageRatio={0.9}
                    borderColor={colors.border}
                />
                <View style={{ marginLeft: -35, marginTop: -20 }}>
                    <ButtonHeart isLiked={!!playerIsLiked} onPress={onPress} />
                </View>
            </View>
            <ThemeText style={styles.text}>{player.name}</ThemeText>
            <ThemeText style={styles.text}>{player.team}</ThemeText>

            <Card>
                <Toggler onPress={handleToggle} isToggled={isToggled} />
                {isToggled && (
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
                            <ThemeText style={styles.text}>
                                Jersey No. :{' '}
                            </ThemeText>
                            <ThemeText style={styles.listtext}>
                                {' '}
                                {player.number}
                            </ThemeText>

                            {renderIf(player.experience,
                            <View>
                                <ThemeText style={styles.text}>
                                    Career:
                                </ThemeText>
                            
                            <ThemeText style={styles.listtext}>
                                {' '}
                                {player.experience}
                            </ThemeText>
                            </View>
                            )}
                            {renderIf(player.draft,
                            <View>
                                <ThemeText style={styles.text}>
                                    Draft Pick:
                                </ThemeText>
                            
                            <ThemeText style={styles.listtext}>
                                {' '}
                                {player.draft}
                            </ThemeText>
                            </View>
                            )}
                            {renderIf(player.country,
                            <View>
                                <ThemeText style={styles.text}>
                                    Draft Pick:
                                </ThemeText>
                            
                            <ThemeText style={styles.listtext}>
                                {' '}
                                {player.country}
                            </ThemeText>
                            </View>
                            )}

                            {player.nationality && (
                                <ThemeText style={styles.text}>
                                    Country:
                                </ThemeText>
                                
                            )}
                            <ThemeText style={styles.listtext}>
                                {' '}
                                {player.nationality}
                            </ThemeText>


                            {renderIf(player.shoots == "L",
                            <View>
                                <ThemeText style={styles.text}>
                                    Shoots: 
                                </ThemeText>
                            
                            <ThemeText style={styles.listtext}>
                                {' '}
                                Left Handed
                            </ThemeText>
                            </View>
                            )}
                            {renderIf(player.shoots == "R",
                            <View>
                                <ThemeText style={styles.text}>
                                    Shoots: 
                                </ThemeText>
                            
                            <ThemeText style={styles.listtext}>
                                {' '}
                                Right Handed
                            </ThemeText>
                            </View>
                            )}


                            
                            

                        </View>
                    </View>
                )}

                {!isToggled && (
                    <View style={styles.leaderboardBlock}>
                        <View>
                            {renderIf(player.pts, <ThemeText style={styles.listtext}>
                                Points: {player.pts}
                            </ThemeText>)}

                            {renderIf(player.reb, <ThemeText style={styles.listtext}>
                                Rebounds: {player.reb}
                            </ThemeText>)}
                            {renderIf(player.ast, <ThemeText style={styles.listtext}>
                                Assists: {player.ast}
                            </ThemeText>)}

                            {renderIf(player.stl, <ThemeText style={styles.listtext}>
                                Steals: {player.stl}
                            </ThemeText>)}

                            {renderIf(player.tov, <ThemeText style={styles.listtext}>
                                Turnovers: {player.tov}
                            </ThemeText>)}

                            {renderIf(player.blk, <ThemeText style={styles.listtext}>
                                Blocks: {player.blk}
                            </ThemeText>)}

                            {renderIf(player.games, <ThemeText style={styles.listtext}>
                                Games Played: {player.games}
                            </ThemeText>)}
                        </View>

                        <View style={styles.statstwo}>
                        {renderIf(player.games_played, <ThemeText style={styles.listtext}>
                                Games Played: {player.games_played}
                            </ThemeText>)}

                            {renderIf(player.plus_minus, <ThemeText style={styles.listtext}>
                                Plus Minus: {player.plus_minus}
                            </ThemeText>)}
                            {renderIf(player.fg3_pct, <ThemeText style={styles.listtext}>
                                3 point %: {player.fg3_pct}
                            </ThemeText>)}

                            {renderIf(player.ft_pct, <ThemeText style={styles.listtext}>
                                Free Throw %: {player.ft_pct}
                            </ThemeText>)}

                            {renderIf(player.fg_pct, <ThemeText style={styles.listtext}>
                                Feild Goal %: {player.fg_pct}
                            </ThemeText>)}


                            {renderIf(player.pts, <ThemeText style={styles.listtext}>
                                Points: {player.pts}
                            </ThemeText>)}

                            {renderIf(player.goals, <ThemeText style={styles.listtext}>
                                Goals: {player.goals}
                            </ThemeText>)}

                            {renderIf(player.shots, <ThemeText style={styles.listtext}>
                                Shots: {player.shots}
                            </ThemeText>)}
                            {renderIf(player.GameWinningGoals, <ThemeText style={styles.listtext}>
                                game winners: {player.GameWInningGoals}
                            </ThemeText>)}

                            {renderIf(player.shots, <ThemeText style={styles.listtext}>
                                Shots: {player.shots}
                            </ThemeText>)}

                            {renderIf(player.blocked, <ThemeText style={styles.listtext}>
                                Blocked Shots: {player.blocked}
                            </ThemeText>)}
                        </View>
                    </View>
                )}
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
