import { CircleImage, PlayerSection, ThemeText } from '@components/index';
import { useRoute } from '@react-navigation/native';
import { TeamScreenRouteProp } from '../types/Navigation';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../types/Navigation';

import { Player } from './../types/Player';
import { PrimaryButton } from '@components/index';
import { useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ButtonHeart } from '../animations/transition';
import { useAuth } from '@hooks/useAuth';
/**
 * This screen shows the data for a specific team as well as a roster of the players.
 * The team data is passed through a navigation parameter.
 */
import { useState } from 'react';
import { useEffect } from 'react';
//may need to get rid of this wrapper to include alert inthe bigger view

//wrapper for teams, a second wrapper will be made for favoriting players
//this buttonwrapper is not used anymore but keeping it just in case
const ButtonHeartWrapper = () => {
    const [isLiked, setIsLiked] = useState(false);
    const route = useRoute<TeamScreenRouteProp>(); //variable also declared in teamScreen
    const team = route.params.team;
    const { authData, updateTeams } = useAuth();
    const [selectedTeams, setSelectedTeams] = useState<string[]>(
        authData?.teams ?? []
    );
    //const [submitting, setSubmitting] = useState<boolean>(false);

    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        setShowAlert(showAlert);
    }, [showAlert]);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (showAlert) {
            timeoutId = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [showAlert]);

    const handlePress = () => {
        // run code here when button is pressed
        const teamid = team.id;

        if (isLiked) {
            const updatedTeams = selectedTeams.filter(
                (team) => team !== teamid
            );
            setSelectedTeams(updatedTeams); //idk if this line works.
            updateTeams(updatedTeams);
            //in here add a function grab a player frmo the team an see how it works!!!.
            //or add this into the player section if I cant grab a player

            setShowAlert(true);
            //I clikced it relatively fast, but may want the async function!!!
            //could end up removing and adding too fast...
            //submitTeamSelectionUpdates();
        } else {
            const updatedTeams = selectedTeams.concat(teamid);
            setSelectedTeams(updatedTeams);
            updateTeams(updatedTeams);
            //I clikced it relatively fast, but may want the async function!!!
            //could end up removing and adding too fast...
        }
        setIsLiked(!isLiked); // toggle the state of the button
        //need to figure out this isliked.
    };

    return (
        //pretty sure the title does not matter.
        <View>
            <ButtonHeart onPress={handlePress} isLiked={isLiked} />
        </View>
    );
};

export default ButtonHeartWrapper;

export const TeamScreen = () => {
    const { goBack } = useNavigation<RosterNavigationProp>();
    const route = useRoute<TeamScreenRouteProp>();
    const team = route.params.team;
    const liked: Player[] = [];

    const { authData } = useAuth();

    for (var i = 0; i < team.players.length; i++) {
        // I did not need to add playerIsliked so many times whatever though
        const playerIsLiked = authData?.players?.includes(team.players[i]._id);
        if (playerIsLiked) {
            liked.push(team.players[i]);
        }
    }

    const scrolling = useRef(new Animated.Value(0)).current;
    // const translation = useRef(new Animated.Value(-100)).current;

    const translation = scrolling.interpolate({
        inputRange: [100, 130],
        outputRange: [-100, 0],
        extrapolate: 'clamp',
    });

    const { colors } = useTheme();
    //attempt at Animated scrollbar at the top
    //  const [isFlatListBeingTouched, setIsFlatListBeingTouched] = useState(false);
    //  const removeHighliteWithDelay = () => {setTimeout(function(){setIsFlatListBeingTouched(false);}, 200)};

    //ICON AND ALERT ANIMATION

    //const [submitting, setSubmitting] = useState<boolean>(false);

    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (showAlert) {
            timeoutId = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [showAlert]);

    const [showAlert2, setShowAlert2] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (showAlert2) {
            timeoutId = setTimeout(() => {
                setShowAlert2(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [showAlert2]);
    return (
        <View>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scrolling,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    <CircleImage
                        url={team.icon}
                        size={150}
                        borderColor={colors.border}
                    />
                </View>
                <ThemeText style={styles.headerText}>{team.name}</ThemeText>

                {liked.length > 0 && (
                    <>
                        <ThemeText style={styles.mediumText}>
                            Favorite Players
                        </ThemeText>
                        <View style={styles.container}>
                            {liked.map((player) => (
                                <PlayerSection
                                    player={player}
                                    team={team}
                                    key={player._id}
                                />
                            ))}
                        </View>

                        <ThemeText style={styles.mediumText}>
                            All Players
                        </ThemeText>
                    </>
                )}
                <View style={styles.container}>
                    {team.players.map((player) => {
                        if (liked.includes(player)) return null;
                        return (
                            <PlayerSection
                                player={player}
                                team={team}
                                key={player._id}
                            />
                        );
                    })}
                </View>
            </Animated.ScrollView>

            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    backgroundColor: '#DEDEDE',
                    transform: [{ translateY: translation }],
                }}
            >
                <PrimaryButton onPress={() => goBack()} text="Back" />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        height: 100,
        width: '33.33%',
        paddingVertical: 20,
        marginVertical: 50,
    },

    container: {
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
    mediumText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 15,
    },

    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 10,
        marginTop: -20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    alert: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 20,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
