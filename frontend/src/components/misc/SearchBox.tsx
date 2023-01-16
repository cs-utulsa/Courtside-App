import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type SearchBoxProps = {
    /** Text that is displayed when the value of the text box is an empty string */
    placeholder: string;
};

/**
 * This component is a text input designed for searching
 * @example
 * const placeholder="Search";
 * return <SearchBox placeholder={placeholder} />
 */
export const SearchBox: FC<SearchBoxProps> = ({ placeholder }) => {
    return <TextInput style={styles.search} placeholder={placeholder} />;
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
