import React, { FC } from 'react';
import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
} from 'react-native';

type SearchBoxProps = {
    /** Text that is displayed when the value of the text box is an empty string */
    placeholder: string;
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

/**
 * This component is a text input designed for searching
 * @example
 * const placeholder="Search";
 * return <SearchBox placeholder={placeholder} />
 */
export const SearchBox: FC<SearchBoxProps> = ({ placeholder, onChange }) => {
    return (
        <TextInput
            style={styles.search}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

const styles = StyleSheet.create({
    /** Styles for the text input */
    search: {
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        marginBottom: 20,
    },
});
