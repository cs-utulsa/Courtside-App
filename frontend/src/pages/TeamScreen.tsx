import { CircleImage, PlayerSection } from '@components/index';
import { useRoute } from '@react-navigation/native';
import { TeamScreenRouteProp } from '../types/Navigation';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../types/Navigation';
import {
    PrimaryButton,
} from '@components/index';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView } from 'react-native';
/**
 * This screen shows the data for a specific team as well as a roster of the players.
 * The team data is passed through a navigation parameter.
 */
export const TeamScreen = () => {
    const { push } = useNavigation<RosterNavigationProp>();
    const route = useRoute<TeamScreenRouteProp>();
    const team = route.params.team;
    function navigateToSelectionScreen() {
        // const navigation = useNavigation(); 
       push('Dashboard');
 
     }
     const scrolling = useRef(new Animated.Value(0)).current;
     const [headerShown, setHeaderShown] = useState(false);
   //  const translation = useRef(new Animated.Value(-100)).current;
     
//const translation = useRef(new Animated.Value(-100)).current;
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
//attempt at Animated scrollbar at the top
   //  const [isFlatListBeingTouched, setIsFlatListBeingTouched] = useState(false);
   //  const removeHighliteWithDelay = () => {setTimeout(function(){setIsFlatListBeingTouched(false);}, 200)};

  
    return (
        
        <View>
    
            <Animated.FlatList
     //       style={{transform: [
      //          { translateY: translation2 },
         //     ], }}
                        //attempt at Animated scrollbar at the top
                  //      onTouchStart={(_) => setIsFlatListBeingTouched(true)}
                   //     onMomentumScrollEnd={(_) => { setIsFlatListBeingTouched(false);}}      
                    //    onTouchEnd={(_) => removeHighliteWithDelay()}      
                  //      onScrollEndDrag={(_) => removeHighliteWithDelay()}
                  onScroll={Animated.event(
                    [{
                      nativeEvent: {
                        contentOffset: {
                          y: scrolling,
                        },
                      },
                    }],
                    { useNativeDriver: true },
                  )}
                data={team.players}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <PlayerSection player={item} team={team} />}
                ListHeaderComponent={
                    <>
                        <CircleImage url={team.icon} size={150} />
                        <Text style={styles.headerText}>{team.name}</Text>
                    </>
                }
                ListHeaderComponentStyle={styles.headerContainer}
                contentContainerStyle={styles.container}
            />

<Animated.View
         
         style={{
           position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           height: 80,
           backgroundColor: 'tomato',
           transform: [
             { translateY: translation },
           ],
         }}>
                                    <PrimaryButton
                 onPress={navigateToSelectionScreen}
                 text="Back"
             />
             </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
});
