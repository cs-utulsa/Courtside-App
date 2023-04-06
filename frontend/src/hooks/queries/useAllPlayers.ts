import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { playerIcon } from './../../types/Player';
import axios from 'axios';

export const useAllPlayers = () => {
    return useQuery<playerIcon[]>({
        queryKey: [''],
        queryFn: async () => {
            const data: playerIcon[] = await axios
                .get(`${DEVELOPMENT_API}/`)
                .then((res) => res.data);

            return data;
        },
    });
};
