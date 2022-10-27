import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type SearchBoxProps = {
    placeholder: string;
};
export const SearchBox: FC<SearchBoxProps> = ({ placeholder }) => {
    return <TextInput style={styles.search} placeholder={placeholder} />;
};

const styles = StyleSheet.create({
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
