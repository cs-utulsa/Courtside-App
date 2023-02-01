// external imports
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

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
});

/**
 * This component displays when a user needs to sign back into the app.
 */
export const SignIn = () => {
    const { signIn, authError, loading } = useAuth();

    const { navigate } = useNavigation<AuthNavigationProp>();

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
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) =>
                    await signIn(values.email, values.password)
                }
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
                        <AuthSubmitButton
                            loading={isSubmitting}
                            submitFn={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            text="Sign In"
                        />
                        <SmallLink
                            onPress={() => navigate('SignUp')}
                            text="Create an Account"
                        />
                        <SmallLink
                            onPress={() => navigate('ForgotPassword')}
                            text="Forgot Password?"
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
