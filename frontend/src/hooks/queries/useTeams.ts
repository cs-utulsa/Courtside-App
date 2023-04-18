import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Team } from './../../types/Team';
import { useLeague } from '@hooks/useLeague';
import type { League } from './../../contexts/LeagueContext';

interface Options {
    allLeagues?: boolean;
}

export const useTeams = (teams: string[], options?: Options) => {
    const { league } = useLeague();

    let finalLeague: League | 'all' = league;
    if (options?.allLeagues) {
        finalLeague = 'all';
    }

    return useQuery<Team[]>({
        queryKey: ['userTeams', finalLeague],
        queryFn: async () => {
            if (!teams) return [];

            const _teamData: Team[] = [];
            for (let team of teams) {
                const data: Team = await axios
                    .get(`${DEVELOPMENT_API}/${finalLeague}/team/${team}`, {
                        validateStatus: (status) =>
                            status < 400 || status === 404,
                    })
                    .then((res) => {
                        if (res.status === 404) {
                            return { ...res, data: {} as Team };
                        } else {
                            return res;
                        }
                    })
                    .then((res) => res.data);

                if (Object.keys(data).length > 0) _teamData.push(data);
            }

            return _teamData;
        },
    });
};
