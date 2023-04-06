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
    /** screen that allows user to sign in */
    SignIn: undefined;
    /** screen that allows user to register for the app */
    SignUp: undefined;
    /** screen that allows user to send email to reset password */
    ForgotPassword: undefined;
    /** screen that introduces the user to the app */
    GetStarted: undefined;
    /** Select sports to follow */
    SportsSelect: undefined;
    /** Select teams to follow */
    TeamSelect: undefined;
};

export type AuthNavigationProp =
    NativeStackNavigationProp<AuthNavigatorParamList>;

// Stat Screen Navigator
export type StatsNavigatorParamList = {
    /** screen that displays all of the stats a user follows */
    Dashboard: undefined;
    /** screen that allows users to change their stat selections */
    Selection: undefined;
    /** screen that shows the leaderboard for an individual stat */
    Stat: { stat: Stat };
};

export type StatsNavigationProp =
    NativeStackNavigationProp<StatsNavigatorParamList>;

export type StatScreenRouteProp = RouteProp<StatsNavigatorParamList, 'Stat'>;

// Roster Screens Navigator
export type RosterNavigatorParamList = {
    /** screen that shows all of the teams a user follows */
    Dashboard: undefined;
    /** screen that shows the roster and data for a specific team */
    Team: { team: Team };
    /** screen where user can change the teams they follow */
    Tselection: undefined;

    /** screen where user can change the players they follow */
    Pselection: undefined;

    /** screen that shows the data for a specific player */
    Player: { player: Player; team: Team };
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
    /** screen that shows the whole game schedule */
    Schedule: undefined;
    /** screen that shows all of the information about a specific game */
    Game: { game: Game };
};

export type ScheduleNavigationProp =
    NativeStackNavigationProp<ScheduleNavigatorParamList>;

export type GameScreenRouteProp = RouteProp<ScheduleNavigatorParamList, 'Game'>;
