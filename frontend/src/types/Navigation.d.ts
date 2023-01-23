import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type OnboardingNavigatorParamList = {
    FavoritePlayers: undefined;
    FavoriteTeams: undefined;
    StatSelection: undefined;
    MainNavigation: undefined;
    Auth: { register: boolean };
};

export type OnboardingNavigationProp =
    NativeStackNavigationProp<OnboardingNavigatorParamList>;

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

export type StatsNavigatorParamList = {
    Dashboard: undefined;
    Selection: undefined;
};

export type RosterNavigatorParamList = {
    Dashboard: undefined;
    Players: { foo: players[]; };
    //name: Int;
    Player: undefined;
};
export type StatsNavigationProp =
    NativeStackNavigationProp<StatsNavigatorParamList>;


export type RosterNavigationProp =
    NativeStackNavigationProp<RosterNavigatorParamList>;
