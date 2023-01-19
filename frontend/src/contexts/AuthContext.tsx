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
    authData?: AuthData;
    loading: boolean;
    authError: string | undefined;
    signIn(email: string, password: string): Promise<void>;
    signUp(email: string, password: string): Promise<void>;
    signOut(): Promise<void>;
    updateStats(newStats: string[]): Promise<void>;
    updateTeams(newTeams: string[]): Promise<void>;
};

type AuthData = {
    token: string;
    _id: string;
    email: string;
    teams?: string[];
    stats?: string[];
};

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>();
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string | undefined>(undefined);

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

    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(true);
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

    const signUp = useCallback(async (email: string, password: string) => {
        setLoading(true);

        try {
            const response = await axios.post(
                `${DEVELOPMENT_API}/users/register`,
                {
                    email,
                    password,
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

    const signOut = useCallback(async () => {
        setAuthData(undefined);
        setAuthError(undefined);

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
        }
    }, [authData?.token]);

    const updateStats = useCallback(
        async (newStats: string[]) => {
            try {
                const response = await axios.patch(
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
                );
                const _stats = response.data;
                await SecureStore.setItemAsync(
                    'authData',
                    JSON.stringify({ ...authData, stats: _stats })
                );
                setAuthData({ ...authData!, stats: _stats });
            } catch (err) {
                console.log(err);
                if (axios.isAxiosError(err)) {
                    setAuthError(err.response?.data);
                } else {
                    setAuthError('Unknown Error Occurred. Try Again Later.');
                }
            }
        },
        [authData]
    );

    const updateTeams = useCallback(async (newTeams: string[]) => {
        console.log(newTeams);
    }, []);

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
    ]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
