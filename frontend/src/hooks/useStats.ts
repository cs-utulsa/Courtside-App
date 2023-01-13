import axios from 'axios';
import { DEVELOPMENT_API } from '../constants/urls';
import { useQuery } from '@tanstack/react-query';

export const useStats = (stats: string[] | undefined) => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            if (!stats) return [];

            const _statsData = [];
            for (let stat of stats) {
                const { data } = await axios.get(
                    `${DEVELOPMENT_API}/leaderboard/${stat}`
                );
                _statsData.push(data);
            }

            return _statsData;
        },
    });
};
