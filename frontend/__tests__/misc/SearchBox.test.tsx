import React from 'react';
import { SearchBox } from '@components/misc/SearchBox';
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing SearchBox component', () => {
    it('shows the given placeholder', () => {
        render(<SearchBox placeholder="Placeholder" onChange={jest.fn()} />);

        const box = screen.getByPlaceholderText('Placeholder');
        expect(box).toBeOnTheScreen();
    });

    it('changes the text content user types in box', () => {
        const mockChange = jest.fn();
        render(<SearchBox placeholder="Placeholder" onChange={mockChange} />);

        const box = screen.getByAccessibilityHint('search box');
        expect(box).toHaveTextContent('');

        fireEvent.changeText(box, 'Input');

        expect(box).toHaveProp('value', 'Input');
    });

    it('calls function when text is changed', async () => {
        const mockChange = jest.fn();
        render(<SearchBox placeholder="Placeholder" onChange={mockChange} />);

        const box = screen.getByAccessibilityHint('search box');
        expect(box).toHaveTextContent('');

        fireEvent.changeText(box, 'Input');

        await waitFor(() => expect(mockChange).toHaveBeenCalled());
    });
});
