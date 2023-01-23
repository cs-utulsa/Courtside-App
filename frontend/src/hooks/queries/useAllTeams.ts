import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { LimitedTeam } from './../../types/Team';
import axios from 'axios';
import { ICONS } from '@constants/icons';

export const useAllTeams = () => {
    return useQuery<LimitedTeam[]>({
        queryKey: ['teams'],
        queryFn: async () => {
            const data = await axios
                .get(`${DEVELOPMENT_API}/team`)
                .then((res) => res.data);

            const dataWithIcons = data.map(
                (team: { name: string; id: string; code: string }) => {
                    const icon = ICONS.find(
                        (item) => item.code === team.code
                    )?.logo;

                    return { ...team, icon };
                }
            );

            return dataWithIcons;
        },
    });
};
