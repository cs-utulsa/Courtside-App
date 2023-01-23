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
    Players: { p: players[], u: uri, n: name};
    //name: Int;
    Player: {fn: string, s: string[], u: uri};
};
export type StatsNavigationProp =
    NativeStackNavigationProp<StatsNavigatorParamList>;


export type RosterNavigationProp =
    NativeStackNavigationProp<RosterNavigatorParamList>;
