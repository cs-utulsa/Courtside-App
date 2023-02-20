import axios from 'axios';
import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { DEVELOPMENT_API } from '../constants/urls';
interface AuthProviderProps {
    children: ReactNode;
}

type AuthContextData = {
    /** the user's data */
    authData?: AuthData;
    /** whether or not the auth data is loading */
    loading: boolean;
    /** the current error if one exists */
    authError: string | undefined;
    /** method to sign in the user with email and password */
    signIn(email: string, password: string): Promise<void>;
    /** method to register user with email and password */
    signUp(email: string, password: string, teams: string[]): Promise<void>;
    /** method to sign out the current user */
    signOut(): Promise<void>;
    /** method to update the user's stats */
    updateStats(newStats: string[]): Promise<void>;
    /** method to update the teams the user follows */
    updateTeams(newTeams: string[]): Promise<void>;
    /** method to clear user data from the device and the server */
    clearData: () => Promise<void>;
    /** resend the verification email to the user's provided email address */
    resendEmailVerification: () => Promise<void>;
    /** retrieves the updated auth data from the server */
    updateAuthData: () => Promise<void>;
    /** updates the user's email on the server */
    updateEmail: (newEmail: string) => Promise<void>;
    /** sends forgot password email to user */
    forgotPassword: (email: string) => Promise<void>;
    /** reset the auth error */
    resetAuthError: () => void;
    /** update the user's theme */
    setTheme: (theme: 'light' | 'dark') => void;
};

