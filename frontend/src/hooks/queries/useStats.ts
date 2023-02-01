import axios from 'axios';
import { DEVELOPMENT_API } from '../../constants/urls';
import { useQuery } from '@tanstack/react-query';
import { Stat } from '../../types/Stat';

export const useStats = (stats: string[] | undefined) => {
    return useQuery<Stat[]>({
        queryKey: ['stats'],
        queryFn: async () => {
            if (!stats) return [];

            const _statsData: Stat[] = [];
            for (let stat of stats) {
                const { data } = await axios.get<Stat>(
                    `${DEVELOPMENT_API}/leaderboard/${stat}`
                );
                // get stat name
                _statsData.push(data);
            }

            return _statsData;
        },
    });
};
