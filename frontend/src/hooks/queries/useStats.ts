import axios from 'axios';
import { DEVELOPMENT_API } from '../../constants/urls';
import { useQuery } from '@tanstack/react-query';
import { Stat } from '../../types/Stat';
import { useLeague } from '@hooks/useLeague';

export const useStats = (stats: string[] | undefined) => {
    const { league } = useLeague();

    return useQuery<Stat[]>({
        queryKey: ['stats', league],
        queryFn: async () => {
            if (!stats) return [];

            const _statsData: Stat[] = [];
            for (let stat of stats) {
                const { data } = await axios
                    .get<Stat>(
                        `${DEVELOPMENT_API}/${league}/leaderboard/${stat}`,
                        {
                            validateStatus: (status) =>
                                status < 400 || status === 404,
                        }
                    )
                    .then((res) => {
                        if (res.status === 404) {
                            return { ...res, data: {} as Stat };
                        } else {
                            return res;
                        }
                    });
                if (Object.keys(data).length > 0) _statsData.push(data);
            }

            return _statsData;
        },
    });
};