type AuthData = {
    /** the user's JWT */
    token: string;
    /** the id of the user */
    _id: string;
    /** the user's email */
    email: string;
    /** whether or not the user's email is verified */
    emailVerified: string;
    /** list of team ids of the teams that the user follows */
    teams?: string[];
    /** list of stat ids of the stats that the user follows */
    stats?: string[];
    /** what theme the user prefers */
    theme?: 'light' | 'dark';
};

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>();
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string | undefined>(undefined);

    // if the user was previously logged in, load their data from the device
    // and refresh their token
    useEffect(() => {
        const refreshToken = async (storedAuthData: AuthData) => {
            try {
                const response = await axios.post(
                    `${DEVELOPMENT_API}/users/refresh`,
                    {
                        user_id: storedAuthData._id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${storedAuthData.token}`,
                        },
                        validateStatus: (status) => status < 500,
                    }
                );
                if (response.status === 200) {
                    const newToken = response.data;
                    setAuthData({ ...storedAuthData, token: newToken });
                } else {
                    await SecureStore.deleteItemAsync('authData');
                }
            } catch (err) {
                setAuthError('Cannot automatically log in.');
            } finally {
                setLoading(false);
            }
        };

        const loadStorageData = async () => {
            try {
                const authDataSerialized = await SecureStore.getItemAsync(
                    'authData'
                );

                if (authDataSerialized) {
                    const _authData: AuthData = JSON.parse(authDataSerialized);
                    await refreshToken(_authData);
                }
            } catch (err) {
                console.log('retrieval error');
            } finally {
                setLoading(false);
            }
        };

        loadStorageData();
    }, []);

    // sign in the user and store their information on the device
    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setAuthError(undefined);
        try {
            const response = await axios.post(
                `${DEVELOPMENT_API}/users/login`,
                {
                    email,
                    password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const _authData = response.data;
            await SecureStore.setItemAsync(
                'authData',
                JSON.stringify(_authData)
            );
            setAuthData(_authData);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAuthError(err.response?.data);
            } else {
                setAuthError('Unknown Error Occurred. Try Again Later.');
            }
        }

        setLoading(false);
    }, []);

    // sign up the user and store their information on the device
    const signUp = useCallback(
        async (email: string, password: string, teams: string[]) => {
            setLoading(true);
            setAuthError(undefined);

            try {
                await SecureStore.deleteItemAsync('initialTeams');
                await SecureStore.deleteItemAsync('initialSports');

                const response = await axios.post(
                    `${DEVELOPMENT_API}/users/register`,
                    {
                        email,
                        password,
                        teams,
                    }
                );

                const _authData = response.data;
                await SecureStore.setItemAsync(
                    'authData',
                    JSON.stringify(_authData)
                );
                setAuthData(_authData);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setAuthError(err.response?.data);
                } else {
                    setAuthError('Unknown Error Occurred. Try Again Later.');
                }
            }

            setLoading(false);
        },
        []
    );

    // sign out the user and remove their information from the device
    const signOut = useCallback(async () => {
        setAuthData(undefined);
        setAuthError(undefined);
        setLoading(true);

        try {
            await axios.post(
                `${DEVELOPMENT_API}/users/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authData?.token}`,
                    },
                    validateStatus: (status) => status < 500,
                }
            );
            await SecureStore.deleteItemAsync('authData');
        } catch (err) {
            console.log('Error logging out');
        } finally {
            setLoading(false);
        }
    }, [authData?.token]);

    // update the user's stats
    const updateStats = useCallback(
        async (newStats: string[]) => {
            setLoading(true);
            setAuthError(undefined);

            try {
                const data = await axios
                    .patch(
                        `${DEVELOPMENT_API}/users/leaderboards`,
                        {
                            email: authData?.email,
                            stats: newStats,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${authData?.token}`,
                            },
                        }
                    )
                    .then((res) => res.data);

                await SecureStore.setItemAsync(
                    'authData',
                    JSON.stringify({ ...authData, stats: data })
                );

                setAuthData({ ...authData!, stats: data });
            } catch (err) {
                console.log(err);
                if (axios.isAxiosError(err)) {
                    setAuthError(err.response?.data);
                } else {
                    setAuthError('Unknown Error Occurred. Try Again Later.');
                }
            } finally {
                setLoading(false);
            }
        },
        [authData]
    );

    // update the user's teams
    const updateTeams = useCallback(
        async (newTeams: string[]) => {
            setLoading(true);
            setAuthError(undefined);

            try {
                const data = await axios
                    .patch(
                        `${DEVELOPMENT_API}/users/teams`,
                        {
                            email: authData?.email,
                            teams: newTeams,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${authData?.token}`,
                            },
                        }
                    )
                    .then((res) => res.data);

                await SecureStore.setItemAsync(
                    'authData',
                    JSON.stringify({ ...authData, teams: data })
                );

                setAuthData({ ...authData!, teams: data });
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setAuthError(err.response?.data);
                } else {
                    setAuthError('Unknown Error Occurred. Try Again Later.');
                }
            }
        },
        [authData]
    );

    // clear the user's data
    const clearData = useCallback(async () => {
        setAuthData(undefined);
        setLoading(true);
        setAuthError(undefined);

        try {
            await axios.post(
                `${DEVELOPMENT_API}/users/clear`,
                {
                    email: authData?.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authData?.token}`,
                    },
                }
            );

            await SecureStore.setItemAsync(
                'authData',
                JSON.stringify({ ...authData, teams: [], stats: [] })
            );
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAuthError(err.response?.data);
            } else {
                setAuthError('Unknown Error Occurred. Try Again Later.');
            }
        } finally {
            setLoading(false);
        }
    }, [authData]);

    const resendEmailVerification = useCallback(async () => {
        setLoading(true);
        setAuthError(undefined);
        try {
            await axios.post(
                `${DEVELOPMENT_API}/users/resendEmailVerification`,
                {
                    email: authData?.email,
                    id: authData?._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authData?.token}`,
                    },
                }
            );
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAuthError(err.response?.data);
            } else {
                setAuthError('Unknown Error Occurred. Try Again Later.');
            }
        } finally {
            setLoading(false);
        }
    }, [authData?.email, authData?._id, authData?.token]);

    const updateAuthData = useCallback(async () => {
        setLoading(true);
        setAuthError(undefined);
        try {
            const data = await axios
                .get(`${DEVELOPMENT_API}/users/${authData?.token}`)
                .then((res) => res.data);

            const _authData = { ...data, token: authData?.token };
            setAuthData(_authData);

            await SecureStore.setItemAsync(
                'authData',
                JSON.stringify(_authData)
            );
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAuthError(err.response?.data);
            } else {
                setAuthError('Unknown Error Occurred. Try Again Later.');
            }
        } finally {
            setLoading(false);
        }
    }, [authData?.token]);

    const updateEmail = useCallback(
        async (newEmail: string) => {
            setLoading(true);
            setAuthError(undefined);
            try {
                await axios.post(
                    `${DEVELOPMENT_API}/users/changeEmail`,
                    {
                        old_email: authData?.email,
                        new_email: newEmail,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authData?.token}`,
                        },
                    }
                );

                await updateAuthData();
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setAuthError(err.response?.data);
                } else {
                    setAuthError('Unknown Error Occurred. Try Again Later.');
                }
            } finally {
                setLoading(false);
            }
        },
        [authData, updateAuthData]
    );

    const forgotPassword = useCallback(async (email: string) => {
        setLoading(true);
        setAuthError(undefined);
        try {
            await axios.post(`${DEVELOPMENT_API}/users/forgotPassword`, {
                email,
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAuthError(err.response?.data);
            } else {
                setAuthError('Unknown Error Occurred. Try Again Later.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const resetAuthError = useCallback(() => {
        setAuthError(undefined);
    }, []);

    const setTheme = useCallback(
        async (theme: 'light' | 'dark') => {
            try {
                await axios.patch(`${DEVELOPMENT_API}/users/theme`, {
                    email: authData?.email,
                    theme,
                });
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setAuthError(err.response?.data);
                } else {
                    setAuthError('Unknown Error Occurred. Try Again Later.');
                }
            }
        },
        [authData?.email]
    );

    const contextData: AuthContextData = useMemo(() => {
        return {
            authData,
            loading,
            authError,
            signIn,
            signUp,
            signOut,
            updateStats,
            updateTeams,
            clearData,
            resendEmailVerification,
            updateAuthData,
            updateEmail,
            forgotPassword,
            resetAuthError,
            setTheme,
        };
    }, [
        authData,
        authError,
        loading,
        signIn,
        signUp,
        signOut,
        updateStats,
        updateTeams,
        clearData,
        resendEmailVerification,
        updateAuthData,
        updateEmail,
        forgotPassword,
        resetAuthError,
        setTheme,
    ]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
