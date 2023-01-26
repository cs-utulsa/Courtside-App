import axios from 'axios';
import { DEVELOPMENT_API } from '../../constants/urls';
import { useQuery } from '@tanstack/react-query';
import { NewStat } from '../../types/Stat';

export const useStats = (stats: string[] | undefined) => {
    return useQuery<NewStat[]>({
        queryKey: ['stats'],
        queryFn: async () => {
            if (!stats) return [];

            const _statsData: NewStat[] = [];
            for (let stat of stats) {
                const { data } = await axios.get<NewStat>(
                    `${DEVELOPMENT_API}/leaderboard/${stat}`
                );
                // get stat name
                _statsData.push(data);
            }

            return _statsData;
        },
    });
};
