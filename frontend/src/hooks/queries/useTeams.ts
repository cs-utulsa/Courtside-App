import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Team } from './../../types/Team';

export const useTeams = (teams: string[]) => {
    return useQuery<Team[]>({
        queryKey: ['userTeams'],
        queryFn: async () => {
            if (!teams) return [];

            const _teamData: Team[] = [];
            for (let team of teams) {
                const data: Team = await axios
                    .get(`${DEVELOPMENT_API}/nba/team/${team}`)
                    .then((res) => res.data);

                _teamData.push(data);
            }

            return _teamData;
        },
    });
};
