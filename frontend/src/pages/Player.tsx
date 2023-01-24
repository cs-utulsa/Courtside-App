import { PlayerScreenRouteProp } from './../types/Navigation';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

export const Player = () => {
    const route = useRoute<PlayerScreenRouteProp>(); //got the string a to send... still lots of errors

    return (
        //could add undefined type to catch the error if no data was sent!e
        <View>
            <Text style={styles.text}>{route.params.fn}</Text>
            <Text style={styles.text}>{route.params.s[0]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
    circleImageLayout: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: 'grey',
        borderWidth: 2,
    },
});
