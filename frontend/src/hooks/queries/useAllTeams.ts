import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { TeamIcon } from './../../types/Team';
import axios from 'axios';
import { useLeague } from '@hooks/useLeague';

export const useAllTeams = () => {
    const { league } = useLeague();

    return useQuery<TeamIcon[]>({
        queryKey: ['teams', league],
        queryFn: async () => {
            const data: TeamIcon[] = await axios
                .get(`${DEVELOPMENT_API}/${league}/team`)
                .then((res) => res.data);
            return data;
        },
    });
};
