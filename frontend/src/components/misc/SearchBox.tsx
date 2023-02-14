import useDebounce from '@hooks/useDebounce';
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type SearchBoxProps = {
    /** Text that is displayed when the value of the text box is an empty string */
    placeholder: string;
    onChange: (query: string) => void;
};

/**
 * This component is a text input designed for searching
 * @example
 * const placeholder="Search";
 * return <SearchBox placeholder={placeholder} />
 */
export const SearchBox: FC<SearchBoxProps> = ({ placeholder, onChange }) => {
    const [query, setQuery] = useState<string>('');

    const debouncedQuery = useDebounce(query, 100);

    useEffect(() => {
        onChange(debouncedQuery);
    }, [debouncedQuery, onChange]);

    return (
        <TextInput
            accessibilityHint="search box"
            style={styles.search}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.nativeEvent.text)}
            value={query}
            onChangeText={(text) => setQuery(text)}
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
