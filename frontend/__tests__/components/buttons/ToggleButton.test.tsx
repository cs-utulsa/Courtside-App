/* jshint ignore:start */
import React from 'react';
import { ToggleButton } from '@components/buttons/ToggleButton';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing ToggleButton component', () => {
    it("shows as toggled when button's initial value is true", () => {
        const json = render(
            <ToggleButton initial={true} text="Text" onToggle={jest.fn()} />
        ).toJSON();

        expect(json).toMatchSnapshot();
    });

    it('shows as not toggled when button` initial value is false', () => {
        const json = render(
            <ToggleButton initial={false} text="Text" onToggle={jest.fn()} />
        ).toJSON();

        expect(json).toMatchSnapshot();
    });

    it('shows the given text', () => {
        render(
            <ToggleButton initial={false} text="Text" onToggle={jest.fn()} />
        );

        const btn = screen.getByText('Text');
        expect(btn).toBeOnTheScreen();
    });

    it('calls onToggle function when pressed', () => {
        const mockFn = jest.fn();

        render(<ToggleButton initial={false} text="Text" onToggle={mockFn} />);

        expect(mockFn).not.toHaveBeenCalled();

        const btn = screen.getByText('Text');

        fireEvent.press(btn);

        expect(mockFn).toHaveBeenCalledTimes(1);

        fireEvent.press(btn);
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('changes state when pressed', () => {
        render(
            <ToggleButton initial={false} text="Text" onToggle={jest.fn()} />
        );

        const btn = screen.getByText('Text');

        expect(screen.getByTestId('not-selected')).toBeOnTheScreen();

        fireEvent.press(btn);
        expect(screen.getByTestId('selected')).toBeOnTheScreen();

        fireEvent.press(btn);
        expect(screen.getByTestId('not-selected')).toBeOnTheScreen();
    });
});
/* jshint ignore:end */