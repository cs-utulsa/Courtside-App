/* jshint ignore:start */
import React from 'react';
import { FullError } from '@components/error/FullError';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing FullError component', () => {
    it('displays the provided text', () => {
        render(<FullError text="error message" />);

        const component = screen.getByText('error message');
        expect(component).toBeOnTheScreen();
    });
});
/* jshint ignore:end */