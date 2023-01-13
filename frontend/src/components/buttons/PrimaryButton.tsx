import { ORANGE } from '@styles/colors';
import React, { FC } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

type PrimaryButtonProps = {
    onPress: () => void;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.btn} onPress={onPress}>
                <Text style={styles.btnText}>Update</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    btn: {
        width: '90%',
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
    },
    btnText: {
        textAlign: 'center',
        color: ORANGE,
        fontSize: 16,
    },
});
