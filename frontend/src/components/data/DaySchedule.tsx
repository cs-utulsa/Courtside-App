import { addDays, startOfToday, format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GameDisplay } from './GameDisplay';
import { NAVY, ORANGE } from '@styles/colors';
import { useDaySchedule } from '@hooks/index';

type DayScheduleProps = {
    /** the date of this schedule represented by how many days away it is from today */
    ahead: number;
};

export const DaySchedule: FC<DayScheduleProps> = ({ ahead }) => {
    const date = useMemo(() => addDays(startOfToday(), ahead), [ahead]);
    const dateString = format(date, 'yyyy-MM-dd');

    const { data, isError, isSuccess } = useDaySchedule(date);

    if (isError) {
        return (
            <View>
                <Text>Cannot get game data</Text>
            </View>
        );
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dateString}</Text>
            {isSuccess &&
                data.map((game, index) => {
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
};

const styles = StyleSheet.create({
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
