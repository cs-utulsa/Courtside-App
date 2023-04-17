import React, { FC, ReactNode, createContext, useState, useMemo } from 'react';

interface LeagueProviderProps {
    children: ReactNode;
}

export type League = 'nba' | 'nhl';

type LeagueContextData = {
    league: League;
    setLeague: (league: League) => void;
};

export const LeagueContext = createContext<LeagueContextData>(
    {} as LeagueContextData
);

export const LeagueProvider: FC<LeagueProviderProps> = ({ children }) => {
    const [league, setRawLeague] = useState<League>('nba');

    const setLeague = (league: League) => {
        setRawLeague(league);
    };

    const contextData: LeagueContextData = useMemo(() => {
        return {
            league,
            setLeague,
        };
    }, [league]);

    return (
        <LeagueContext.Provider value={contextData}>
            {children}
        </LeagueContext.Provider>
    );
};
