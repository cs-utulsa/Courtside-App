import { ToggleButton } from '@components/buttons';
import React, { FC, useState } from 'react';
import { Text, Animated, StyleSheet, FlatList, View, Pressable, Image, TouchableOpacity } from 'react-native'; //animated animation related
import AntIcon from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { RosterNavigationProp, StatsNavigationProp } from './../../types/Navigation';

import { PrimaryButton } from '@components/buttons';

import { StatsStack } from '../../Navigation/StatsStack'; //may not need
import { RosterStack } from '../../Navigation/RosterStack'; //may not need
type player = {
  fname: string;
  lname: string;
  uri: string;
//   playerimage: String;
}

type RosterSectionProps = {
    /** the title of the section */
    name: string;
    uri: string;
    players: player[];
    
    /** the stats that are within this section */
    //data: { id: string; name: string }[];
    /** the stats that are currently selected, this is stored as state in the parent component */
 //   selectedStats: string[];
    /** method that adds a stat to the list of currently selected stats, defined in parent component  */
 //   addStat: (stat: string) => void;
    /** method that removes a stat from the list of currently selected stats, defined in parent component  */
  //  removeStat: (stat: string) => void;
};

/**
 * A component
 * 
 *
 * @component
 * @example
 * const title = "Defense Stats"
 *      />
 * );
 */


export const RosterSection: FC<RosterSectionProps> = ({
    name,
    uri,
    players,
   // data,
   // selectedStats,
  //  addStat,
   // removeStat,
   
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const { push } = useNavigation<RosterNavigationProp>(); //can I just use statsnavigation prop??
    function navigateToSelectionScreen() {
      
       push('Players', {foo: players});
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
    return (
        
        <View style={styles.Container}>

         <TouchableOpacity activeOpacity = { .5 } onPress={navigateToSelectionScreen }>    
         <Image
          source={{ uri: uri }}
          style={styles.circleImageLayout}
          resizeMode={"cover"}
        />
       </TouchableOpacity>
        <Text style={styles.text}>{name}</Text>


           
        </View>
    );
};


const styles = StyleSheet.create({
    Container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      margin: 10
    },
    circleImageLayout: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      borderColor: 'grey',
      borderWidth: 2
    
    },
    text: {
      fontSize: 25,
      textAlign: 'center',
      margin: 5
    }
  });






  type PlayerSectionProps = {
    /** the title of the section */
    name: string;
    uri: string;
    
    /** the stats that are within this section */
    //data: { id: string; name: string }[];
    /** the stats that are currently selected, this is stored as state in the parent component */
 //   selectedStats: string[];
    /** method that adds a stat to the list of currently selected stats, defined in parent component  */
 //   addStat: (stat: string) => void;
    /** method that removes a stat from the list of currently selected stats, defined in parent component  */
  //  removeStat: (stat: string) => void;
};

/**
 * A component
 * 
 *
 * @component
 * @example
 * const title = "Defense Stats"
 *      />
 * );
 */


export const PlayerSection: FC<PlayerSectionProps> = ({
    name,
    uri,
    
   // data,
   // selectedStats,
  //  addStat,
   // removeStat,
   
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const { push } = useNavigation<RosterNavigationProp>();
    function navigateToSelectionScreen() {
       push('Players');
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
    return (
        
        <View style={styles.Container}>

         <TouchableOpacity activeOpacity = { .5 } onPress={navigateToSelectionScreen }>    
         <Image
          source={{ uri: uri }}
          style={styles.circleImageLayout}
          resizeMode={"cover"}
        />
       </TouchableOpacity>
        <Text style={styles.text}>{name}</Text>


           
        </View>
    );
};


