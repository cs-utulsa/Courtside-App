import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type OnboardingNavigatorParamList = {
    GetStarted: undefined;
    FavoritePlayers: undefined;
    FavoriteTeams: undefined;
    StatSelection: undefined;
    Schedule: undefined;
    Rosters: undefined;
    StatDashboard: undefined;
};

export type OnboardingNavigationProp =
    NativeStackNavigationProp<OnboardingNavigatorParamList>;
