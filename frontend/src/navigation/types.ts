import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type OnboardingNavigatorParamList = {
    GetStarted: undefined;
    FavoritePlayers: undefined;
    FavoriteTeams: undefined;
    StatSelection: undefined;
};

export type OnboardingNavigationProp =
    NativeStackNavigationProp<OnboardingNavigatorParamList>;
