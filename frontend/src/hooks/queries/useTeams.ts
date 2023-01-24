import { ICONS } from '@constants/icons';
import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LimitedTeam } from './../../types/Team';

export const useTeams = (teams: string[]) => {
    return useQuery<LimitedTeam[]>({
        queryKey: ['userTeams'],
        queryFn: async () => {
            if (!teams) return [];

            const _teamData = [];
            for (let team of teams) {
                const data = await axios
                    .get(`${DEVELOPMENT_API}/team/${team}`)
                    .then((res) => res.data);

                const icon = ICONS.find((item) => item.code === team)?.logo;

                _teamData.push({ ...data, icon });
            }

            return _teamData;
        },
    });
};
