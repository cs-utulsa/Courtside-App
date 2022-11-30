import { Seperator } from '@atoms/Seperator';
import axios from 'axios';
// import { useFocusEffect } from '@react-navigation/native';
import { addDays, format, getDate, getMonth, startOfToday } from 'date-fns';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Game } from '../components/molecules';
import { DEVELOPMENT_API } from '../constants/urls';

// const DATA = [
//     {
//         date: '11-21-2022',
//         time: '8:00p',
//         away: 'NYK',
//         home: 'OKC',
//     },
//     {
//         date: '11-21-2022',
//         time: '10:30p',
//         away: 'UTA',
//         home: 'LAC',
//     },
//     {
//         date: '11-21-2022',
//         time: '8:00p',
//         away: 'GSW',
//         home: 'NOP',
//     },
// ];

type Game = {
    arena: string;
    game_date: string;
    game_time: string;
    home_code: string;
    home_name: string;
    home_link: string;
    away_code: string;
    away_name: string;
    away_link: string;
};

type DateSectionProps = {
    ahead: number;
};

const DateSection: FC<DateSectionProps> = ({ ahead }) => {
    const date = useMemo(() => addDays(startOfToday(), ahead), [ahead]);
    const dateString = format(date, 'yyyy-MM-dd');
    const [games, setGames] = useState<Game[]>();

    const getDaySchedule = useCallback(async () => {
        try {
            const response = await axios.get(
                `${DEVELOPMENT_API}/schedule/${getMonth(date) + 1}/${getDate(
                    date
                )}`
            );
            return response.data;
        } catch (err) {
            console.log("Can't get data for date");
        }
    }, [date]);

    useEffect(() => {
        (async () => {
            setGames(await getDaySchedule());
        })();
    }, [getDaySchedule]);

    return (
        <View>
            <>
                <Text style={styles.sectionTitle}>{dateString}</Text>
                {games ? (
                    games!.map((game, index) => {
                        return (
                            <Game
                                date={game.game_date}
                                time={game.game_time}
                                away={game.away_code}
                                home={game.home_code}
                                key={`game-${index}`}
                            />
                        );
                    })
                ) : (
                    <Text>Loading</Text>
                )}
            </>
        </View>
    );
};

export const Schedule = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [days, setDays] = useState<number>(3);

    return (
        <View style={styles.container}>
            <FlatList
                data={Array.from(Array(days), (_e, idx) => idx)}
                renderItem={({ item, index }) => {
                    return <DateSection key={`date-${index}`} ahead={item} />;
                }}
                numColumns={1}
                ItemSeparatorComponent={Seperator}
                onEndReached={() => setDays(days + 6)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    sectionTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
