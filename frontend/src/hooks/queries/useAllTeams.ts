import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { LimitedTeam } from './../../types/Team';
import axios from 'axios';

export const useAllTeams = () => {
    return useQuery<LimitedTeam[]>({
        queryKey: ['teams'],
        queryFn: async () => {
            const data: LimitedTeam[] = await axios
                .get(`${DEVELOPMENT_API}/team`)
                .then((res) => res.data);

            return data;
        },
    });
};
