/* jshint ignore:start */
import React from 'react';
import { AuthSubmitButton } from '@components/auth/AuthSubmitButton';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing AuthSubmitButton Component', () => {
    beforeEach(() => jest.resetAllMocks());

    it('Displays the given text', () => {
        render(
            <AuthSubmitButton
                text="Button Text"
                submitFn={jest.fn()}
                disabled={false}
                loading={false}
            />
        );

        const btn = screen.getByText('Button Text');
        expect(btn).toBeOnTheScreen();
    });

    it('runs function when clicked', () => {
        const mockFn = jest.fn();

        render(
            <AuthSubmitButton
                text="Button Text"
                submitFn={mockFn}
                disabled={false}
                loading={false}
            />
        );

        const btn = screen.getByText('Button Text');
        fireEvent.press(btn);

        expect(mockFn).toBeCalled();
    });

    it('does not runs function when clicked if disabled', () => {
        const mockFn = jest.fn();

        render(
            <AuthSubmitButton
                text="Button Text"
                submitFn={mockFn}
                disabled={true}
                loading={false}
            />
        );

        const btn = screen.getByText('Button Text');
        fireEvent.press(btn);

        expect(mockFn).not.toBeCalled();
    });

    it('shows loading indicator and cannot be clicked when in loading state', () => {
        const mockFn = jest.fn();

        render(
            <AuthSubmitButton
                text="Button Text"
                submitFn={mockFn}
                disabled={false}
                loading={true}
            />
        );

        const loading = screen.getByAccessibilityHint('loading');
        expect(loading).toBeOnTheScreen();

        fireEvent.press(loading);

        expect(mockFn).not.toHaveBeenCalled();
    });

    it('does not call function when both loading and disabled', () => {
        const mockFn = jest.fn();

        render(
            <AuthSubmitButton
                text="Button Text"
                submitFn={mockFn}
                disabled={true}
                loading={true}
            />
        );

        const btn = screen.queryByText('Button Text');
        expect(btn).not.toBeOnTheScreen();

        const loading = screen.getByAccessibilityHint('loading');
        expect(loading).toBeOnTheScreen();

        fireEvent.press(loading);

        expect(mockFn).not.toHaveBeenCalled();
    });
});
/* jshint ignore:end*/