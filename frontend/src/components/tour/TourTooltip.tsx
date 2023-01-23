import { useSpotlightTour } from '@stackbuilders/react-native-spotlight-tour';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TourButton } from './TourButton';

type TourTooltipProps = {
    header: string;
    content: string;
};

export const TourTooltip: FC<TourTooltipProps> = ({ header, content }) => {
    const { previous, next } = useSpotlightTour();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.buttonContainer}>
                <TourButton text="Previous" onPress={previous} />
                <TourButton text="Next" onPress={next} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {},
    content: {},
    buttonContainer: {},
});
