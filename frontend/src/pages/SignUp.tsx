// external imports
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

// types
import { AuthNavigationProp } from './../types/Navigation';

// custom hooks
import { useAuth } from '@hooks/useAuth';

//custom components
import {
    EmailInput,
    PasswordInput,
    AuthSubmitButton,
    LogoHeader,
    SmallLink,
    ErrorBox,
} from '@components/index';

const authSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is required.'),
    password: Yup.string().required('Password is required'),
    passwordRetype: Yup.string().test(
        'passwords-match',
        'Passwords must match',
        function (value) {
            return this.parent.password === value;
        }
    ),
});

/**
 * This component is the sign up form that displays when a new user launches the app and wants to join.
 */
export const SignUp = () => {
    const { signUp, authError, loading, resetAuthError, updateTeams } =
        useAuth();

    const { navigate } = useNavigation<AuthNavigationProp>();

    useEffect(() => {
        resetAuthError();
    }, [resetAuthError]);

    if (loading) {
        return (
            <View style={styles.container}>
                <LogoHeader />
                <ActivityIndicator color="black" size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LogoHeader />
            <Formik
                initialValues={{ email: '', password: '', passwordRetype: '' }}
                onSubmit={async (values) => {
                    await signUp(values.email, values.password);

                    const teams = await SecureStore.getItemAsync(
                        'initialTeams'
                    );

                    if (teams) await updateTeams(JSON.parse(teams));
                }}
                validationSchema={authSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    isValid,
                }) => (
                    <View style={styles.form}>
                        <ErrorBox error={authError} />
                        <EmailInput
                            changeFn={handleChange('email')}
                            blurFn={handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                            value={values.email}
                            disabled={isSubmitting}
                        />
                        <PasswordInput
                            changeFn={handleChange('password')}
                            blurFn={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            value={values.password}
                            disabled={isSubmitting}
                            placeholder="Password"
                        />
                        <PasswordInput
                            changeFn={handleChange('passwordRetype')}
                            blurFn={handleBlur('passwordRetype')}
                            error={errors.passwordRetype}
                            touched={touched.passwordRetype}
                            value={values.passwordRetype}
                            disabled={isSubmitting}
                            placeholder="Retype Password"
                        />
                        <AuthSubmitButton
                            loading={isSubmitting}
                            submitFn={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            text="Sign Up"
                        />
                        <SmallLink
                            onPress={() => navigate('SignIn')}
                            text="Already Have an Account?"
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
});
