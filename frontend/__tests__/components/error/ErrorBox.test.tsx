/* jshint ignore:start */
import React from 'react';
import { ErrorBox } from '@components/error/ErrorBox';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing ErrorBox Component', () => {
    it('displays the error message when provided', () => {
        render(<ErrorBox error="message" />);

        const box = screen.getByText('message');
        expect(box).toBeOnTheScreen();
    });
});
/* jshint ignore:end */