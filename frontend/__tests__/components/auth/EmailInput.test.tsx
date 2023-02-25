/* jshint ignore:start */
import React from 'react';
import { EmailInput } from '@components/auth/EmailInput';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('Testing EmailInput Component', () => {
    it('shows error if teh component has already been touched', () => {
        render(
            <EmailInput
                changeFn={jest.fn()}
                blurFn={jest.fn()}
                touched={true}
                error="Error"
                value="val"
                disabled={false}
            />
        );

        const error = screen.getByText('Error');
        expect(error).toBeOnTheScreen();
    });

    it('does not show error if the component has not been touched', () => {
        render(
            <EmailInput
                changeFn={jest.fn()}
                blurFn={jest.fn()}
                touched={false}
                error="Error"
                value="val"
                disabled={false}
            />
        );

        const error = screen.queryByText('Error');
        expect(error).not.toBeOnTheScreen();
    });
});
/* jshint ignore:end */