import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

export const StartTourModal = () => {
    const [visible] = useState<boolean>(true);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            style={styles.modal}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text>Welcome to Courtside!</Text>
                    <Pressable
                        onPress={() => console.log('start')}
                        style={styles.startBtn}
                    >
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
    startBtn: {
        borderWidth: 3,
        borderColor: 'black',
        padding: 2,
    },
});
