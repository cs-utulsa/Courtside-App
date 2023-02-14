import React from 'react';
import { DangerButton } from '@components/buttons/DangerButton';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native';
import { Alert } from 'react-native';

describe('Testing Danger Button Component', () => {
    beforeEach(() => jest.resetAllMocks());

    it('Displays the button text', () => {
        render(<DangerButton text="Button Text" onPress={jest.fn()} />);

        const text = screen.getByText('Button Text');
        expect(text).toBeOnTheScreen();
    });

    it('Shows an alert when pressed', () => {
        const mockFn = jest.fn();
        jest.spyOn(Alert, 'alert');

        render(<DangerButton text="test" onPress={mockFn} />);

        fireEvent.press(screen.getByText('test'));

        expect(Alert.alert).toHaveBeenCalled();
    });

    it('Does not show an alert when disabled', () => {
        const mockFn = jest.fn();
        jest.spyOn(Alert, 'alert');

        render(<DangerButton text="test" onPress={mockFn} disabled={true} />);

        fireEvent.press(screen.getByText('test'));

        expect(Alert.alert).not.toHaveBeenCalled();
    });
});
