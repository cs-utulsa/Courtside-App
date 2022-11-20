import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export type InputProps = {
    changeFn: (field: string) => void;
    blurFn: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    error: string | undefined;
    touched: boolean | undefined;
    value: string;
};
