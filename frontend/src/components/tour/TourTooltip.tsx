import { useSpotlightTour } from '@stackbuilders/react-native-spotlight-tour';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TourButton } from './TourButton';

type TourTooltipProps = {
    title: string;
    content: string;
    first?: boolean;
    last?: boolean;
};

export const TourTooltip: FC<TourTooltipProps> = ({
    title,
    content,
    first = false,
    last = false,
}) => {
    const { previous, next, stop } = useSpotlightTour();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.buttonRow}>
                <TourButton text="Skip Tour" onPress={stop} style="faded" />
                <View style={styles.rightButtonsContainer}>
                    {!first && (
                        <TourButton text="Previous" onPress={previous} />
                    )}
                    {!last && <TourButton text="Next" onPress={next} />}
                    {last && <TourButton text="Finish" onPress={stop} />}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the container of the tour tooltip */
    container: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'white',
    },
    /** Styles for the title text */
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    /** Styles for the content text */
    content: {},
    /** Styles for the row of buttons at the bottom */
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    /** Styles for the container of the buttons on the right side of the component */
    rightButtonsContainer: {
        flexDirection: 'row',
    },
});
