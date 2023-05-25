import { PlayerScreenRouteProp } from '../types/Navigation';
import React, { useState } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, LogBox } from 'react-native';
import { Player } from './../types/Player';
import { Team } from './../types/Team';
import { Card, CircleImage, ThemeText } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../types/Navigation';
import { PrimaryButton } from '@components/index';
import { ButtonHeart } from '../animations/transition';
import { Toggler } from '../animations/transition';
import { useAuth } from '@hooks/useAuth';
import renderIf from '../hooks/renderIf';
LogBox.ignoreAllLogs();
/**
 * This screen shows the data for one player.
 * The player data is passed through a navigation parameter
 */

const StatNumber = ({ num, title }: { num: number; title: string }) => {
    return (
        <View style={styles.statContainer}>
            <ThemeText style={styles.statNumber}>{num}</ThemeText>
            <ThemeText style={styles.statsText}>{title}</ThemeText>
        </View>
    );
};

export const PlayerScreen = () => {
    const { goBack } = useNavigation<RosterNavigationProp>();
    const route = useRoute<PlayerScreenRouteProp>();
    const player: Player = route.params.player;
    const teamback: Team = route.params.team;

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
            <PrimaryButton onPress={() => goBack()} text="Back" />
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
            <ThemeText style={styles.text}>{teamback.name}</ThemeText>

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
                            <ThemeText style={styles.text}>Jersey: </ThemeText>
                            <ThemeText style={styles.listtext}>
                                {' '}
                                {player.number}
                            </ThemeText>

                            {player.experience ? (
                                <View>
                                    <ThemeText style={styles.text}>
                                        Career:
                                    </ThemeText>

                                    <ThemeText style={styles.listtext}>
                                        {' '}
                                        {player.experience}
                                    </ThemeText>
                                </View>
                            ) : (
                                <></>
                            )}

                            {player.draft ? (
                                <View>
                                    <ThemeText style={styles.text}>
                                        Draft Pick:
                                    </ThemeText>

                                    <ThemeText style={styles.listtext}>
                                        {' '}
                                        {player.draft}
                                    </ThemeText>
                                </View>
                            ) : (
                                <></>
                            )}
                            {renderIf(
                                player.country,
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

                            {player.nationality ? (
                                <View>
                                    <ThemeText style={styles.text}>
                                        Country:
                                    </ThemeText>

                                    <ThemeText style={styles.listtext}>
                                        {' '}
                                        {player.nationality}
                                    </ThemeText>
                                </View>
                            ) : (
                                <></>
                            )}

                            {player.shoots === 'L' ? (
                                <View>
                                    <ThemeText style={styles.text}>
                                        Shoots:
                                    </ThemeText>

                                    <ThemeText style={styles.listtext}>
                                        {' '}
                                        Left Handed
                                    </ThemeText>
                                </View>
                            ) : (
                                <></>
                            )}
                            {player.shoots === 'R' ? (
                                <View>
                                    <ThemeText style={styles.text}>
                                        Shoots:
                                    </ThemeText>

                                    <ThemeText style={styles.listtext}>
                                        {' '}
                                        Right Handed
                                    </ThemeText>
                                </View>
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                )}

                {!isToggled && (
                    <View style={styles.leaderboardBlock}>
                        <View>
                            {renderIf(
                                player.pts,
                                <StatNumber num={player.pts} title="Points" />
                            )}

                            {renderIf(
                                player.reb,
                                <StatNumber num={player.reb} title="Rebounds" />
                            )}
                            {renderIf(
                                player.ast,
                                <StatNumber num={player.ast} title="Assists" />
                            )}

                            {renderIf(
                                player.stl,
                                <StatNumber num={player.stl} title="Steals" />
                            )}

                            {renderIf(
                                player.tov,
                                <StatNumber
                                    num={player.tov}
                                    title="Turnovers"
                                />
                            )}

                            {renderIf(
                                player.blk,
                                <StatNumber num={player.blk} title="Blocks" />
                            )}

                            {renderIf(
                                player.games,
                                <StatNumber num={player.games} title="Games" />
                            )}

                            {renderIf(
                                player.penaltyMinutes,
                                <StatNumber
                                    num={Number(player.penaltyMinutes)}
                                    title="Penalty Min"
                                />
                            )}

                            {renderIf(
                                player.blocked,
                                <StatNumber
                                    num={player.blocked}
                                    title="Blocked Shots"
                                />
                            )}

                            {renderIf(
                                player.timeOnIcePerGame,
                                <StatNumber
                                    num={Number(player.timeOnIcePerGame)}
                                    title="Time on Ice"
                                />
                            )}
                            {renderIf(
                                player.gameWinningGoals,
                                <StatNumber
                                    num={Number(player.gameWinningGoals)}
                                    title="Game Winners"
                                />
                            )}
                        </View>

                        <View style={styles.secondColumn}>
                            {renderIf(
                                player.games_played,
                                <StatNumber
                                    num={player.games_played}
                                    title="Games"
                                />
                            )}

                            {renderIf(
                                player.plus_minus,
                                <StatNumber
                                    num={player.plus_minus}
                                    title="Plus Minus"
                                />
                            )}
                            {renderIf(
                                player.fg3_pct,
                                <StatNumber
                                    num={player.fg3_pct}
                                    title="3 Pt %"
                                />
                            )}

                            {renderIf(
                                player.ft_pct,
                                <StatNumber
                                    num={player.ft_pct}
                                    title="Free Throw %"
                                />
                            )}

                            {renderIf(
                                player.fg_pct,
                                <StatNumber
                                    num={player.fg_pct}
                                    title="Field Goal %"
                                />
                            )}

                            {renderIf(
                                player.goals,
                                <StatNumber num={player.goals} title="Goals" />
                            )}

                            {renderIf(
                                player.shots,
                                <StatNumber num={player.shots} title="Shots" />
                            )}

                            {renderIf(
                                player.plusMinus,
                                <StatNumber
                                    num={player.plusMinus}
                                    title="Plus Minus"
                                />
                            )}
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
        margin: 3,
    },
    statstwo: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginLeft: 40,
    },
    secondColumn: {
        marginLeft: 40,
    },
    listtext: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    leaderboardBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    statsText: {
        fontSize: 16,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        marginBottom: 10,
    },
});
