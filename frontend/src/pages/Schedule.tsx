import { Seperator } from '@atoms/Seperator';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Game } from '../components/molecules';

const DATA = [
    {
        date: '11-21-2022',
        time: '8:00p',
        away: 'NYK',
        home: 'OKC',
    },
    {
        date: '11-21-2022',
        time: '10:30p',
        away: 'UTA',
        home: 'LAC',
    },
    {
        date: '11-21-2022',
        time: '8:00p',
        away: 'GSW',
        home: 'NOP',
    },
];

export const Schedule = () => {
    // const [data, setData] = useState({
    //     roster: [],
    // });

    // useEffect(() => {
    //     fetch("/roster/OKC").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData({
    //                 roster: data.roster,
    //             })
    //         }
    //     )
    // }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item, index }) => (
                    <Game
                        date={item.date}
                        time={item.time}
                        away={item.away}
                        home={item.home}
                        key={`game-${index}`}
                    />
                )}
                numColumns={1}
                ItemSeparatorComponent={Seperator}
            />

            {/* {(data.roster.length === 0) ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {data.roster.map((player, index) => (
                        <Text key={`player-${index}`}>{player}</Text>
                    ))}
                </View>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
});
