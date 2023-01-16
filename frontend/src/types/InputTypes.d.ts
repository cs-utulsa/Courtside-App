import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export type InputProps = {
    /** This function is called when the input is changed */
    changeFn: (field: string) => void;
    /** THis function is called when the user leaves the field (the opposite of focusing) */
    blurFn: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    /** The error text */
    error: string | undefined;
    /** Whether or not the input has been focused by the user yet */
    touched: boolean | undefined;
    /** The current value of the input */
    value: string;
    /** Whether or not the input can be accessed by the user */
    disabled: boolean;
};
