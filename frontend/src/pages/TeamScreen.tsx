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
import { ButtonHeart } from '../animations/transition';
import { useAuth } from '@hooks/useAuth';
/**
 * This screen shows the data for a specific team as well as a roster of the players.
 * The team data is passed through a navigation parameter.
 */
import {useState} from 'react';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {SectionList, Text} from 'react-native';

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
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(showAlert);

  useEffect(() => {
    setShow(showAlert);
  }, [showAlert]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (show) {
      timeoutId = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [show]);

  const handleClick = () => {
    setShow(true);
  };

  //const submitTeamSelectionUpdates = async () => {
  //setSubmitting(true);
  //   await updateTeams(selectedTeams);
  //rosterNavigation.navigate('Dashboard');
  // setSubmitting(false);
  //};
  const handlePress = () => {
    // run code here when button is pressed
    const teamid = team.id;

    if (isLiked) {
      const updatedTeams = selectedTeams.filter((team) => team !== teamid);
      setSelectedTeams(updatedTeams); //idk if this line works.
      updateTeams(updatedTeams);
      setMessage("BRUH");
      setShow(true);
      //I clikced it relatively fast, but may want the async function!!!
      //could end up removing and adding too fast...
      //submitTeamSelectionUpdates();
    } else {
      console.log(selectedTeams);
      console.log(teamid);
      const updatedTeams = selectedTeams.concat(teamid);
      console.log(updatedTeams);
      setSelectedTeams(updatedTeams);
      updateTeams(updatedTeams);
      //I clikced it relatively fast, but may want the async function!!!
      //could end up removing and adding too fast...
    }
    setIsLiked(!isLiked); // toggle the state of the button
    //need to figure out this isliked. 

  };

  return ( //pretty sure the title does not matter.
    <View>
      <ButtonHeart onPress={handlePress} isLiked={isLiked} />


      {show && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>{message}</Text>
        </View>
      )}

    </View>
  );
};

