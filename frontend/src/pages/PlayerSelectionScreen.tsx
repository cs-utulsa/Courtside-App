//external imports
import React, { useCallback, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, TextInput, Text,TextInputChangeEventData } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

//custom components
import { FAB, FullError, SearchBox, PlayersList } from '@components/index';

// constants
import { useNavigation, useTheme } from '@react-navigation/native';
import { RosterNavigationProp } from '../types/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useAllTeams } from '@hooks/index';
import { playerIcon } from '../types/Player';
import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@dwarvesf/react-hooks';
import axios from 'axios';
/** This component lets the user choose what teams they want to follow */
export const PlayerSelectionScreen = () => {
    const rosterNavigation = useNavigation<RosterNavigationProp>();
    const { colors } = useTheme();

    const { authData, updateTeams } = useAuth();
    const [selectedTeams, setSelectedTeams] = useState<string[]>(
        authData?.teams ?? []
    );

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [result, setResult] = useState<playerIcon[]>([]);
   
 
      


    const submitTeamSelectionUpdates = async () => {
        setSubmitting(true);

        await updateTeams(selectedTeams);
        rosterNavigation.navigate('Dashboard');

        setSubmitting(false);
    };

   

    const addTeam = (id: string) => setSelectedTeams((prev) => prev.concat(id));
    const removeTeam = (id: string) =>
        setSelectedTeams((prev) => prev.filter((team) => team !== id));
   
   
   
        const [query, setQuery] = useState<string>("");
        // basically just sets a 300ms delay on debouncedQuery updaing
        const debouncedQuery = useDebounce(query, 300);
      
        const { data } = useQuery({ //maybe queryKey does do something and thats why the search sucks...
          queryKey: ['players', debouncedQuery], //what does queryKey actually do...
          queryFn: () => {
            return axios.get(`${DEVELOPMENT_API}/nba/player/${debouncedQuery}`).then(res => res.data);
          }
        })
        return (    //<Text>{JSON.stringify(data)}</Text>
        
           
        <View style={styles.container}>
            {
                <>
                        <TextInput  onChangeText={setQuery} />
         <Text>{JSON.stringify(data)}</Text>
                    <Text>deezs</Text> 
                    <PlayersList
                        players={data}
                        selected={selectedTeams}
                        addTeam={addTeam}
                        removeTeam={removeTeam}
                    />
                    
                    {selectedTeams.length >= 1 && (
                        <FAB
                            onPress={submitTeamSelectionUpdates}
                            position="right"
                            color={colors.primary}
                        >
                            {!submitting ? (
                                <MaterialIcons
                                    name="check"
                                    size={40}
                                    color={colors.text}
                                />
                            ) : (
                                <ActivityIndicator color={colors.text} />
                            )}
                        </FAB>
                    )}
                </>
}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 30,
    },
    headerContainer: {
        width: '100%',
    },
});
