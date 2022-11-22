import axios from 'axios';
import React, {
    createContext,
    FC,
    ReactNode,
    useEffect,
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
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const authDataSerialized = await SecureStore.getItemAsync(
                'authData'
            );

            if (authDataSerialized) {
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
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
    };

    const signUp = async (email: string, password: string) => {
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
    };

    const signOut = async () => {
        setAuthData(undefined);
        setAuthError(undefined);
        await SecureStore.deleteItemAsync('authData');
    };

    const updateStats = async (newStats: string[]) => {
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
    };

    const updateTeams = async (newTeams: string[]) => {
        console.log(newTeams);
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                loading,
                authError,
                signIn,
                signUp,
                signOut,
                updateStats,
                updateTeams,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
