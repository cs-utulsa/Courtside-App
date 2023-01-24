// external imports
import { addDays, startOfToday, format } from 'date-fns';
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { GameDisplay } from '../components/data/GameDisplay';
//custom components
import { Seperator, DaySchedule } from '../components/index';
import { ORANGE } from '../styles/colors';

export const GamePage = () => {
    const date = startOfToday();
    const dateString = format(date, 'yyyy-MM-dd');
        return (
        <View style = {styles.container}>
            <Text style = {styles.textStyle}>{dateString}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        textDecorationLine: 'underline',
        color: ORANGE,
    },

});