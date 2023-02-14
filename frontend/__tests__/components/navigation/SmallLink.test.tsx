import React from 'react';
import { SmallLink } from '@components/navigation/SmallLink';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing SmallLink component', () => {
    it('Displays the given text', () => {
        render(<SmallLink onPress={jest.fn()} text="Link" />);

        const text = screen.getByText('Link');
        expect(text).toBeOnTheScreen();
    });

    it('runs the given function when clicked', () => {
        const mock = jest.fn();

        render(<SmallLink onPress={mock} text="Link" />);

        fireEvent.press(screen.getByText('Link'));

        expect(mock).toHaveBeenCalled();
    });
});
