import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Player } from './Player';
import { Team } from './Team';

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

// Roster Screens Navigator
export type RosterNavigatorParamList = {
    Dashboard: undefined;
    Players: { team: Team };
    Selection: undefined;
    Player: { player: Player };
};

export type RosterNavigationProp =
    NativeStackNavigationProp<RosterNavigatorParamList>;

export type PlayersScreenRouteProp = RouteProp<
    RosterNavigatorParamList,
    'Players'
>;

export type PlayerScreenRouteProp = RouteProp<
    RosterNavigatorParamList,
    'Player'
>;
