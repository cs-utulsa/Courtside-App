import { LeagueContext } from '@contexts/LeagueContext';
import { useContext } from 'react';

export const useLeague = () => {
    const context = useContext(LeagueContext);

    if (!context) {
        throw new Error('useLeague must be used within a LeagueProvider');
    }

    return context;
};
