import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Onboarding Navigator
export type OnboardingNavigatorParamList = {
    FavoritePlayers: undefined;
    FavoriteTeams: undefined;
    StatSelection: undefined;
    MainNavigation: undefined;
    Auth: { register: boolean };
};

export type OnboardingNavigationProp =
    NativeStackNavigationProp<OnboardingNavigatorParamList>;

// Auth Navigator
export type AuthScreenRouteProp = RouteProp<
    OnboardingNavigatorParamList,
    'Auth'
>;

export type AuthNavigatorParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type AuthNavigationProp =
    NativeStackNavigationProp<AuthNavigatorParamList>;

// Stat Screen Navigator
export type StatsNavigatorParamList = {
    Dashboard: undefined;
    Selection: undefined;
};

export type StatsNavigationProp =
    NativeStackNavigationProp<StatsNavigatorParamList>;

export type TeamsNavigatorParamList = {
    Dashboard: undefined;
    Selection: undefined;
};

export type TeamNavigationProp =
    NativeStackNavigationProp<TeamsNavigatorParamList>;
