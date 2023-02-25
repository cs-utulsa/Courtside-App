import { addDays, startOfToday, format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDaySchedule } from '@hooks/index';

import { ErrorBox } from './../error/ErrorBox';
import { GameDisplay } from './GameDisplay';
import { useTheme } from '@react-navigation/native';

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
    const { colors } = useTheme();

    const { data, isError, isSuccess } = useDaySchedule(date);

    if (isError) {
        return <ErrorBox error={`Cannot get game data for ${date}`} />;
    }

    return (
        <View style={[styles.section, { borderColor: colors.primary }]}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                {dateString}
            </Text>
            {isSuccess &&
                data.map((game) => {
                    return (
                        <GameDisplay
                            game={game}
                            key={`game-${game.away_code}-${game.home_code}-${game.game_date}`}
                        />
                    );
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
    },
    /** Styles for the View that contains all of the section information */
    section: {
        borderWidth: 3,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
});
