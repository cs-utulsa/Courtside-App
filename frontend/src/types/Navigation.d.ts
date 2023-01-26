import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Player } from './Player';
import { Stat } from './Stat';
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
    Stat: { stat: Stat };
};

export type StatsNavigationProp =
    NativeStackNavigationProp<StatsNavigatorParamList>;

export type StatScreenRouteProp = RouteProp<StatsNavigatorParamList, 'Stat'>;

// Roster Screens Navigator
export type RosterNavigatorParamList = {
    Dashboard: undefined;
    Team: { team: Team };
    Selection: undefined;
    Player: { player: Player };
};

export type RosterNavigationProp =
    NativeStackNavigationProp<RosterNavigatorParamList>;

export type TeamScreenRouteProp = RouteProp<RosterNavigatorParamList, 'Team'>;

export type PlayerScreenRouteProp = RouteProp<
    RosterNavigatorParamList,
    'Player'
>;

// Schedule
export type ScheduleNavigatorParamList = {
    Schedule: undefined;
    Game: { game: Game };
};

export type ScheduleNavigationProp =
    NativeStackNavigationProp<ScheduleNavigatorParamList>;

export type GameScreenRouteProp = RouteProp<ScheduleNavigatorParamList, 'Game'>;
