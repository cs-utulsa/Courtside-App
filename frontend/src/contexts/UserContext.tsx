import { createContext } from 'react';

type User = {
    userTeams?: any;
    setUserTeams?: any;
    userStats?: any;
    setUserStats?: any;
};

export const UserContext = createContext<User>({});
