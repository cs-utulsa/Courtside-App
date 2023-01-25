import { DangerButton, PrimaryButton } from '@components/index';
import { TourZone } from '@components/tour/TourZone';
import { useAuth } from '@hooks/index';
import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * This component allows the user to access settings about the app and to log out of the app.
 */
export const Settings = () => {
    const { signOut, clearData } = useAuth();

    return (
        <View style={styles.pageContainer}>
            <TourZone tourStep={1}>
                <PrimaryButton
                    text="Button Text"
                    onPress={() => console.log('press')}
                />
            </TourZone>
            <DangerButton text="Clear Data" onPress={clearData} />
            <DangerButton text="Log Out" onPress={signOut} />
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
});
