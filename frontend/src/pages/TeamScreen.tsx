import { CircleImage, PlayerSection } from '@components/index';
import { useRoute } from '@react-navigation/native';
import { TeamScreenRouteProp } from '../types/Navigation';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp } from './../types/Navigation';
import {
    StatLeaderboard,
    PrimaryButton,
    FullError,
    Seperator,
} from '@components/index';
import {
    Animated,
    Image,
    ScrollView,
  } from 'react-native';
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
//attempt at Animated scrollbar at the top
   //  const [isFlatListBeingTouched, setIsFlatListBeingTouched] = useState(false);
   //  const removeHighliteWithDelay = () => {setTimeout(function(){setIsFlatListBeingTouched(false);}, 200)};

    return (
        <View>
            <FlatList
                        //attempt at Animated scrollbar at the top
                  //      onTouchStart={(_) => setIsFlatListBeingTouched(true)}
                   //     onMomentumScrollEnd={(_) => { setIsFlatListBeingTouched(false);}}      
                    //    onTouchEnd={(_) => removeHighliteWithDelay()}      
                  //      onScrollEndDrag={(_) => removeHighliteWithDelay()}
                    
                data={team.players}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <PlayerSection player={item} team={team} />}
                ListHeaderComponent={
                    <>
                       <PrimaryButton
                onPress={navigateToSelectionScreen}
                text="Back"
            />
                        <CircleImage url={team.icon} size={150} />
                        <Text style={styles.headerText}>{team.name}</Text>
                    </>
                }
                ListHeaderComponentStyle={styles.headerContainer}
                contentContainerStyle={styles.container}
            />
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