export default ButtonHeartWrapper;


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
    if (team.players[i].position == 'Guard') {
      guards.push(team.players[i]);
    } else if (team.players[i].position == 'Forward') {
      forward.push(team.players[i]);
    } else if (team.players[i].position == 'Center') {
      center.push(team.players[i]);
    } else if (team.players[i].position == 'Forward-Center' || team.players[i].position == 'Center-Forward') {
      forwardcenter.push(team.players[i]);
    } else if (team.players[i].position == 'Forward-Guard' || team.players[i].position == 'Guard-Forward') {
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
    <View style={styles.item}>
      <PlayerSection player={item} team={team} />
    </View>
  ));
  const forwardlist = forward.map((item) => (
    <View style={styles.item}>
      <PlayerSection player={item} team={team} />
    </View>
  ));
  const centerlist = center.map((item) => (
    <View style={styles.item}>
      <PlayerSection player={item} team={team} />
    </View>
  ));
  const forwardguardlist = forwardguard.map((item) => (
    <View style={styles.item}>
      <PlayerSection player={item} team={team} />
    </View>
  ));
  const forwardcenterlist = forwardcenter.map((item) => (
    <View style={styles.item}>
      <PlayerSection player={item} team={team} />
    </View>
  ));
  const nonelist = noposition.map((item) => (
    <View style={styles.item}>
      <PlayerSection player={item} team={team} />
    </View>
  ));
  function navigateToSelectionScreen() {
    // const navigation = useNavigation();
    push('Dashboard');
  }
  const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
  const scrolling = useRef(new Animated.Value(0)).current;
  const [headerShown, setHeaderShown] = useState(false);
  // const translation = useRef(new Animated.Value(-100)).current;

  const translation = scrolling.interpolate({
    inputRange: [100, 130],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });
  const translation2 = scrolling.interpolate({
    inputRange: [100, 130],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const { colors } = useTheme();
  //attempt at Animated scrollbar at the top
  //  const [isFlatListBeingTouched, setIsFlatListBeingTouched] = useState(false);
  //  const removeHighliteWithDelay = () => {setTimeout(function(){setIsFlatListBeingTouched(false);}, 200)};

  //ICON AND ALERT ANIMATION
  const [isLiked, setIsLiked] = useState(false);

  const { authData, updateTeams } = useAuth();
  const [selectedTeams, setSelectedTeams] = useState<string[]>(
    authData?.teams ?? []
  );

  //const [submitting, setSubmitting] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(showAlert);

  useEffect(() => {
    setShow(showAlert);
  }, [showAlert]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (show) {
      timeoutId = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [show]);

  const handleClick = () => {
    setShow(true);
  };



  const [showAlert2, setShowAlert2] = useState<boolean>(false);
  const [message2, setMessage2] = useState<string>('');
  const [show2, setShow2] = useState<boolean>(showAlert);

  useEffect(() => {
    setShow2(showAlert2);
  }, [showAlert2]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (show2) {
      timeoutId = setTimeout(() => {
        setShow2(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [show2]);

  const handleClick2 = () => {
    setShow2(true);
  };
  //const submitTeamSelectionUpdates = async () => {
  //setSubmitting(true);
  //   await updateTeams(selectedTeams);
  //rosterNavigation.navigate('Dashboard');
  // setSubmitting(false);
  //};
  const teamid = team.id;
  // ...
  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      if (selectedTeams.includes(teamid)) {
        setIsLiked(true);
      }
      return () => {
        // Code to run when the screen is unfocused
      };
    }, [selectedTeams, teamid])
  );

  const handlePress = () => {
    // run code here when button is pressed

    if (isLiked) {
      const updatedTeams = selectedTeams.filter((team) => team !== teamid);
      setSelectedTeams(updatedTeams); //idk if this line works.
      updateTeams(updatedTeams);
      setMessage(team.name + " removed");
      setShow(true);
      //I clikced it relatively fast, but may want the async function!!!
      //could end up removing and adding too fast...
      //submitTeamSelectionUpdates();
    } else {
      console.log(selectedTeams);
      console.log(teamid);
      const updatedTeams = selectedTeams.concat(teamid);
      console.log(updatedTeams);
      setSelectedTeams(updatedTeams);
      updateTeams(updatedTeams);
      setMessage2(team.name + " added");
      setShow2(true);
      //I clikced it relatively fast, but may want the async function!!!
      //could end up removing and adding too fast...
    }
    setIsLiked(!isLiked); // toggle the state of the button
    //need to figure out this isliked. 

  };

  //END OF ICON AND ALERT ANIMATION
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
        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 125 }}>
          <CircleImage url={team.icon} size={150} borderColor={colors.border} />


          <View>
            <ButtonHeart onPress={handlePress} isLiked={isLiked} />

          </View>

          {show && (
            <View style={styles.alert}>
              <Text style={styles.alertText}>{message}</Text>
            </View>
          )}
          {show2 && (
            <View style={styles.alert}>
              <Text style={styles.alertText}>{message2}</Text>
            </View>
          )}


        </View>
        <ThemeText style={styles.headerText}>{team.name}</ThemeText>

        {renderIf(guardlist.length != 0, <ThemeText style={styles.mediumText}>Guards</ThemeText>)}
        <View style={styles.container}>{renderIf(guardlist, guardlist)}</View>
        {renderIf(forwardguard.length != 0, <ThemeText style={styles.mediumText} >Forward-Guards</ThemeText>)}
        <View style={styles.container}>{forwardguardlist}</View>
        {renderIf(forwardlist.length != 0, <ThemeText style={styles.mediumText}>Forwards</ThemeText>)}
        <View style={styles.container}>{forwardlist}</View>
        {renderIf(forwardcenter.length != 0, <ThemeText style={styles.mediumText}>Forward-Centers</ThemeText>)}
        <View style={styles.container}>{forwardcenterlist}</View>
        {renderIf(centerlist.length != 0, <ThemeText style={styles.mediumText}>Centers</ThemeText>)}
        <View style={styles.container}>{centerlist}</View>
        {renderIf(nonelist.length != 0, <ThemeText style={styles.mediumText}>No Position</ThemeText>)}
        <View style={styles.container}>{nonelist}</View>


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
