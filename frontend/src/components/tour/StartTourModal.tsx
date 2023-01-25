import React, { FC } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

type StartTourModalProps = {
    onStart: () => void;
};

export const StartTourModal: FC<StartTourModalProps> = ({ onStart }) => {
    return (
        <Modal animationType="slide" transparent={true} style={styles.modal}>
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text>Welcome to Courtside!</Text>
                    <Pressable onPress={onStart}>
                        <Text>Begin Tour</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 50,
    },
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 50,
        paddingTop: 100,
    },
    modalContent: {
        width: '80%',
        height: '75%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
});
