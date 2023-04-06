import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { Game } from '../../types/Game';
import axios from 'axios';
import { getMonth, getDate } from 'date-fns';

export const useDaySchedule = (date: Date) => {
    return useQuery<Game[]>({
        queryKey: ['schedule', date],
        queryFn: async () => {
            return await axios
                .get(
                    `${DEVELOPMENT_API}/nba/schedule/${
                        getMonth(date) + 1
                    }/${getDate(date)}`
                )
                .then((response) => response.data);
        },
    });
};
