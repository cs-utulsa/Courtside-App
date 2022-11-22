// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { View, StyleSheet, FlatList, Text } from 'react-native';
// import { Text, StyleSheet } from 'react-native';
// //import { StatLeaderboard, LeaderboardProps } from '../components/molecules';
// import { LOCAL_API } from '../constants/urls';
// //import { Seperator } from '@atoms/Seperator';

// const DATA = [
//     {
//         title: 'VORP',
//         data: [
//             { rank: 1, player_id: 'jokicni01', value: 9.8 },
//             { rank: 2, player_id: 'antetgi01', value: 7.4 },
//             { rank: 3, player_id: 'embiijo01', value: 6.5 },
//             { rank: 4, player_id: 'doncilu01', value: 5.9 },
//             { rank: 5, player_id: 'jamesle01', value: 5.1 },
//         ],
//     },
//     {
//         title: 'PER',
//         data: [
//             { rank: 1, player_id: 'jokicni01', value: 32.8 },
//             { rank: 2, player_id: 'antetgi01', value: 32.1 },
//             { rank: 3, player_id: 'embiijo01', value: 31.2 },
//             { rank: 4, player_id: 'jamesle01', value: 26.2 },
//             { rank: 5, player_id: 'duranke01', value: 25.6 },
//         ],
//     },
// ];

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from '@navigation/types';

export const StatDashboard = () => {
    const { authData } = useAuth();
    const { navigate } = useNavigation<StatsNavigationProp>();

    return (
        <View style={styles.pageContainer}>
            <Pressable
                style={styles.followBtn}
                onPress={() => navigate('Selection')}
            >
                <Text style={styles.followBtnText}>Follow More Stats</Text>
            </Pressable>

            {authData?.stats?.map((stat) => (
                <Text key={stat}>{stat}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: '#EE6730',
        marginTop: 20,
    },
    followBtn: {
        width: '90%',
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    followBtnText: {
        textAlign: 'center',
        color: '#EE6730',
        fontSize: 16,
    },
    pageContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
});

// export const StatDashboard = () => {
// const [ leaderboard, setLeaderboard] = useState<LeaderboardProps>();
// useEffect(() => {
//     axios
//         .get<LeaderboardProps>(`${LOCAL_API}/leaderboard/pts`)
//         .then((response) => {
//             setLeaderboard(response.data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }, []);

// const [apiData, setAPIData] = useState<string>();
// useEffect(() => {
//     axios
//         .get<string>(`${LOCAL_API}/test`)
//         .then((response) => {
//             setAPIData(response.data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }, []);

// return (
//     <Text>Something</Text>
//<Text>Test test : {apiData}</Text>
// <View style={styles.container}>
//     <StatLeaderboard
//         _id={leaderboard?._id!}
//         player_id={leaderboard?.player_id!}
//         value={leaderboard?.value!}
//     />
//     <FlatList
//         data={DATA}
//         renderItem={({ item, index }) => (
//             <StatLeaderboard
//                 name={item.title}
//                 data={item.data}
//                 key={`leaderboard-${index}`}
//             />
//         )}
//         numColumns={1}
//         ItemSeparatorComponent={Seperator}
//     />
// </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 10,
//         flex: 1,
//     },
// });
