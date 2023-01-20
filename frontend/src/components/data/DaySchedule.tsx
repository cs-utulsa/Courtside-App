import { addDays, startOfToday, format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NAVY, ORANGE } from '@styles/colors';
import { useDaySchedule } from '@hooks/index';

import { FullError } from './../error/FullError';
import { GameDisplay } from './GameDisplay';

type DayScheduleProps = {
    /** the date of this schedule represented by how many days away it is from today */
    ahead: number;
};

/**
 * This component displays all of the games that are within a given day.
 * The day is defined by a number, which is how many days ahead of today the date is.
 *
 * @example
 * const daysAhead = 3;
 * return <DaySchedule ahead={daysAhead} />
 */
export const DaySchedule: FC<DayScheduleProps> = ({ ahead }) => {
    const date = useMemo(() => addDays(startOfToday(), ahead), [ahead]);
    const dateString = format(date, 'yyyy-MM-dd');

    const { data, isError, isSuccess } = useDaySchedule(date);

    if (isError) {
        return <FullError text="Cannot get game data. Try again later" />;
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dateString}</Text>
            {isSuccess &&
                data.map((game, index) => {
                    return <GameDisplay game={game} key={`game-${index}`} />;
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the text at the top of the section which state what day this section represents */
    sectionTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        textDecorationLine: 'underline',
        color: ORANGE,
    },
    /** Styles for the View that contains all of the section information */
    section: {
        borderWidth: 3,
        borderColor: NAVY,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
});
