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
import renderIf from '../hooks/renderIf';
import { useTheme } from '@react-navigation/native';
/**
 * This screen shows the data for a specific team as well as a roster of the players.
 * The team data is passed through a navigation parameter.
 */

export const TeamScreen = () => {
    const { push } = useNavigation<RosterNavigationProp>();
    const route = useRoute<TeamScreenRouteProp>();
    const team = route.params.team;
    const guards: Player[] = [];
    const forward: Player[] = [];
    const center: Player[] = [];
    const forwardguard: Player[] = [];
    const forwardcenter: Player[] = [];
    const noposition: Player[] = [];

    for (var i = 0; i < team.players.length; i++) {
        if (team.players[i].position === 'Guard') {
            guards.push(team.players[i]);
        } else if (team.players[i].position === 'Forward') {
            forward.push(team.players[i]);
        } else if (team.players[i].position === 'Center') {
            center.push(team.players[i]);
        } else if (
            team.players[i].position === 'Forward-Center' ||
            team.players[i].position === 'Center-Forward'
        ) {
            forwardcenter.push(team.players[i]);
        } else if (
            team.players[i].position === 'Forward-Guard' ||
            team.players[i].position === 'Guard-Forward'
        ) {
            forwardguard.push(team.players[i]);
        } else {
            noposition.push(team.players[i]);
        }

        //
        //split between guards and stuff.
        //
        //
    }
    //guards arent being populated into list
    const guardlist = guards.map((item) => (
        <View style={styles.item} key={`guard-${item.id}`}>
            <PlayerSection player={item} team={team} />
        </View>
    ));
    const forwardlist = forward.map((item) => (
        <View style={styles.item} key={`forward-${item.id}`}>
            <PlayerSection player={item} team={team} />
        </View>
    ));
    const centerlist = center.map((item) => (
        <View style={styles.item} key={`center-${item.id}`}>
            <PlayerSection player={item} team={team} />
        </View>
    ));
    const forwardguardlist = forwardguard.map((item) => (
        <View style={styles.item} key={`forwardguard-${item.id}`}>
            <PlayerSection player={item} team={team} />
        </View>
    ));
    const forwardcenterlist = forwardcenter.map((item) => (
        <View style={styles.item} key={`forwardcenter-${item.id}`}>
            <PlayerSection player={item} team={team} />
        </View>
    ));
    const nonelist = noposition.map((item) => (
        <View style={styles.item} key={`nopos-${item.id}`}>
            <PlayerSection player={item} team={team} />
        </View>
    ));
    function navigateToSelectionScreen() {
        // const navigation = useNavigation();
        push('Dashboard');
    }
    // const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
    const scrolling = useRef(new Animated.Value(0)).current;
    // const [headerShown, setHeaderShown] = useState(false);
    // const translation = useRef(new Animated.Value(-100)).current;

    const translation = scrolling.interpolate({
        inputRange: [100, 130],
        outputRange: [-100, 0],
        extrapolate: 'clamp',
    });
    // const translation2 = scrolling.interpolate({
    //     inputRange: [100, 130],
    //     outputRange: [0, 100],
    //     extrapolate: 'clamp',
    // });

    const { colors } = useTheme();
    //attempt at Animated scrollbar at the top
    //  const [isFlatListBeingTouched, setIsFlatListBeingTouched] = useState(false);
    //  const removeHighliteWithDelay = () => {setTimeout(function(){setIsFlatListBeingTouched(false);}, 200)};

    return (
        <View>
            <Animated.ScrollView
                //       style={{transform: [
                //          { translateY: translation2 },
                //     ], }}
                //attempt at Animated scrollbar at the top
                //      onTouchStart={(_) => setIsFlatListBeingTouched(true)}
                //     onMomentumScrollEnd={(_) => { setIsFlatListBeingTouched(false);}}
                //    onTouchEnd={(_) => removeHighliteWithDelay()}
                //      onScrollEndDrag={(_) => removeHighliteWithDelay()}
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

                //</View>  ListHeaderComponent={
                //        <>
                //            <CircleImage url={team.icon} size={150} />
                //              <Text style={styles.headerText}>{team.name}</Text>
                //          </>
                //       }
                //        ListHeaderComponentStyle={styles.headerContainer}
                //         contentContainerStyle={styles.container}
            >
                <View style={{ alignItems: 'center' }}>
                    <CircleImage
                        url={team.icon}
                        size={150}
                        borderColor={colors.border}
                    />
                    <ThemeText style={styles.headerText}>{team.name}</ThemeText>
                </View>
                {renderIf(
                    guardlist.length !== 0,
                    <ThemeText style={styles.mediumText}>Guards</ThemeText>
                )}
                <View style={styles.container}>
                    {renderIf(guardlist, guardlist)}
                </View>
                {renderIf(
                    forwardguard.length !== 0,
                    <ThemeText style={styles.mediumText}>
                        Forward-Guards
                    </ThemeText>
                )}
                <View style={styles.container}>{forwardguardlist}</View>
                {renderIf(
                    forwardlist.length !== 0,
                    <ThemeText style={styles.mediumText}>Forwards</ThemeText>
                )}
                <View style={styles.container}>{forwardlist}</View>
                {renderIf(
                    forwardcenter.length !== 0,
                    <ThemeText style={styles.mediumText}>
                        Forward-Centers
                    </ThemeText>
                )}
                <View style={styles.container}>{forwardcenterlist}</View>
                {renderIf(
                    centerlist.length !== 0,
                    <ThemeText style={styles.mediumText}>Centers</ThemeText>
                )}
                <View style={styles.container}>{centerlist}</View>
                {renderIf(
                    nonelist.length !== 0,
                    <ThemeText style={styles.mediumText}>No Position</ThemeText>
                )}
                <View style={styles.container}>{nonelist}</View>
            </Animated.ScrollView>

            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    backgroundColor: colors.background,
                    transform: [{ translateY: translation }],
                }}
            >
                <PrimaryButton
                    onPress={navigateToSelectionScreen}
                    text="Back"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        //  backgroundColor: '#ccc',
        height: 100,
        width: '33.33%',
        // paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 50,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   borderWidth: 1,
        //   borderColor: '#000',
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
        //  borderWidth: 2,
        //  borderColor: 'black'
    },
});
