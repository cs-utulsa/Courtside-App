import React from 'react';
import { FAB } from '@components/buttons/FAB';
import { ActivityIndicator, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react-native';
import '@testing-library/jest-native';
import { ORANGE } from '@styles/colors';

describe('Testing FAB component', () => {
    it('renders text as button child', () => {
        render(
            <FAB onPress={jest.fn()} color={ORANGE}>
                <Text testID="text">Button Text</Text>
            </FAB>
        );

        expect(screen.getByTestId('text')).toBeOnTheScreen();
    });

    it('renders icon as button child', async () => {
        render(
            <FAB onPress={jest.fn()} color={ORANGE}>
                <MaterialIcons
                    name="search"
                    testID="icon"
                    size={40}
                    color="black"
                />
            </FAB>
        );

        await waitFor(() =>
            expect(screen.getByTestId('icon')).toBeOnTheScreen()
        );
    });

    it('renders activity indicator as child', () => {
        render(
            <FAB color={ORANGE} onPress={jest.fn()}>
                <ActivityIndicator testID="loading" />
            </FAB>
        );

        expect(screen.getByTestId('loading')).toBeOnTheScreen();
    });

    it('has the provided color as its background color', () => {
        render(
            <FAB onPress={jest.fn()} color={ORANGE}>
                <Text>text</Text>
            </FAB>
        );

        const btn = screen.getByTestId('FAB');

        expect(btn).toHaveStyle({ backgroundColor: ORANGE });
    });

    it('calls the onPress function when clicked', () => {
        const mockFn = jest.fn();

        render(
            <FAB onPress={mockFn} color={ORANGE}>
                <Text>text</Text>
            </FAB>
        );

        expect(mockFn).not.toHaveBeenCalled();

        const btn = screen.getByTestId('FAB');
        fireEvent.press(btn);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('places button in left position when specified', () => {
        render(
            <FAB onPress={jest.fn()} color={ORANGE} position="left">
                <Text>text</Text>
            </FAB>
        );

        const btn = screen.getByTestId('FAB');

        expect(btn).toHaveStyle({ bottom: 15, left: 15 });
    });

    it('places button in right position when specified', () => {
        render(
            <FAB onPress={jest.fn()} color={ORANGE} position="right">
                <Text>text</Text>
            </FAB>
        );

        const btn = screen.getByTestId('FAB');

        expect(btn).toHaveStyle({ bottom: 15, right: 15 });
    });

    it('places button in right position if no position is specified', () => {
        render(
            <FAB onPress={jest.fn()} color={ORANGE}>
                <Text>text</Text>
            </FAB>
        );

        const btn = screen.getByTestId('FAB');
        expect(btn).toHaveStyle({ bottom: 15, right: 15 });
    });
});
