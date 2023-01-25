import React from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';

export const FullOverlay = () => {
    const { width, height } = useWindowDimensions();

    const overlaySize = {
        width,
        height,
    };

    return <View style={[styles.overlay, overlaySize]} />;
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100,
    },
});
