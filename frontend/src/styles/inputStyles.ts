import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
    /** Styles for the view that contains the input*/
    container: {
        width: '100%',
        alignItems: 'center',
    },
    /** Styles for the input box itself */
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
    /** Styles that are added to the input when the input's value has an error */
    inputError: {
        borderColor: 'red',
    },
    /** Styles for the error text that appears beneath the button when there is an error */
    errorText: {
        color: 'red',
    },
});
