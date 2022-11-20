import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: '75%',
        marginTop: 15,
        marginBottom: 2,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
});
