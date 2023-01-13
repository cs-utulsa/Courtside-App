// external imports
import axios from 'axios';
import { addDays, format, getDate, getMonth, startOfToday } from 'date-fns';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

//custom components
import { Seperator } from '@components/misc/Seperator';
import { GameDisplay } from '@components/data';

// misc
import { DEVELOPMENT_API } from '@constants/urls';
import { NAVY, ORANGE } from '@styles/colors';
import { Game } from '../types/Game';

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

    if (games) {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{dateString}</Text>
                {games.map((game, index) => {
                    return (
                        <GameDisplay
                            date={game.game_date}
                            time={game.game_time}
                            away={game.away_code}
                            home={game.home_code}
                            key={`game-${index}`}
                        />
                    );
                })}
            </View>
        );
    }

    return <View />;
};

export const Schedule = () => {
    const [days, setDays] = useState<number>(7);

    return (
        <View style={styles.container}>
            <FlatList
                data={Array.from(Array(days), (_e, idx) => idx)}
                renderItem={({ item, index }) => {
                    return <DateSection key={`date-${index}`} ahead={item} />;
                }}
                numColumns={1}
                ItemSeparatorComponent={Seperator}
                onEndReached={() => setDays(days + 7)}
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
        fontSize: 30,
        textDecorationLine: 'underline',
        color: ORANGE,
    },
    section: {
        borderWidth: 3,
        borderColor: NAVY,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
});
