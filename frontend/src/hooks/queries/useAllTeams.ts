import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { TeamIcon } from './../../types/Team';
import axios from 'axios';

export const useAllTeams = () => {
    return useQuery<TeamIcon[]>({
        queryKey: ['teams'],
        queryFn: async () => {
            const data: TeamIcon[] = await axios
                .get(`${DEVELOPMENT_API}/nba/team`)
                .then((res) => res.data);
            return data;
        },
    });
};
